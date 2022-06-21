<template>
    <div class="component">
    
        <button v-if="account.id == activeProfile.id" @click="toggleEdit" class="btn btn-success m-1">Edit Account<i class="m-1 mdi mdi-feather"></i>
        </button>



        <div  class="component post-card d-flex flex-column">
        <div v-if="editingAccount">
        <form class="d-flex flex-column justify-content-between"  @submit.prevent="editAccount" action=""
    >
            <!-- <img class="sized-img img-fluid m-5" :src="profile.picture" alt=""> -->
            <input class="m-2" placeholder="Upload a profile image URL" v-model="profileEdit.imgUrl" type="text">
            <!-- <h3 class="m-2">{{ profile.name }}</h3> -->
            <input class="m-2" placeholder="Change profile name" v-model="profileEdit.name" type="text">
            <!-- <p class=" m-2 text-muted">{{ profile.bio }}</p> -->
            <input class="m-2" placeholder="Change profile bio" v-model="profileEdit.bio" type="text">
            <!-- <a class="m-2 text-decoration-underline link-text" :href="profile.github">Github</a> -->
            <input class="m-2" placeholder="Change Github link" v-model="profileEdit.github" type="text">
            <!-- <a class="m-2 text-decoration-underline link-text" :href="profile.linkedin">LinkedIn</a> -->
            <input class="m-2" placeholder="Change LinkedIn link" v-model="profileEdit.linkedin" type="text">
            <!-- <a class="m-2 text-decoration-underline link-text" :href="profile.resume">Resume</a> -->
            <input class="m-2" placeholder="Change resume link" v-model="profileEdit.resume" type="text">

            <!-- <img class="sized-img" :src="profile.coverImg" alt=""> -->
            <input class="m-2" placeholder="Upload a cover image" v-model="profileEdit.coverImg" type="text">
            <!-- <p class="m-2">Graduated: {{ profile.graduated }}</p> -->
            <input class="m-2" placeholder="Change your own graduation status!" v-model="profileEdit.graduated" type="text">
            <p class="m-2">{{profile.class}}</p>
            <input class="m-2" placeholder="Change your class" v-model="profileEdit.class" type="text">
            <button  class="btn btn-success m-1">Save changes</button>
        </form>
        </div>

           
            
        </div>

    </div>
</template>


<script>
import { computed, ref } from 'vue'
import {AppState} from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'

export default {
    props: { profile: { type: Object, required: true } },
    setup(props){
        const profileEdit = ref({})
        return {
            profileEdit,
            editingAccount: computed(()=> AppState.editingAccount),
            account: computed(()=> AppState.account),
            activeProfile: computed(()=> AppState.activeProfile),

            toggleEdit(){
                accountService.toggleEdit()
            },

            async editAccount(){
                logger.log('sending edit from component', profileEdit.value)
               await accountService.editAccount(profileEdit.value)
            }
        }
    }
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