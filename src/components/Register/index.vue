<template>
  <div class="mx-auto mt-8" style="maxWidth: 1220px">
    <v-card class="mx-auto pa-8" elevation="2" width="440px">
      <v-card-title>{{ $t('action.signUp') }}</v-card-title>
      <v-form>
        <v-text-field
          v-model="firstName"
          :error-messages="firstNameErrors"
          :label="$t('form.firstName.label')"
          type="text"
          outlined
          required
          @input="touchInput('firstName', true)"
          @blur="touchInput('firstName')"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :error-messages="lastNameErrors"
          :label="$t('form.lastName.label')"
          type="text"
          outlined
          required
          @input="touchInput('lastName', true)"
          @blur="touchInput('lastName')"
        ></v-text-field>
        <v-select
          v-model="promo"
          :items="promoList"
          :error-messages="promoErrors"
          :label="$t('form.promo.label')"
          outlined
          required
          @change="touchInput('promo', true)"
          @blur="touchInput('promo')"
        ></v-select>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          :label="$t('form.email.label')"
          type="email"
          outlined
          required
          @input="touchInput('email', true)"
          @blur="touchInput('email')"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :label="$t('form.password.label')"
          type="password"
          outlined
          required
          @input="touchInput('password', true)"
          @blur="touchInput('password')"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirmation"
          :error-messages="passwordConfirmationErrors"
          :label="$t('form.passwordConfirmation.label')"
          type="password"
          outlined
          required
          @input="touchInput('passwordConfirmation', true)"
          @blur="touchInput('passwordConfirmation')"
        ></v-text-field>
        <v-btn
          color="purple"
          class="mx-auto white--text"
          style="display: block"
          @click="submit"
        >
          {{ $t('action.register') }}
        </v-btn>

        <router-link
          :to="{ name: 'Login' }"
          class="py-4"
          style="display: block; textAlign: center"
          >{{ $t('action.goToSignIn') }}</router-link
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { camelCase } from 'lodash';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

import { emailErrors } from '../../mixins/formFieldMixin';

export default {
  name: 'RegisterCard',
  mixins: [emailErrors],

  validations: {
    firstName: { required },
    lastName: { required },
    promo: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    passwordConfirmation: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs('password'),
    },
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      promo: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      promoList: ['1', '2', '3', '4'],
      serverErrors: {
        firstName: [],
        lastName: [],
        email: [],
        password: [],
        passwordConfirmation: [],
      },
    };
  },

  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required &&
        errors.push(this.$t('form.firstName.error.required'));
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required &&
        errors.push(this.$t('form.lastName.error.required'));
      return errors;
    },
    promoErrors() {
      const errors = [];
      if (!this.$v.promo.$dirty) return errors;
      !this.$v.promo.required &&
        errors.push(this.$t('form.promo.error.required'));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push(this.$t('form.password.error.required'));
      !this.$v.password.minLength &&
        errors.push(this.$t('form.password.error.minLength', { count: 8 }));
      return [...errors, ...this.serverErrors.password];
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.passwordConfirmation.$dirty) return errors;
      !this.$v.passwordConfirmation.required &&
        errors.push(this.$t('form.passwordConfirmation.error.required'));
      !this.$v.passwordConfirmation.minLength &&
        errors.push(
          this.$t('form.passwordConfirmation.error.minLength', { count: 8 })
        );
      !this.$v.passwordConfirmation.sameAsPassword &&
        errors.push(this.$t('form.passwordConfirmation.error.sameAsPassword'));
      return errors;
    },
  },
  methods: {
    touchInput(field, resetServerErrorMessage = false) {
      this.$v[field].$touch();
      resetServerErrorMessage ? (this.serverErrors[field] = []) : null;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let userCredentials = {
          first_name: this.firstName,
          last_name: this.lastName,
          promo: this.promo,
          email: this.email,
          password: this.password,
          re_password: this.passwordConfirmation,
        };
        this.$store
          .dispatch('auth/register', userCredentials)
          .then(() => {
            this.$store.dispatch('notifications/showNotification', {
              type: 'success',
              message: this.$t(`SUCCESS.REGISTRATION`),
              alert: true,
            });
          })
          .catch((error) => {
            error?.response?.data?.errors?.forEach((err) => {
              if (err?.field) {
                this.serverErrors[err.field].push(
                  this.$t(`form.${err.field}.error.${camelCase(err.code)}`)
                );
              } else {
                // handle global error - not related to a specific field
                this.$store.dispatch('notifications/showNotification', {
                  type: 'error',
                  message: this.$t(`ERROR.${err.code.toUpperCase()}`),
                  alert: true,
                });
              }
            });
          });
      }
    },
    clear() {
      this.$v.$reset();
      this.firstName = '';
      this.lastName = '';
      this.promo = '';
      this.email = '';
      this.password = '';
      this.passwordConfirmation = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
