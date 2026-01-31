variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "project_name" {
  type    = string
  default = "teacher-questions"
}

variable "my_ip_cidr" {
  type        = string
  description = "Your public IP in CIDR format for SSH access"
}

variable "ec2_key_name" {
  type        = string
  description = "Existing EC2 key pair name"
}

variable "github_repo_https" {
  type        = string
  description = "Public HTTPS clone URL"
}

variable "api_port" {
  type    = number
  default = 3000
}

variable "app_root" {
  type    = string
  default = "/opt/infinite_convo"
}

variable "api_domain" {
  type    = string
  default = "api.convomundo.com"
}

variable "certbot_email" {
  type    = string
  default = "hello@aureyatech.com"
}
