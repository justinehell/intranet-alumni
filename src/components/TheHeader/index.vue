<template>
  <v-app-bar app color="primary">
    <v-app-bar-title class="text-no-wrap white--text">{{
      $t('header.title')
    }}</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn @click="$router.push({ name: 'Alumni' })" class="mr-4">
      {{ $t('alumniList.title') }}
    </v-btn>
    <v-btn @click="$router.push({ name: 'Profile' })" dark color="tertiary">
      {{ $t('profile.title') }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>
