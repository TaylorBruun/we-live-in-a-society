import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService{

    async getPosts(){
        const res = await api.get('api/posts')
        logger.log(res.data)
        // NOTE might want the "newer, older, page" stuff from the res.data to be saved somewhere
        AppState.posts = res.data.posts
    }

    async getProfilePosts(userId){
        const res = await api.get(`api/posts?creatorId=${userId}`)
        logger.log(res.data, "user posts")
        AppState.profilePosts = res.data.posts
    }

    async getPostById(id){
        const res = await api.get('api/posts/'+id)
        return res
    }

}


export const postsService = new PostsService()