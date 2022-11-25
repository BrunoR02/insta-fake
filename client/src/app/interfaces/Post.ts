export default interface Post {
  id: string
  author: string
  postImage: string
  description: string
  createdAt: string
}

export interface PostInput {
  author: string
  postImage: File
  description: string
}