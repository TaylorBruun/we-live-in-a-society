<template>
    <div class="component">
<button @click="deletePost" class="delete-post btn btn-danger"> <i class="mdi mdi-trash-can"></i> </button>

    </div>
</template>


<script>
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'

export default {
    props: { post: { type: Object, required: true } },
    setup(props){
        return {
            async deletePost(){
                logger.log('about to attempt delete on', props.post.id)
                await postsService.deletePost(props.post.id)
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.delete-post{
    border-radius:10%;
    position: absolute;
    left: 20%;
    bottom: 20%;
}
</style>