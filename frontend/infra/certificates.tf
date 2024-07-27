data "aws_acm_certificate" "domain-certificate" {
  domain      = local.certificate_domain_name
  most_recent = true
}
