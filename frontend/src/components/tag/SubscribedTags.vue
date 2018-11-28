<template>
  <div id="subscribedTags">
    <div class="subscription-container" v-if="subscriptions.length > 0" >
      <h2>Subscriptions</h2>
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

</style>
