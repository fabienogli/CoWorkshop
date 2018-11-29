<template>
  <div id="tags">
  <div class="information">
    Available Tags
  </div>
  <Tag-list :design="'update'" :tags="tags" :button="'Subscribe'" @action="subs"/>
  <div class="create-tag-container">
      <div class="information">
        Not enough Tags ? Create your own !
      </div>
      <div class="button-container">
        <button class="button tag-create" id="show-modal" @click="showModal = true" >Create a Tag</button>
      </div>
    </div>
    <TagForm v-if="showModal" @close="showModal = false"/>
    <subscribed-tags :subscriptions="subscriptions"/>
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
        return this.$store.getters['availableTags/all'];
      },
      subscriptions() {
        let test = this.$store.getters['subscriptions/all'];
        return test;
      }
    },
    methods: {
      getTags() {
        http.get("/tags")
          .then(response => {
            this.$store.dispatch('availableTags/set', response.data);
          });
      },
      subs(tag) {
        let addr = "/users/" + this.userId + "/tags";
        http.post(addr, {
          "tag_id": tag.id
        }).then(response => {
          this.$store.dispatch('subscriptions/add', tag);
          this.$store.dispatch('availableTags/remove', tag);
          this.$subscriber.perform('TagChannel', 'another_sub', {
            tag: tag.name,
          })
        });
      },
      fetchSubscriptions() {
        let addr = "/users/" + this.userId;
        http.get(addr)
          .then(response => {
            this.$store.dispatch('subscriptions/set', response.data.tags);
          });
      },
    },
    mounted() {
      let user = this.$cookies.get("currentUser");
      this.userId = user.id;
      this.getTags();
      this.fetchSubscriptions();
    },
  }
</script>

<style lang="scss" scoped>

  @import "~@/styles/_variable";

  .button-container {
    padding: 2px 10px;
  }
  .create-tag-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .information {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .tag-create {
    background-color: $capri;
    color: $primaryText;
  }
</style>
