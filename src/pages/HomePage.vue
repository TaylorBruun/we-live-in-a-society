<template>
<div class="container-fluid">
  <div class="row d-flex flex-column">
    <Post v-for="p in posts" :key="p.id" :post="p" />

  </div>
  <div>
    
  </div>
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Post from '../components/Post.vue';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import PremiumContent from '../components/PremiumContent.vue';


export default {
    name: "Home",
    components: { Post, PremiumContent },
    setup(){
        onMounted(async ()=> {
                try {
                    await postsService.getPosts()
                } catch (error) {
                    Pop.toast(error.message, "error")
                    logger.error(error)
                }
        });
        return {
          posts: computed(() => AppState.posts)
        }
    }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
