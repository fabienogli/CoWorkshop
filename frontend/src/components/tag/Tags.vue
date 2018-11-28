<template>
  <div id="tags">
    <TagForm v-if="showModal" @close="showModal = false" @newTag="addTag"/>
    <Tag-list :style="created" :tags="tags" :button="'sub'" @action="subs"/>
    <br/>
    <subscribed-tags ref="subscription"/>
    <button class="button create" id="show-modal" @click="showModal = true" >Créer un tag</button>
  </div>
</template>

<script>
  import TagList from '@/components/tag/TagList';
  import TagForm from '@/components/tag/TagForm';
  import http from '@/http';
  import SubscribedTags from '@/components/tag/SubscribedTags';

  export default {
    name: "Tags",
    components: {
      TagList,
      TagForm,
      SubscribedTags,
    },
    data() {
      return {
        showModal: false,
        tags: [],
      }
    },
    methods: {
      getTags() {
        http.get("/tags")
          .then(response => {
            this.tags = response.data;
          });
      },
      addTag(tag) {
          this.tags.push(tag);
      },
      subs(tag) {
        let addr = "/users/" + this.userId + "/tags";
        http.post(addr, {
          "tag_id": tag.id
        }).then(response => {
          console.log(response);
          this.$refs.subscription.addTag(tag);
        });
      },
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
