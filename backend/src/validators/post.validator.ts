import { Request } from "express"
export const payloadGetPostListOfAuthor = (req: Request) => {
  const {authorId} = req.params;
  const payload = {
    ...req.query,
    authorId: authorId
  }
  return payload;
}