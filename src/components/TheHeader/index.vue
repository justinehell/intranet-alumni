<template>
  <v-app-bar app color="primary">
    <v-app-bar-title class="text-no-wrap white--text">
      <router-link
        class="white--text text-decoration-none"
        :to="{ name: 'Home' }"
        >{{ $t('header.title') }}</router-link
      >
    </v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn :to="{ name: 'Alumni' }" class="mr-4">
      {{ $t('alumniList.title') }}
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
