<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2" width="440px" :loading="loading">
          <v-card-title>{{ $t('action.resetPassword') }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                :label="$t('form.email.label')"
                prepend-inner-icon="mdi-email"
                type="email"
                outlined
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-btn block color="purple" class="white--text" @click="submit">
                {{ $t('action.send') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-center" v-if="show">
        <p>
          Un mail va vous être envoyé sur l'adresse que vous avez renseignée.
          <br />
          Veuillez cliquer sur le lien pour confirmer l'activation de votre
          compte.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import formFieldMixinVue from '../mixins/formFieldMixin.vue';
import { resetPassword } from '../services/auth';

export default {
  name: 'ResetPassword',
  mixins: [formFieldMixinVue],
  validations: {
    email: { required, email },
  },
  props: {
    emailPassed: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      email: '',
      show: '',
    };
  },
  created() {
    this.email = this.emailPassed;
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.loading = true;
      if (!this.$v.$invalid) {
        resetPassword({ email: this.email })
          .then(() => {
            this.show = true;
          })
          .catch((error) => this.serverError(error))
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>
