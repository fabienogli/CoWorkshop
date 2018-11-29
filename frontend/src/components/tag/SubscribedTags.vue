<template>
  <div id="subscribedTags" class="subscribed-tags">
    <div class="subscription-container" v-if="subscriptions.length > 0" >
      <div class="information">Subscriptions</div>
      <tag-list :tags="subscriptions" :button="'Unsubscribe'" @action="unsubs" :design="'delete'" />
    </div>
  </div>
</template>

<script>
  import TagList from '@/components/tag/TagList';
  import http from '@/http';

  export default {
    name: "SubscribedTags",
    components: {
      TagList,
    },
    props: {
      subscriptions: {
        default: function () {
          return []
        }
      },
    },
    data() {
      return {
      }
    },
    methods: {
      unsubs(tag) {
        let addr = "/users/" + this.userId + "/tags/" + tag.id;
        http.delete(addr, {}).then(response => {
          this.$store.dispatch('subscriptions/remove', tag);
          this.$store.dispatch('availableTags/add', tag);
        })
      },
    },
    computed: {
      userId() {
        let user = this.$cookies.get("currentUser");
        return user.id;
      }
    },
  }
</script>

<style scoped>
  .subscribed-tags {
    padding: 10px;
  }
</style>
