// cloudfront.tf
// CloudFront serves the frontend over HTTPS at convomundo.com and www.convomundo.com.
// S3 stays private; CloudFront reads S3 via an Origin Access Identity (OAI).

resource "aws_cloudfront_origin_access_identity" "frontend" {
  comment = "Access identity for convomundo frontend"
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100" # cheapest tier (US/Europe) - good for low cost

  aliases = [
    "convomundo.com",
    "www.convomundo.com"
  ]

  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "s3-frontend"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = "s3-frontend"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]

    compress = true

    # Old-style forwarded_values is fine for static sites:
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  # SPA routing (React Router):
  # When CloudFront tries to fetch /some-route from S3, S3 returns 403/404 because the object doesn't exist.
  # We map those to /index.html so the SPA router can handle the route client-side.
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.frontend.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

# Route53 A record: convomundo.com -> CloudFront
resource "aws_route53_record" "frontend_root" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "convomundo.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

# Route53 A record: www.convomundo.com -> CloudFront
resource "aws_route53_record" "frontend_www" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "www.convomundo.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

# Outputs: useful for deployments (CloudFront invalidation needs the distribution ID)
output "frontend_cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.frontend.id
}

output "frontend_cloudfront_domain_name" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "frontend_url" {
  value = "https://convomundo.com"
}
