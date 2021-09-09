<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2" width="440px">
          <v-card-title>{{ $t('action.activeAccount.title') }}</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            {{ $t('action.activeAccount.confirmation') }}
            <strong>{{ email }}</strong>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AccountRegisterConfirmation',
  props: {
    email: {
      type: String,
    },
  },
};
</script>
