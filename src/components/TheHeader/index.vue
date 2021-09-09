<template>
  <v-app-bar app color="deep-purple">
    <v-app-bar-title>The Nuum Alumni</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn @click="$router.push({ name: 'Alumni' })" class="mr-4">
      {{ $t('alumniList.title') }}
    </v-btn>
    <v-btn @click="$router.push({ name: 'Profile' })" color="secondary">
      {{ $t('profile.title') }}
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>
