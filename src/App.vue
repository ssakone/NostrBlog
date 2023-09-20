<template>
  <div id="app">
    <div class="navbar bg-base-100 p-4 px-10">
      <div class="navbar-start">
        <a class="btn btn-ghost normal-case text-xl" @click="goToHome()">Nostr - Blog</a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button class="btn btn-ghost btn-circle" @click="toggleTheme()">
          <div class="indicator">
            <Icon :icon="themeIcon" width="22" />
          </div>
        </button>
      </div>
    </div>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Home from './Home.vue';
import Footer from './components/Footer.vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'App',
  components: {
    Icon,
    Home,
    Footer
  },
  data() {
    return {
      isLight: true,
      lightTheme: 'bumblebee',
    }
  },
  mounted() {
    this.isLight = localStorage.getItem('theme') === this.lightTheme;
    this.themeString = !this.isLight ? this.lightTheme : 'dracula';
    document.documentElement.setAttribute('data-theme', this.themeString);
  },
  methods: {
    toggleTheme() {
      this.isLight = !this.isLight;
      this.themeString = !this.isLight ? this.lightTheme : 'dracula';
      localStorage.setItem('theme', this.isLight ? this.lightTheme : 'dracula');
      document.documentElement.setAttribute('data-theme', this.themeString);
    },
    timeAgo(date) {
      return useTimeAgo(date).value;
    },
    goToHome() {
      this.$router.push('/');
    }
  },
  computed: {
    themeIcon() {
      return this.isLight ? 'solar:sun-2-bold-duotone' : 'ic:baseline-nights-stay';
    },
  }
}

</script>