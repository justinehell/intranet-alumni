<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2" width="440px">
          <v-card-title>{{ $t('action.reset.title') }}</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            {{ $t('action.reset.description') }}
            <strong>{{ emailPassed }}</strong>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ResetPassword',
  props: {
    emailPassed: {
      type: String,
    },
  },
};
</script>
