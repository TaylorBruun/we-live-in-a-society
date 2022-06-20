<template>
<!-- TODO need to make the date pretty -->
    <div class="col elevation-5 my-2 p-2 post-card">
        <h3> <router-link :to="{ name : 'Profile', params: {id: post.creatorId}}"> <img class="img-profile img-fluid" :src="post.creator.picture" alt=""><span class=" display-5">{{post.creator.name}}</span></router-link></h3> 
        <p class="text-muted">{{(post.createdAt)}}</p>
        <img class="img-fluid post-img" :src="post.imgUrl" alt="">
        <p class=" m-0">{{post.body}}</p>
        <p class = "fs-1"><i @click="likePost" class="mdi selectable mdi-heart-outline"></i> {{post.likes.length}}</p>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import {postsService} from '../services/PostsService'
import {likesService} from '../services/LikesService'
import {AppState} from '../AppState'

export default {
    props: { post: { type: Object, required: true } },
    setup(props){
        return {
            async likePost() {
                try {
                    // NOTE this is a remarkably cumbersome solution that will probably eventually break something
                    if(!props.post.likeIds.includes(AppState.account.id)){
                        props.post.likes.length++
                        props.post.likeIds.push(AppState.account.id)
                    } else{
                        props.post.likes.length--
                        props.post.likeIds = []
                    }
                    logger.log('firing off a like to', props.post)
                    await likesService.likePost(props.post)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, "error")
                }
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.img-profile{
    height:30px;
    width:30px;
    border-radius: 50%;
    object-fit: cover;
}

.post-card{
background-color: rgb(191, 174, 255);
}

.post-img{
    max-height:40vh;
}

</style>