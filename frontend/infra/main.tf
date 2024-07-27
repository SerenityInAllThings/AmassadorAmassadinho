terraform {
  backend "s3" {
    bucket  = "amassador-amassadinho-terraform-state"
    key     = "terraform.state"
    profile = "pessoal"
    region  = "us-east-1"
  }
}

provider "aws" {
  profile = "pessoal"
  region  = "us-east-1"
  alias   = "virginia"
}
