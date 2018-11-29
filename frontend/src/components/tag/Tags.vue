<template>
  <div id="tags">
    <div v-if="tags.length > 0">
      <div class="information">
        Available Tags
      </div>
      <Tag-list :design="'update'" :tags="tags" :button="'Subscribe'" @action="subs"/>
      <div class="information">
        Not enough Tags ? Create your own !
      </div>
    </div>
    <div class="information" v-else>
      There is no available tag. Create the first one !
    </div>
    <div class="create-tag-container">
      <div class="button-container">
        <button class="button tag-create" id="show-modal" @click="showModal = true">Create a Tag</button>
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
        dbTags: [],
      }
    },
    computed: {
      tags() {
        return this.$store.getters['availableTags/all'];
      },
      subscriptions() {
        return this.$store.getters['subscriptions/all'];
      }
    },
    methods: {
      fetchTags() {
        http.get("/tags")
          .then(response => {
            this.$store.dispatch('tags/setTags', response.data);
            this.dbTags = response.data;
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
      setAvailableTags(subscriptions) {   //Ugly but too tired to fine better
        let subscriptionsId = subscriptions.map(tag => tag.id);
        let available = this.dbTags.filter(tag => subscriptionsId.indexOf(tag.id) === -1);
        this.$store.dispatch('availableTags/set', available);
      },
      fetchSubscriptions() {
        let addr = "/users/" + this.userId;
        http.get(addr)
          .then(response => {
            this.$store.dispatch('subscriptions/set', response.data.tags);
            this.setAvailableTags(response.data.tags);
          });
      },
    },
    mounted() {
      let user = this.$cookies.get("currentUser");
      this.userId = user.id;
      this.fetchTags();
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
