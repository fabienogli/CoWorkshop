<template>
  <div id="tags">
    <div class="create-tag-container">
      <p>Not enough Tags, create your own !</p>
      <div class="button-container">
        <button class="button update" id="show-modal" @click="showModal = true" >Create a Tag</button>
      </div>
    </div>
      <TagForm v-if="showModal" @close="showModal = false" @newTag="addTag"/>
    <Tag-list :design="'update'" :tags="tags" :button="'Subscribe'" @action="subs"/>
    <br/>
    <subscribed-tags ref="subscription"/>
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
      }
    },
    computed: {
      tags() {
        return this.$store.getters['tags/all'];
      }
    },
    methods: {
      getTags() {
        http.get("/tags")
          .then(response => {
            this.$store.dispatch('tags/setTags', response.data);
          });
      },
      addTag(tag) {
          this.$store.dispatch('tags/addTag', tag);
      },
      subs(tag) {
        let addr = "/users/" + this.userId + "/tags";
        http.post(addr, {
          "tag_id": tag.id
        }).then(response => {
          console.log(response);
          this.$refs.subscription.addTag(tag);
          this.$subscriber.perform('TagChannel', 'another_sub', {
            tag: tag.name,
          })
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
  .button-container {
    padding: 2px 10px;
  }
  .create-tag-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
