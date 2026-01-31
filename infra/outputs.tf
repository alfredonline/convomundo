output "api_public_ip" {
  // an output that terraform prints after apply so humans and other tools can use / see it
  // used just for exposing information
  value = aws_instance.api.public_ip
  // after terraform finishes, print the public ip address of the ec2 instance called api 
}

// 
output "api_public_dns" {
  // prints the aws generated public dns name 
  value = aws_instance.api.public_dns
}



output "api_domain" {
  value = "http://api.convomundo.com"
}
