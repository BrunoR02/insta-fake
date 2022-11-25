import { S3Client } from "@aws-sdk/client-s3"
import {config} from "dotenv"
config()

const region = "sa-east-1"
const accessKeyId = process.env.ACCESS_KEY_ID as string
const secretAccessKey = process.env.SECRET_ACCESS_KEY as string
export const bucketName = "insta-fake"

const s3 = new S3Client({ 
  credentials:{
    accessKeyId,
    secretAccessKey
  },
  region,
})

export default s3