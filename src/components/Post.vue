<template>
<!-- TODO need to make the date pretty -->
    <div class="col elevation-5 my-2 p-2 post-card">
        <h3 class="m-2 p-2"> <router-link :to="{ name : 'Profile', params: {id: post.creatorId}}"> <img class="img-profile img-fluid" :src="post.creator.picture" alt=""><span class=" display-5">{{post.creator.name}}</span></router-link></h3> 
        <p class="m-2 p-2 text-muted">{{prettyDate(post.createdAt)}}</p>
        <img class="m-2 p-2 img-fluid post-img" :src="post.imgUrl" alt="">
        <p class=" m-2 p-2">{{post.body}}</p>
        <p class = "position-relative m-2 p-2 fs-1"><i @click="likePost" class="mdi selectable mdi-heart-outline"></i> {{post.likes.length}} <span v-if="account.id == post.creatorId" > <DeletePostButton :post="post"/></span> </p>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import {postsService} from '../services/PostsService'
import {likesService} from '../services/LikesService'
import {AppState} from '../AppState'
import DeletePostButton from './DeletePostButton.vue';

export default {
    props: { post: { type: Object, required: true } },
    setup(props) {
        return {
            account: computed(()=> AppState.account),
            async likePost() {
                try {
                    if (!props.post.likeIds.includes(AppState.account.id)) {
                        props.post.likes.length++;
                        props.post.likeIds.push(AppState.account.id);
                    }
                    else {
                        props.post.likes.length--;
                        props.post.likeIds = [];
                    }
                    logger.log("firing off a like to", props.post);
                    await likesService.likePost(props.post);
                }
                catch (error) {
                    logger.error(error);
                    Pop.toast(error.message, "error");
                }
            },
            prettyDate(rawDate) {
               return new Date(rawDate).toLocaleDateString();
            }
        };
    },
    components: { DeletePostButton }
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