<template>
    <div class="container mx-auto p-12 w-10/12 flex flex-row flex-col justify-between">
        <h1>Latest blog post</h1>
        <div class="p-2 bg-base-100 flex flex-row flex-wrap" style="justify-content:  space-between;">
            <Articles class=":w-92 my-4" :event="event" v-for="event in blog.blogPosts" :key="event.id" />
        </div>
    </div>
    <Footer />
</template>
  
<script>
import { Icon } from '@iconify/vue';
import { useTimeAgo } from '@vueuse/core';
import Articles from './components/Articles.vue';
import Footer from './components/Footer.vue'
import { useBlog } from './stores/Blog.js'


export default {
    setup() {
        const blog = useBlog();
        return {
            blog
        }
    },
    components: {
        Icon,
        Articles,
        Footer
    },

    mounted() {
        const timerId = setInterval(() => {
            if (this.blog.connected) {
                this.blog.getBlogPosts();
                clearInterval(timerId);
            }
        }, 1000)
    },

    created() {

    },
    methods: {

        getAuthor(event) {
            return event.tags[1][1];
        },
    },
    computed: {
        authorName(event) {
        },
    },
}

</script>
  
<style scoped></style>
  