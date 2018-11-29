<template>
  <div class="notification-drawer">
    <div v-if="notifications.length > 0">
      <div class="mark-all-as-read" @click="setAllRead">
        Mark all as read
      </div>
      <div class="notification-wrapper">
        <div v-for="notif in notifications"
             class="notification-item"
             :class="isRead(notif)"
             @click="notifClicked(notif)">
          {{notif.title}}
          <span @click.stop="setRead(notif)" class="mark-as-read" :class="isRead(notif)"></span>
        </div>
      </div>
    </div>
    <div v-else class="information">You don't have any notifications.</div>
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
      },
      setRead(notif) {
        if(!notif.read) {
          this.$store.dispatch('notification/setRead', notif);
        } else {
          this.$store.dispatch('notification/setUnread', notif);
        }
      },
      setAllRead(notif) {
        this.notifications.forEach(notif => {
          this.$store.dispatch('notification/setRead', notif);
        })
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
    min-width: 75%;
    .mark-all-as-read {
      text-align: right;
      font-size: 17px;
      color: #008CBA;
      &:hover {
        cursor: pointer;
      }
    }
    .notification-item {
      font-size: 18px;
      padding: 5px;
      border-bottom: 1px solid $lightGrey;
      border-left: 1px solid $lightGrey;
      border-right: 1px solid $lightGrey;
      flex: 1;
      ;
      max-height: 50px;
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

      .mark-as-read {
        height: 10px;
        width: 10px;
        background-color: #eeeeee;
        border-radius: 50%;
        display: inline-block;

        border: 1px solid $lightGrey;

        &.unread {
          background-color: #636363 !important;
        }
      }

    }
    .unread {
      background: #919191 !important;
    }
  }
</style>
