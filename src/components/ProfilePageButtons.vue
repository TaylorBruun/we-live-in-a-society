<template>

    <div>
        <button v-if="nextPage" @click="changePage(nextPage)" style="top: 45%; left: 90%"
            class="btn m-0 btn-primary position-fixed translate-middle">Next</button>
        <button v-if="prevPage" @click="changePage(prevPage)" style="top: 55%; left: 90%"
            class="btn m-0 btn-primary position-fixed translate-middle">Previous</button>
    </div>


</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
    setup(){
        
        return {
            
          nextPage: computed(()=> AppState.nextPage),
          prevPage: computed(()=> AppState.previousPage),
          async changePage(pageUrl){
            try {
              await postsService.getProfilePostsByPage(pageUrl)
              logger.log('sending to service from homepage', pageUrl)
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
          }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>