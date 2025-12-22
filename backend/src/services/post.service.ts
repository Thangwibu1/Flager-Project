import { NotFoundRequestError } from "../errors/api/ApiError";
import postRepository from "../repositories/post.repository";
import { PostCreateDTO } from "../types/post/Post";
import userService from "./user.service";

class PostService {
  createPostByUser = async (payload: PostCreateDTO & {userId: string}) => {
    // check user exist
    const foundUser = userService.getUserById(payload.userId);
    if(!foundUser){
      throw new NotFoundRequestError("User is not found");
    }
    // create post
    await postRepository.createOne(payload);
  }
}
export default new PostService();