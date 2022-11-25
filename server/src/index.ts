import express from "express"
import cors from "cors"
import multer from "multer"
import sharp from "sharp"
import { addPost, getPosts } from "./config/db"
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"
import s3, { bucketName } from "./config/s3"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const storage = multer.memoryStorage()
const upload = multer({storage})

app.get("/",(req,res)=>{
  res.send("Servidor Funcionando!")
})

app.post("/posts",async (req,res)=>{
  const {searchValue} = req.body
  console.log(searchValue)
  const posts = await getPosts(searchValue)
  res.send(posts)
})

app.post("/add-post",upload.single("postImage"),async (req,res)=>{
  const file = req.file
  const {author,description} = req.body

  const rawDate = new Date().toLocaleString().replaceAll("/","").replaceAll(" ","").replaceAll(":","")
  const fileName = rawDate + file?.originalname.replaceAll(" ","-")

  const folder = "post-images/"

  const buffer = await sharp(file?.buffer).resize({fit:"contain"}).webp({quality:80}).toBuffer()

  const params:PutObjectCommandInput = {
    Body:buffer,
    Bucket: bucketName,
    Key: folder+fileName,
    ContentType: file?.mimetype
  }

  const command = new PutObjectCommand(params)

  s3.send(command).catch(r=>{
    console.log(r)
    res.json({error: true,message:"Erro ao salvar imagem no s3"})
    return
  })

  const bucketURL = "https://insta-fake.s3.sa-east-1.amazonaws.com/"
  const imageUrl = bucketURL + folder + fileName

  const response = await addPost({postImage: imageUrl, author, description})

  res.json(response)
})

app.listen(PORT,()=>{
  console.log("Server is running on: ", "http://localhost:3000")
})