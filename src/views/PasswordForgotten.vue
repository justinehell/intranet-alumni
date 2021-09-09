<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2" width="440px" :loading="loading">
          <v-card-title>{{ $t('action.resetPassword.title') }}</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>{{
            $t('action.resetPassword.description')
          }}</v-card-subtitle>
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
            </v-form>
          </v-card-text>
          <v-card-actions class="px-4 pt-0 pb-4">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click.stop="$router.push({ name: 'Login' })"
              >{{ $t('action.cancel') }}</v-btn
            >
            <v-btn color="purple" class="white--text" @click="submit">
              {{ $t('action.send') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import formFieldMixinVue from '../mixins/formFieldMixin.vue';
import { resetPassword } from '../services/auth';

export default {
  name: 'PasswordForgotten',
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
    };
  },
  created() {
    this.email = this.emailPassed;
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        resetPassword({ email: this.email })
          .then(() => {
            this.$router.push({
              name: 'ResetPassword',
              params: { emailPassed: this.email },
            });
          })
          .catch((error) => this.serverError(error))
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>
