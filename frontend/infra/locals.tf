locals {
  hosted_zone_id          = "Z044380681JK86X1V0E0"
  site_domain             = "amassador-amassadinho.${data.aws_route53_zone.main.name}"
  s3_origin_id            = "S3-aa-bucket"
  certificate_domain_name = "api.petersonv.click"
}
