// s3.tf
// This keeps S3 as PRIVATE object storage.
// CloudFront will be the public HTTPS website, and CloudFront alone can read from this bucket.

resource "aws_s3_bucket" "frontend" {
  // Stable bucket name so deployments + CloudFront config don't change every terraform apply
  bucket        = "convomundo.com"
  force_destroy = true
}

# Block ALL public access to this bucket.
# The website will be public via CloudFront, not S3.
resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Bucket policy: allow ONLY the CloudFront Origin Access Identity (OAI) to read objects.
# This is what makes the bucket private while still serving the site publicly through CloudFront.
resource "aws_s3_bucket_policy" "frontend_cloudfront_read" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "AllowCloudFrontReadOnly",
        Effect = "Allow",
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.frontend.iam_arn
        },
        Action   = ["s3:GetObject"],
        Resource = ["${aws_s3_bucket.frontend.arn}/*"]
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.frontend]
}

# Output: used for deployments (aws s3 sync dist s3://<bucket> --delete)
output "frontend_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}

# Optional output: useful if you want to confirm origin hostname for CloudFront
output "frontend_bucket_regional_domain_name" {
  value = aws_s3_bucket.frontend.bucket_regional_domain_name
}


resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        AWS = aws_cloudfront_origin_access_identity.frontend.iam_arn
      },
      Action   = "s3:GetObject",
      Resource = "${aws_s3_bucket.frontend.arn}/*"
    }]
  })
}