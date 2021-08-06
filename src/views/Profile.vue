<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>
          {{ $t('profile.title') }}
        </h1>

        {{ user }}
      </v-col>
      <v-btn @click="me">Me</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Profile',

  computed: {
    ...mapState('auth', ['user']),
  },

  methods: {
    ...mapActions('auth', ['me']),
  },
};
</script>

<style lang="scss" scoped></style>
