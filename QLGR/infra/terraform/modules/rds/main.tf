resource "aws_db_instance" "main" {
  allocated_storage    = 20
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  name                 = "automotive"
  username             = "postgres"
  password             = "postgres"
  skip_final_snapshot  = true
}
