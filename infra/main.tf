// this config will build a virtual network in AWS 
// with one public subnet that can access the internet
// a subnet is a network inside a network
// this is needed for setting up a network on an ec2 instance which has a public ip 
// which we can ssh into and that users can reach from the internet 
// essentially this allows ec2 to talk to the outside world 

// used to ask AWS a question and get an answer
// will return a list of availability zones in the region
// we store the answer in a variable called data.aws_availability_zones.available.names
data "aws_availability_zones" "available" {}

resource "aws_vpc" "main" {
  // ip address range for the the isolated network 
  // we are creating in the wider aws network separated from other companies
  // the blocks after cidr_block allow AWS to give things DNS names. Without this, EC2 
  // instances won't get public DNS names (these should always be on)
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  // just used for identifying resources in AWS console
  tags = {
    Name = "${var.project_name}-vpc"
  }
}

// this is the door to the internet (connects the VPC to the public internet)
resource "aws_internet_gateway" "igw" {
  // terraform sees this and knows the VPC must be created first
  vpc_id = aws_vpc.main.id
  tags   = { Name = "${var.project_name}-igw" }
}

// this is a subnet or basically a smaller slice of the network we created in the VPC
// you never put EC2 directly in the VPC
resource "aws_subnet" "public" {
  vpc_id = aws_vpc.main.id

  // ✅ FIXED: must be a valid CIDR block. This is a /24 subnet within the VPC's /16 range.
  // Valid examples: 10.0.1.0/24, 10.0.10.0/24, etc.
  cidr_block = "10.0.10.0/24"

  availability_zone = data.aws_availability_zones.available.names[0] // place this subnet in the first availability zone
  // subnets belong to exactly one AZ
  map_public_ip_on_launch = true // when I launch an EC2 instance in this subnet, it will automatically get a public IP
  // without the above line, ec2 would be private, couldn't ssh in, and the api wouldn't be reachable from the internet

  tags = { Name = "${var.project_name}-public-subnet" }
}

// decides where the network traffic should go
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  // for any ip addresses on the internet, send all traffic through the internet gateway 
  route {
    cidr_block = "0.0.0.0/0" // any ip on the internet
    gateway_id = aws_internet_gateway.igw.id
    // without the above lines, ec2 would get a public IP but traffic wouldn't actually leave the VPC
  }

  tags = { Name = "${var.project_name}-public-rt" }
}

// attaches the route table to the subnet so basically gives the subnet an internet route. without this, 
// the gateway would be useless 
resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Internet
#    │
# [Internet Gateway]
#    │
# [VPC 10.0.0.0/16]
#    │
# [Public Subnet 10.0.10.0/24]
#    │
# [EC2 instance with public IP]
