<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Notification
      v-if="notification"
      :type="notification.type"
      :code="notification.code"
      :key="notification.message"
    />
  </v-app>
</template>

<script>
import Notification from './components/Notification';
export default {
  name: 'App',
  components: {
    Notification,
  },

  computed: {
    notification() {
      return this.$store.state.notifications.notifications;
    },
  },
};
</script>
