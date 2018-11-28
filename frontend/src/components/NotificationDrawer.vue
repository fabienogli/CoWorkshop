<template>
  <div class="notification-drawer">
    <div v-for="notif in notifications"
         class="notification-item"
         :class="isRead(notif)"
         @click="notifClicked(notif)"
    >
      {{notif.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotificationDrawer",
    data() {
      return {}
    },
    methods: {
      isRead(notif) {
        return notif.read ? '' : 'unread';
      },
      notifClicked(notif) {
        this.$store.dispatch('notification/setRead', notif);
        if(notif.redirects_to) {
          this.$router.push(notif.redirects_to);
        }
      }
    },
    computed: {
      notifications() {
        return this.$store.getters['notification/notifs'].slice().sort((a, b) => b.id - a.id);
      },
    }
  }
</script>

<style lang="scss">
  @import "~@/styles/_variable";
  .notification-drawer {
    .notification-item {
      cursor: pointer;
    }
    .unread {
      background: $lightGrey;
    }
  }
</style>
