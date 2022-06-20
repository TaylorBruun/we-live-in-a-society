<template>
  <header>
    <Navbar />
  </header>
  <main>
    <!-- <PremiumContent /> -->
    <router-view />
  </main>
  <footer>
    <div class="fixed-space"></div>
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import {premiumContentService} from './services/PremiumContentService'
import PremiumContent from './components/PremiumContent.vue'
export default {
    name: "App",
    setup() {
        onMounted(async () => {
            await premiumContentService.getContent();
        });
        return {
            appState: computed(() => AppState)
            
        };
    },
    components: { PremiumContent }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.fixed-space{
  min-height:20vh
}
</style>
