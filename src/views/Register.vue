<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto" elevation="2" width="440px" :loading="loading">
          <v-card-title>{{ $t('action.signUp') }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                :label="$t('form.firstName.label')"
                prepend-inner-icon="mdi-account"
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
                prepend-inner-icon="mdi-account"
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
                prepend-inner-icon="mdi-school"
                outlined
                required
                @change="touchInput('promo', true)"
                @blur="touchInput('promo')"
              ></v-select>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                :label="$t('form.email.label')"
                prepend-inner-icon="mdi-email"
                type="email"
                outlined
                required
                @input="touchInput('email', true)"
                @blur="touchInput('email')"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="passwordErrors"
                :label="$t('form.password.label')"
                :type="show ? 'text' : 'password'"
                outlined
                required
                @click:append="show = !show"
                @input="touchInput('password', true)"
                @blur="touchInput('password')"
              ></v-text-field>
              <v-text-field
                v-model="passwordConfirmation"
                :append-icon="showConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="passwordConfirmationErrors"
                :label="$t('form.passwordConfirmation.label')"
                :type="showConfirmation ? 'text' : 'password'"
                outlined
                required
                @click:append="showConfirmation = !showConfirmation"
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
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

import formFieldMixin from '../mixins/formFieldMixin.vue';
import { registerUser } from '../services/auth';
import { NOTIFICATION, SUCCESS } from '../utils/notifications';

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
      show: false,
      showConfirmation: false,
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
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        let userCredentials = {
          firstName: this.firstName,
          lastName: this.lastName,
          promo: this.promo,
          email: this.email,
          password: this.password,
          rePassword: this.passwordConfirmation,
        };
        registerUser(userCredentials)
          .then(() => {
            this.$store.dispatch(
              'notifications/showNotification',
              {
                type: NOTIFICATION.SUCCESS,
                code: SUCCESS.REGISTRATION,
              },
              { root: true }
            );
            this.$router.push({
              name: 'AccountRegisterConfirmation',
              params: { email: this.email },
            });
          })
          .catch((error) => {
            this.setServerError(error);
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
