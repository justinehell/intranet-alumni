<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto" elevation="2" width="440px" :loading="loading">
          <v-card-title>{{ $t('action.signUp') }}</v-card-title>
          <v-card-text>
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
              <v-btn block color="purple" class="white--text" @click="submit">
                {{ $t('action.register') }}
              </v-btn>

              <router-link
                :to="{ name: 'Login' }"
                class="py-4"
                style="display: block; textAlign: center"
                >{{ $t('action.goToSignIn') }}</router-link
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { camelCase } from 'lodash';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

import formFieldMixin from '../mixins/formFieldMixin.vue';
import { ERROR, NOTIFICATION } from '../utils/notifications';

export default {
  name: 'Register',
  mixins: [formFieldMixin],

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
      loading: false,
      firstName: '',
      lastName: '',
      promo: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      promoList: ['1', '2', '3', '4'],
    };
  },
  methods: {
    touchInput(field, resetServerErrorMessage = false) {
      this.$v[field].$touch();
      resetServerErrorMessage ? (this.serverErrors[field] = []) : null;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
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
          .then(() => this.$router.push({ name: 'Login' }))
          .catch((error) => {
            error?.response?.data?.errors?.forEach((err) => {
              if (err?.field) {
                this.serverErrors[err.field].push(
                  this.$t(`form.${err.field}.error.${camelCase(err.code)}`)
                );
              } else {
                // handle global error - not related to a specific field
                this.$store.dispatch('notifications/showNotification', {
                  type: NOTIFICATION.ERROR,
                  code: ERROR[err.code.toUpperCase()],
                });
              }
            });
          })
          .finally(() => {
            this.loading = false;
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
