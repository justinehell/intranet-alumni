<template>
  <v-app-bar app color="deep-purple" dark>
    <v-app-bar-title>The Nuum Alumni</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn @click="$router.push({ name: 'Alumni' })" icon>
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>
    <v-btn @click="$router.push({ name: 'Profile' })" icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn @click="signOut" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
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
