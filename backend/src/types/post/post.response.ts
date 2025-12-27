export interface PostCreateResponse {
  id: string,
  content: string,
  media: string[],
  createdAt: string,
  viewType: string
}
export interface StandardPostResponse {
  id: string,
  authorId: string,
  content: string,
  media: string[],
  createdAt: string,
  viewType: string,
  totalReact: {name: string, count: number}[],
  totalComment: number,
  totalShare: number,
}