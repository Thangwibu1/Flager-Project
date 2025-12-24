import { Post } from "../models/post/post.model.mongo"; 

class PostRepository {
    createOne = async (data: any) => {
        const newPost = await Post.create(data);
        return newPost;
    }
}
export default new PostRepository();