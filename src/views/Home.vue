<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-title>The Nuum Alumni</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn @click="signOut" outlined>{{ $t('action.signOut') }}</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { INFO, NOTIFICATION } from '../utils/notifications';
export default {
  name: 'Home',
  methods: {
    signOut() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('notifications/showNotification', {
        type: NOTIFICATION.INFO,
        code: INFO.SIGN_OUT,
      });
    },
  },
};
</script>
