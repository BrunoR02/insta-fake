const { createConnection } = require("mysql2/promise")
const {randomUUID} = require("crypto")

async function connect(){
  if(global.connection && global.connection !=="disconnected"){
    return global.connection
  }

  const connection = await createConnection("mysql://admin:nsvs6pv14nhn00@insta-fake.cocajfxavccs.sa-east-1.rds.amazonaws.com:3306/post_data")
  console.log("Connected to MySQL Database")
  global.connection = connection
  return connection
}

export async function getPosts(searchValue){
  const conn = await connect()

  const search = '%' + searchValue + '%'

  const data = await conn.query("SELECT * FROM posts WHERE author LIKE ?",[search])

  const posts = data[0]

  return posts
}

export async function addPost(post){
  const conn = await connect()

  const id = randomUUID().slice(0,8)
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ')

  var error = ""

  await conn.query("INSERT INTO posts VALUES (?,?,?,?,?)",[id,post.author,post.postImage,post.description,createdAt]).catch(err=>errorMessage = err.message)

  if(error.length !== 0){
    return {error: true,message: "Erro ao salvar dados no Banco de Dados"}
  }

  return {error: false, message:"Post salvo com sucesso!"}
}