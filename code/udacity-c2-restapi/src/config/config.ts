import 'dotenv/config'; 

console.log(process.env); 

export const config = {
  "dev": {
    "username": process.env.POSTGRES_DEV_USERNAME,
    "password": process.env.POSTGRES_DEV_PASSWORD,
    "database": process.env.POSTGRES_DEV_DATABASE,
    "host": process.env.POSTGRES_DEV_HOST, 
    "dialect": process.env.POSTGRES_DIALECT,
    "aws_region": process.env.POSTGRES_AWS_REGION,
    "aws_profile": process.env.POSTGRES_AWS_PROFILE,
    "aws_media_bucket": process.env.POSTGRES_MEDIA_BUCKET
  },
  "jwt": {
    "secret": " "
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
