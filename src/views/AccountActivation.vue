<template>
  <v-container>
    <h1>Activation du compte</h1>
    <span
      >Votre compte va être activé dans un instant. Vous allez être redirigé
      vers la page de connexion</span
    >
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="purple"
    ></v-progress-circular>
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
          //this.$router.push({ name: 'Login' });
          this.loading = false;
        });
    },
  },
};
</script>
