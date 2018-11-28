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
    display: flex;
    height: 100%;
    width: 60%;
    margin: auto;
    flex-direction: column;
    padding-top: 30px;
    .notification-item {
      font-size: 18px;
      padding-left: 10px;
      padding-top: 10px;
      border-bottom: 1px solid $lightGrey;
      border-left: 1px solid $lightGrey;
      border-right: 1px solid $lightGrey;
      flex: 1;
      max-height: 30px;
      cursor: pointer;
      margin: 0;
      text-align: center;

      justify-content: center;
      &:nth-child(2n) {
        background-color: #ededed;
      }
      &:first-child {
        border-top: 1px solid $lightGrey;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }

    }
    .unread {
      background: #787878;
    }
  }
</style>
