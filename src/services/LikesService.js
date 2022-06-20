import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { postsService } from "./PostsService"




class LikesService{

async likePost(post){
    const res = await api.post(`api/posts/${post.id}/like`)
    logger.log(res.data, "here is the like res")
    
    
}
}


export const likesService = new LikesService