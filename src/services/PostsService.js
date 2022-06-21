import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService{

    async getPosts(){
        const res = await api.get('api/posts/')
        logger.log('here are the posts', res.data)
        // NOTE might want the "newer, older, page" stuff from the res.data to be saved somewhere
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async getPostsByPage(url){
        // logger.log('sending api request on', url)
        const res = await api.get(url)
        logger.log('here are the posts', res.data)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

        async getProfilePosts(userId){
        const res = await api.get(`api/posts?creatorId=${userId}`)
        logger.log(res.data, "user posts")
        AppState.profilePosts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async getProfilePostsByPage(url){
        // logger.log('sending api request on', url)
        const res = await api.get(url)
        logger.log('here are the posts', res.data)
        AppState.profilePosts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async getPostById(id){
        const res = await api.get('api/posts/'+id)
        return res
    }

    async createPost(postData){
        const res = await api.post('api/posts', postData)
        logger.log('creating a post from postService', res.data)
        AppState.posts = [res.data, ...AppState.posts]
        logger.log('here is what appstate looks like now', AppState.posts)
    }

    async getSearchPosts(search){
        const res = await api.get(`api/posts/?query=${search}`)
        logger.log('here is the search res', res.data)
        AppState.searchedPosts = res.data.posts
        logger.log('here is the appstate searchedPosts after search', AppState.searchedPosts)
    }

}


export const postsService = new PostsService()