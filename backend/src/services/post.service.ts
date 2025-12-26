import { NotFoundRequestError } from "../errors/api/ApiError";
import postRepository from "../repositories/post/post.repository";
import postNodeRepository from '../repositories/post/post.repository.graph'
import { GetPostListOfUserDTO, PostCreateDTO,  } from "../types/post/Post";
import { PostCreateResponse, StandardPostResponse } from "../types/post/post.response";
import userService from "./user.service";
import * as postConverter from '../converters/post.converter';
import { LazyPagination } from "../types/pagination/pagination.response";
import { ViewType } from "../config/enum/post.enum";
class PostService {
  /**
   * Logic nghiệp vụ xử lí logic user tạo post
   * @param payload 
   */
  createPostByUser = async (payload: PostCreateDTO ): Promise<PostCreateResponse> => {
    // check user exist
    const foundUser = await userService.getUserById(payload.authorId);
    if(!foundUser){
      throw new NotFoundRequestError("User is not found");
    }
    // create post
    const newPost = await postRepository.createOne(payload);
    await postNodeRepository.create({authorId: payload.authorId, postId: newPost._id.toString()});
    return postConverter.toPostCreate(newPost);
  }

  getPostListOfAuthor = async (payload: GetPostListOfUserDTO): Promise<{
    postList: StandardPostResponse[],
    pagination: LazyPagination,
  }> => {
    let filter: any = {};
    const {authorId, lastItem, viewerId} = payload;
    // check viewer exist

    if(authorId === viewerId){
      // tự lấy post chính mình
      filter.authorId = authorId;
    }
    else {
      // coi post người khác cần chặn thêm
      filter.viewType = ViewType.public;
      filter.authorId = authorId;
    }
    const postList = await postRepository.getListLazyLoad({
      filter,
      lastItem,
    });
    // convert post response 
    const postListResponse = postList.map((item: any) => postConverter.toStandardPost(item));
    return {
      postList: postListResponse,
      pagination: {
        hasNext: postListResponse.length == 10,
        lastItem: postListResponse.length != 0 ? postListResponse[postListResponse.length - 1].id : '',
      }
    }
  }  
}
export default new PostService();