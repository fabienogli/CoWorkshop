<template>
  <div id="subscribedTags">
    Subscriptions:
    <tag-list :tags="tags" :button="'unsub'" @action="unsubs" :style="created" >
    </tag-list>
  </div>
</template>

<script>
  import TagList from '@/components/TagList';
  import http from '@/http';

  export default {
    name: "SubscribedTags",
    components: {
      TagList,
    },
    data() {
      return {
        tags: [],
        userId: 0,
      }
    },
    methods: {
      getTags() {
        let addr = "/users/" + this.userId;
        http.get(addr)
          .then(response => {
            this.tags = response.data.tags;
          });
      },
      unsubs(tag) {
        let addr = "/users/" + this.userId + "/tags/" + tag.id;
        http.delete(addr, {}).then(response => {
          let index = this.tags.indexOf(tag);
          this.tags.splice(index, 1);
        })
      },
      addTag(tag) {
        this.tags.push(tag);
      }
    },
    mounted() {
      let user = this.$cookies.get("currentUser");
      this.userId = user.id;
      this.getTags();
    },
  }
</script>

<style scoped>

</style>
