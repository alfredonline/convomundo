data "aws_route53_zone" "primary" {
  name         = "convomundo.com."
  private_zone = false
}

resource "aws_eip" "api" {
  instance = aws_instance.api.id

  tags = {
    Name = "${var.project_name}-api-eip"
  }
}

resource "aws_route53_record" "api" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "api.convomundo.com"
  type    = "A"
  ttl     = 300
  records = [aws_eip.api.public_ip]
}
