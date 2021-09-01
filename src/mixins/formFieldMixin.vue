<script>
import { camelCase } from 'lodash';
export default {
  data() {
    return {
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
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required &&
        errors.push(this.$t('form.email.error.required'));
      !this.$v.email.email && errors.push(this.$t('form.email.error.valid'));
      return [...errors, ...this.serverErrors.email];
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
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.maxLength &&
        errors.push(this.$t('form.phoneNumber.error.maxLength', { count: 10 }));
      !this.$v.phoneNumber.numeric &&
        errors.push(this.$t('form.phoneNumber.error.numeric'));
      return errors;
    },
    locationPostcodeErrors() {
      const errors = [];
      if (!this.$v.locationPostcode.$dirty) return errors;
      !this.$v.locationPostcode.maxLength &&
        errors.push(
          this.$t('form.locationPostcode.error.maxLength', { count: 10 })
        );
      !this.$v.locationPostcode.numeric &&
        errors.push(this.$t('form.locationPostcode.error.numeric'));
      return errors;
    },
    locationAdressErrors() {
      const errors = [];
      if (!this.$v.locationAdress.$dirty) return errors;
      !this.$v.locationAdress.maxLength &&
        errors.push(
          this.$t('form.locationAdress.error.maxLength', { count: 200 })
        );
      return errors;
    },
    locationCityErrors() {
      const errors = [];
      if (!this.$v.locationCity.$dirty) return errors;
      !this.$v.locationCity.maxLength &&
        errors.push(
          this.$t('form.locationCity.error.maxLength', { count: 200 })
        );
      return errors;
    },
  },
  methods: {
    setServerError(error) {
      error?.response?.data?.errors?.forEach((err) => {
        if (err?.field) {
          this.serverErrors[err.field].push(
            this.$t(`form.${err.field}.error.${camelCase(err.code)}`)
          );
        }
      });
    },
  },
};
</script>
