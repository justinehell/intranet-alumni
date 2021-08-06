<template>
  <v-app-bar app color="deep-purple" dark>
    <v-app-bar-title>The Nuum Alumni</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn
      class="mr-4"
      color="primary"
      depressed
      @click="$router.push({ name: 'Profile' })"
    >
      Profile
    </v-btn>
    <v-btn @click="signOut" outlined>{{ $t('action.signOut') }}</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheHeader',
  methods: {
    signOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
