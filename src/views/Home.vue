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
export default {
  name: 'Home',
  methods: {
    signOut() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('notifications/showNotification', {
        type: 'info',
        message: this.$t(`WARNING.SIGN_OUT`),
        alert: true,
      });
    },
  },
};
</script>
