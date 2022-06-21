<template>

    <div class="col elevation-5 my-2 p-2  post-card">
    <form class="d-flex flex-column justify-content-between"  @submit.prevent="createPost" action=""
    >
    <input
        type="text"
        class="m-3"
        placeholder="Upload a post image"
        v-model="postData.imgUrl"
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="4"
        placeholder="Type your post here"
        class="m-3"
        v-model="postData.body"
      ></textarea>
      <button class="m-3 btn btn-primary">Post!</button>
    </form>
    
    </div>

</template>


<script>
import { ref } from 'vue'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
    setup(){
        const postData = ref({})
        return {
            postData,
            async createPost(){
                try {
                    await postsService.createPost(postData.value)
                    logger.log('sending data out from newpost', postData.value)
                } catch (error) {
                    Pop.toast(error.message, "error");
                    logger.error(error);
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

.post-card {
    background-color: rgb(191, 174, 255);
}
</style>