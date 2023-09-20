import { defineStore } from "pinia";
import { ref } from "vue";

export const useBlog = defineStore("blog", {
  state: () => {
    let connected = ref(false);
    let blogPosts = ref([]);
    let authors = ref({});
    let currentPost = ref({});

    const random_n_blog_posts =
      "post_" + Math.random().toString(36).substring(7);
    const random_n_blog_authors =
      "author_" + Math.random().toString(36).substring(7);
    const connection = new WebSocket("wss://relay.nostr.band/");

    connection.onopen = () => {
      connected.value = true;
    };

    connection.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (data[0] == "EVENT" && data[1] == random_n_blog_posts) {
        if ("pubkey" in data[2]) {
          blogPosts.value.push(data[2]);
        }
      } else if (data[0] == "EVENT" && data[1].startsWith("author_")) {
        authors.value[data[2].pubkey] = JSON.parse(data[2].content);
      }
    };

    return {
      connected,
      connection,
      random_n_blog_posts,
      random_n_blog_authors,
      blogPosts,
      authors,
      currentPost,
    };
  },
  actions: {
    sendMessage(message) {
      this.connection.send(message);
    },
    getBlogPosts() {
      this.sendMessage(
        '["REQ", "' +
          this.random_n_blog_posts +
          '", {"kinds": [30023], "limit": 100}]'
      );
    },
    getAuthor(author) {
      this.sendMessage(
        '["REQ", "' +
          this.random_n_blog_authors +
          '", {"kinds": [0], "limit": 20, "authors": ["' +
          author +
          '"]}]'
      );
    },
    setCurrentPost(post) {
      this.currentPost = post;
    },
  },
});
