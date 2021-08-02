<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto" elevation="2" width="440px" :loading="loading">
          <v-card-title>{{ $t('action.signIn') }}</v-card-title>
          <v-card-text>
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
              <v-btn block color="purple" class="white--text" @click="submit">
                {{ $t('action.login') }}
              </v-btn>

              <router-link
                :to="{ name: 'Register' }"
                class="py-4"
                style="display: block; textAlign: center"
                >{{ $t('action.goToSignUp') }}</router-link
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
import { required, email, minLength } from 'vuelidate/lib/validators';

import formFieldMixin from '../mixins/formFieldMixin.vue';
import { NOTIFICATION, ERROR } from '../utils/notifications';

export default {
  name: 'Login',
  mixins: [formFieldMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },

  data() {
    return {
      loading: false,
      email: '',
      password: '',
    };
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        let userInfo = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch('auth/login', userInfo)
          .then(() => {
            this.$router.push({ name: 'Home' });
          })
          .catch((error) => {
            error.response?.data?.errors?.forEach((err) => {
              if (err.field) {
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
      this.email = '';
      this.password = '';
    },
  },
};
</script>
