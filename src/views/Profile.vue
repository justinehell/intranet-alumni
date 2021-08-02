<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>
          {{ $t('profile.title') }}
        </h1>

        {{ user }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Profile',

  computed: {
    ...mapState('auth', ['user']),
  },
};
</script>

<style lang="scss" scoped></style>
