<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2" width="440px">
          <v-card-title>{{ $t('action.activeAccount.title') }}</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            {{ $t('action.activeAccount.activation') }}
          </v-card-subtitle>
          <v-card-text class="text-center">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="purple"
            ></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import formFieldMixinVue from '../mixins/formFieldMixin.vue';
import { activateUser } from '../services/auth';
export default {
  name: 'AccountActivation',
  props: {
    uid: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  mixins: [formFieldMixinVue],
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.submit();
    }, 2000);
  },
  methods: {
    submit() {
      activateUser({ uid: this.uid, token: this.token })
        .then(() => {
          this.$router.push({ name: 'Login' });
        })
        .catch((error) => {
          this.setServerError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
