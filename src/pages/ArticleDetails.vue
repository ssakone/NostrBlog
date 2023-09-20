<template>
    <div class="container mx-auto p-12 w-8/12 flex flex-row flex-col justify-between">
        <figure><img :src="article.image || 'https://www.crazychap.com/uploads/no-banner.jpg'" class="rounded-xl shadow-md"
                height="100" style="width: 100%; object-fit: cover;" alt="Shoes" /></figure>
        <div class="card-body">
            <a href="#" @click="showThis" class="card-title">
                {{ article.title }}
                <div class="badge badge-secondary">NEW</div>
            </a>
            <p class="prose prose-xl">
            <div v-html="article.preview"></div>
            </p>
            <div class="card-actions justify-end">
                <div class="badge badge-outline badge-xs p-2" v-for="tag in article.tags || []">{{ tag }}</div>
            </div>
            <div class="card-actions justify-start">
                <div class="avatar">
                    <div class="w-14 shadow-md rounded-full">
                        <img :src="user_info?.picture || 'https://scrapbox.io/api/pages/icons/nostr/icon'" />
                    </div>
                </div>
                <!-- <span class="mt-1" style="opacity: 0.7"><b>{{ user_info?.name }}</b><br>{{ timeAgo(new Date(event.created_at
                    *
                    1000))
                }}</span> -->

            </div>
        </div>
    </div>
</template>

<script>
import { useTimeAgo } from '@vueuse/core';
import { useBlog } from '../stores/Blog.js'
import { ref } from 'vue';

import showdown from 'showdown';
let converter = new showdown.Converter(),
    text = '# hello, markdown!',
    html = converter.makeHtml(text);


export default {
    name: 'ArticleDetails',
    props: {
        event: Object,
    },
    setup() {
        const blog = useBlog();
        let article = ref({
            title: '',
            summary: '',
            content: '',
            preview: '',
            tags: [],
        })
        return {
            blog,
            article
        }
    },
    mounted() {
        this.article = this.blog.currentPost;
        document.title = this.article.title;
        window.scrollTo(0, 0)
        this.article.preview = converter.makeHtml(this.article.content);
    },
    data() {
        return {
            user_info: Object,
            random_n: Math.random() * 10000,
        };
    },

    methods: {
        timeAgo(event) {
            return useTimeAgo(event).value;
        },
        getMarked(content) {
            return marked(content);
        },
    },
}

</script>