<template>
  <div class="mx-auto mt-8" style="maxWidth: 1220px">
    <v-card class="mx-auto pa-8" elevation="2" width="440px">
      <v-card-title>{{ $t('action.signIn') }}</v-card-title>
      <v-form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          :label="$t('form.email.label')"
          type="email"
          outlined
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :label="$t('form.password.label')"
          type="password"
          outlined
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn
          color="purple"
          class="mx-auto white--text"
          style="display: block"
          @click="submit"
        >
          {{ $t('action.login') }}
        </v-btn>

        <router-link
          :to="{ name: 'Register' }"
          class="py-4"
          style="display: block; textAlign: center"
          >{{ $t('action.goToSignUp') }}</router-link
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { camelCase } from 'lodash';
import { required, email } from 'vuelidate/lib/validators';

import { emailErrors } from '../../mixins/formFieldMixin';
import { NOTIFICATION, ERROR } from '../../utils/notifications';

export default {
  name: 'LoginCard',
  mixins: [emailErrors],

  validations: {
    email: { required, email },
    password: { required },
  },

  data() {
    return {
      email: '',
      password: '',
      serverErrors: {
        email: [],
        password: [],
      },
    };
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push(this.$t('form.password.error.required'));
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('auth/login', {
            email: this.email,
            password: this.password,
          })
          .then(() => this.$router.push({ name: 'Home' }))
          .catch((error) => {
            console.log(error);
            error.response?.data?.errors?.forEach((err) => {
              if (err.field) {
                this.serverErrors[err.field].push(
                  this.$t(`form.${err.field}.error.${camelCase(err.code)}`)
                );
              } else {
                // handle global error - not related to a specific field
                console.log(ERROR[err.code.toUpperCase()]);
                this.$store.dispatch('notifications/showNotification', {
                  type: NOTIFICATION.ERROR,
                  code: ERROR[err.code.toUpperCase()],
                });
              }
            });
          })
          .finally(() => {});
      }
    },
    clear() {
      this.$v.$reset();
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
