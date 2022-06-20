<template>
    <div class="component">
        <img class="sized-img img-fluid" :src="profile.picture" alt="">
        <h3>{{ profile.name }}</h3>
        <p>{{ profile.bio }}</p>
        <p>{{ profile.github }}</p>
        <p>{{ profile.linkedin }}</p>
        <p>{{ profile.resume }}</p>
        <img class="sized-img" :src="profile.coverImg" alt="">
        <p>Graduated: {{ profile.graduated }}</p>
        <p>{{profile.class}}</p>

        <h3>{{profile.name}}'s Posts:</h3>
        <Post v-for="p in profilePosts" :key="p.id" :post="p" />

    </div>
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
    components: { Post }
}
</script>


<style lang="scss" scoped>
.sized-img{
    max-height: 20vh;
}
</style>