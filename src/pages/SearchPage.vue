<template>
<div class="container-fluid">
  
  <div class="search">
    <h1 class="m-3">Search for Posts:</h1>
  </div>
  <form class="mx-3" @submit.prevent="searchPosts" action="">

    <input type="text" placeholder="Enter search" v-model="search">
    <button class=" mx-3 button btn btn-primary">Search</button>
  </form>
  <h1 class="m-3">Search Results:</h1>

  <div class="row d-flex flex-column">
    <Post  v-for="s in searchedPosts" :key="s.id" :post="s" />
  </div>
    </div>


</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'


export default {
    name: "SearchPage",
    setup() {
        const search = ref("");
        return {
            search,
            posts: computed(() => AppState.posts),
            searchedPosts: computed(() => AppState.searchedPosts),
            async searchPosts() {
                try {
                    await postsService.getSearchPosts(search.value);
                }
                catch (error) {
                    Pop.toast(error.message, "error");
                    logger.error(error);
                }
            }
        };
    },
   
}
</script>
