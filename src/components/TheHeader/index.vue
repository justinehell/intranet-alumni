<template>
  <v-app-bar app color="primary">
    <router-link class="text-decoration-none" :to="{ name: 'Home' }">
      <v-toolbar-title class="white--text">{{ $t('title') }}</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <v-btn :to="{ name: 'Alumni' }" class="mr-4">
      {{ $t('alumni.title') }}
    </v-btn>
    <v-btn :to="{ name: 'Profile' }" dark color="tertiary">
      {{ $t('profile.title') }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>
