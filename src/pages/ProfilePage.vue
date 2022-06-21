<template>
    <div class="component post-card d-flex flex-column">
        <img class="sized-img img-fluid m-5" :src="profile.picture" alt="">
        <h3 class="m-2">{{ profile.name }}</h3>
        <p class=" m-2 text-muted">{{ profile.bio }}</p>
        
        <h5 class='m-2'>Profile links:</h5>
        <a class="m-2 text-decoration-underline link-text" :href="profile.github">Github</a>
        <a class="m-2 text-decoration-underline link-text" :href="profile.linkedin">LinkedIn</a>
        <a class="m-2 text-decoration-underline link-text" :href="profile.resume">Resume</a>
        
        <img class="sized-img" :src="profile.coverImg" alt="">
        <p class="m-2">Graduated: {{ profile.graduated }}</p>
        <p class="m-2">{{profile.class}}</p>

        <h3 class="m-2">{{profile.name}}'s Posts:</h3>
        <Post v-for="p in profilePosts" :key="p.id" :post="p" />

    </div>
    <ProfilePageButtons />
</template>


<script>
import { computed, onMounted } from 'vue'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import {profilesService} from '../services/ProfilesService'
import { useRoute } from 'vue-router';
import {AppState} from '../AppState'
import Post from '../components/Post.vue';
import { postsService } from '../services/PostsService';
import PageButtons from '../components/PageButtons.vue';
import ProfilePageButtons from '../components/ProfilePageButtons.vue';

export default {
    setup() {
        const route = useRoute();
        onMounted(async () => {
            try {
                AppState.activeProfile = [];
                AppState.profilePosts = [];
                await profilesService.getProfile(route.params.id);
                await postsService.getProfilePosts(route.params.id)
            }
            catch (error) {
                Pop.toast(error.message, "error");
                logger.error(error);
            }
        });
        return {
            profile: computed(() => AppState.activeProfile),
            profilePosts: computed(() => AppState.profilePosts)
        };
    },
    components: { Post, PageButtons, ProfilePageButtons }
}
</script>


<style lang="scss" scoped>
.sized-img{
    max-height: 20vh;
    object-fit: contain;
}
.post-card{
background-color: rgb(191, 174, 255);
}
.link-text{
    color: rgb(6, 0, 59)
}




</style>