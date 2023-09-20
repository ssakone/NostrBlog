<template>
    <!-- <div class="card card-side bg-base-200 shadow-sm mt-10">
        <div class="card-body">
            <h2 class="card-title">{{ event.tags[1][1] }}</h2>
            <p class="text-base-content" style="opacity: 0.6">{{ event?.tags[2][1] }}.</p>
            <div class="card-actions justify-end">
                <span class="" style="opacity: 0.7"><b>{{ user_info?.name }}</b><br>{{ timeAgo(new Date(event.created_at *
                    1000))
                }}</span>
                <div class="avatar">
                    <div class="w-10 rounded-full">
                        <img :src="user_info?.picture" />
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img :src="article.image || 'https://www.crazychap.com/uploads/no-banner.jpg'" height="100"
                style="max-height: 200px; min-height: 200px; width: 100%; object-fit: cover;" alt="Shoes" /></figure>
        <div class="card-body">
            <button @click="showThis" class="card-title">
                {{ article.title }}
                <div class="badge badge-secondary">NEW</div>
            </button>
            <p class="break-all">{{ article?.summary || article?.content.length > 80 ? article?.content.slice(0, 80) + "..."
                :
                article?.content || ""
            }}
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
                <span class="mt-1" style="opacity: 0.7"><b>{{ user_info?.name }}</b><br>{{ timeAgo(new Date(event.created_at
                    *
                    1000))
                }}</span>

            </div>

        </div>
    </div>
</template>

<script>
import { useTimeAgo } from '@vueuse/core';
import { useBlog } from '../stores/Blog.js'
import { ref } from 'vue';
export default {
    name: 'Articles',
    props: {
        event: Object,
    },
    setup() {
        const blog = useBlog();
        let article = ref({
            title: '',
            summary: '',
            content: '',
            tags: [],
        })
        return {
            blog,
            article
        }
    },
    mounted() {
        for (let i = 0; i < this.event.tags.length; i++) {
            if (this.event.tags[i][0] == 't') {
                this.article.tags.push(this.event.tags[i][1]);
            }
            this.article[this.event.tags[i][0]] = this.event.tags[i][1];
        }
        this.article['content'] = this.event.content;
        this.blog.getAuthor(this.event.pubkey);
        const timerId = setInterval(() => {
            if (this.blog.authors[this.event.pubkey] != undefined) {
                this.user_info = this.blog.authors[this.event.pubkey];
                clearInterval(timerId);
            }
        }, 1000)
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
        showThis() {
            this.blog.setCurrentPost(this.article)
            console.log("opening")
            this.$router.push({
                name: 'article_details',
                params: {
                    pubkey: this.event.pubkey,
                }
            })
        }
    },
};
</script>