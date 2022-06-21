<template>
<div class="row container-fluid">
    <div v-if="ads" class="p-0">
        <div class="col-12 ">
            <img class="img-fluid banner-img" :src="ads[0]?.banner" alt="">
        </div>
        <img class="img-fluid position-fixed bottom-0 banner-img" :src="ads[1]?.banner" alt="">

    </div>


</div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
    setup(){

        return {
            ads: computed(()=> AppState.premiumContent)
        }
    }
}
</script>


<style lang="scss" scoped>
 .banner-img{
    height: 20vh;
    // max-width: 50vh;
    object-fit: contain;
    z-index: 1200;
    
    
 }
</style>