<template>
  <v-app>
    <v-main>
      <!-- <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Register' }">Register</router-link> -->
      <router-view />
    </v-main>
    <Notification
      v-if="notification"
      :type="notification.type"
      :message="notification.message"
      :alert="notification.alert"
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
