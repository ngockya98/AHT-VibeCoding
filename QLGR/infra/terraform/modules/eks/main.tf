resource "aws_eks_cluster" "main" {
  name     = "automotive-eks"
  role_arn = "arn:aws:iam::123456789012:role/eksClusterRole"
  vpc_config {
    subnet_ids = []
  }
}
