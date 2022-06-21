<template>
    
</template>

<script>
import { computed, onMounted } from 'vue'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import {likesService} from '../services/LikesService'
import {AppState} from '../AppState'

export default {
    props: { searchedPost: { type: Object, required: true } },
    setup(props){
        return {
            searchedPosts: computed(()=> AppState.searchedPosts),
            async likePost() {
                try {
                    
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
            },

        prettyDate(rawDate){
            logger.log('returning pretty date', rawDate)
            return new Date(rawDate).toLocaleDateString()
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