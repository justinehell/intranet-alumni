<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2" width="440px" :loading="loading">
          <v-card-title>{{ $t('action.resetPassword.title') }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
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
                {{ $t('action.send') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import formFieldMixinVue from '../mixins/formFieldMixin.vue';
import { resetPasswordConfirmation } from '../services/auth';
import { ERROR, NOTIFICATION, SUCCESS } from '../utils/notifications';

export default {
  name: 'ResetPasswordConfirmation',
  mixins: [formFieldMixinVue],
  validations: {
    password: { required, minLength: minLength(8) },
    passwordConfirmation: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs('password'),
    },
  },
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
  data() {
    return {
      loading: false,
      show: false,
      showConfirmation: false,
      password: '',
      passwordConfirmation: '',
    };
  },

  methods: {
    ...mapActions('notifications', ['showNotification']),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        const data = {
          newPassword: this.password,
          reNewPassword: this.password,
          token: this.token,
          uid: this.uid,
        };
        resetPasswordConfirmation(data)
          .then(() => {
            this.showNotification({
              type: NOTIFICATION.SUCCESS,
              code: SUCCESS.PASSWORD_RESET,
            });
            setTimeout(() => this.$router.push({ name: 'Login' }), 2000);
          })
          .catch((error) => {
            this.setServerError(error);
            error.response.data.errors.some((err) => err.field === 'token') &&
              this.showNotification({
                type: NOTIFICATION.ERROR,
                code: ERROR.INVALID_TOKEN,
              });
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>
