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
        new_password: [],
        promo: [],
        phoneNumber: [],
        fixedPhoneNumber: [],
        mobilePhoneNumber: [],
        locationCity: [],
        locationPostcode: [],
        locationAdress: [],
        dateStart: [],
        dateEnd: [],
        functionTitle: [],
        contractType: [],
        company: [],
        department: [],
      },
    };
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName || !this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required &&
        errors.push(this.$t('form.firstName.error.required'));
      return [...errors, ...this.serverErrors.firstName];
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName || !this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required &&
        errors.push(this.$t('form.lastName.error.required'));
      return [...errors, ...this.serverErrors.lastName];
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email || !this.$v.email.$dirty) return errors;
      !this.$v.email.required &&
        errors.push(this.$t('form.email.error.required'));
      !this.$v.email.email && errors.push(this.$t('form.email.error.valid'));
      return [...errors, ...this.serverErrors.email];
    },
    promoErrors() {
      const errors = [];
      if (!this.$v.promo || !this.$v.promo.$dirty) return errors;
      !this.$v.promo.required &&
        errors.push(this.$t('form.promo.error.required'));
      return [...errors, ...this.serverErrors.promo];
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password || !this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push(this.$t('form.password.error.required'));
      !this.$v.password.minLength &&
        errors.push(this.$t('form.password.error.minLength', { count: 8 }));
      return [...errors, ...this.serverErrors.password];
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.passwordConfirmation || !this.$v.passwordConfirmation.$dirty)
        return errors;
      !this.$v.passwordConfirmation.required &&
        errors.push(this.$t('form.passwordConfirmation.error.required'));
      !this.$v.passwordConfirmation.minLength &&
        errors.push(
          this.$t('form.passwordConfirmation.error.minLength', { count: 8 })
        );
      !this.$v.passwordConfirmation.sameAsPassword &&
        errors.push(this.$t('form.passwordConfirmation.error.sameAsPassword'));
      return [...errors, ...this.serverErrors.passwordConfirmation];
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber || !this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.maxLength &&
        errors.push(this.$t('form.phoneNumber.error.maxLength', { count: 10 }));
      !this.$v.phoneNumber.numeric &&
        errors.push(this.$t('form.phoneNumber.error.numeric'));
      return [...errors, ...this.serverErrors.phoneNumber];
    },
    fixedPhoneNumberErrors() {
      const errors = [];
      if (!this.$v.fixedPhoneNumber || !this.$v.fixedPhoneNumber.$dirty)
        return errors;
      !this.$v.fixedPhoneNumber.maxLength &&
        errors.push(this.$t('form.phoneNumber.error.maxLength', { count: 10 }));
      !this.$v.fixedPhoneNumber.numeric &&
        errors.push(this.$t('form.phoneNumber.error.numeric'));
      return [...errors, ...this.serverErrors.fixedPhoneNumber];
    },
    mobilePhoneNumberErrors() {
      const errors = [];
      if (!this.$v.mobilePhoneNumber || !this.$v.mobilePhoneNumber.$dirty)
        return errors;
      !this.$v.mobilePhoneNumber.maxLength &&
        errors.push(this.$t('form.phoneNumber.error.maxLength', { count: 10 }));
      !this.$v.mobilePhoneNumber.numeric &&
        errors.push(this.$t('form.phoneNumber.error.numeric'));
      return [...errors, ...this.serverErrors.mobilePhoneNumber];
    },
    locationPostcodeErrors() {
      const errors = [];
      if (!this.$v.locationPostcode || !this.$v.locationPostcode.$dirty)
        return errors;
      !this.$v.locationPostcode.maxLength &&
        errors.push(
          this.$t('form.locationPostcode.error.maxLength', { count: 10 })
        );
      !this.$v.locationPostcode.numeric &&
        errors.push(this.$t('form.locationPostcode.error.numeric'));
      return [...errors, ...this.serverErrors.locationPostcode];
    },
    locationAdressErrors() {
      const errors = [];
      if (!this.$v.locationAdress || !this.$v.locationAdress.$dirty)
        return errors;
      !this.$v.locationAdress.maxLength &&
        errors.push(
          this.$t('form.locationAdress.error.maxLength', { count: 200 })
        );
      return [...errors, ...this.serverErrors.locationAdress];
    },
    locationCityErrors() {
      const errors = [];
      if (!this.$v.locationCity || !this.$v.locationCity.$dirty) return errors;
      !this.$v.locationCity.maxLength &&
        errors.push(
          this.$t('form.locationCity.error.maxLength', { count: 200 })
        );
      return [...errors, ...this.serverErrors.locationCity];
    },
    dateStartErrors() {
      const errors = [];
      if (!this.$v.dateStart || !this.$v.dateStart.$dirty) return errors;
      !this.$v.dateStart.required &&
        errors.push(this.$t('form.dateStart.error.required'));
      return [...errors, ...this.serverErrors.dateStart];
    },
    dateEndErrors() {
      const errors = [];
      if (!this.$v.dateEnd || !this.$v.dateEnd.$dirty) return errors;
      !this.$v.dateEnd.required &&
        errors.push(this.$t('form.dateEnd.error.required'));
      return [...errors, ...this.serverErrors.dateEnd];
    },
    functionErrors() {
      const errors = [];
      if (!this.$v.functionTitle || !this.$v.functionTitle.$dirty)
        return errors;
      !this.$v.functionTitle.required &&
        errors.push(this.$t('form.function.error.required'));
      !this.$v.functionTitle.maxLength &&
        errors.push(this.$t('form.function.error.maxLength', { count: 200 }));
      return [...errors, ...this.serverErrors.functionTitle];
    },
    contractTypeErrors() {
      const errors = [];
      if (!this.$v.contractType || !this.$v.contractType.$dirty) return errors;
      !this.$v.contractType.required &&
        errors.push(this.$t('form.contractType.error.required'));
      return [...errors, ...this.serverErrors.contractType];
    },
    companyErrors() {
      const errors = [];
      if (!this.$v.company || !this.$v.company.$dirty) return errors;
      !this.$v.company.required &&
        errors.push(this.$t('form.company.error.required'));
      !this.$v.company.maxLength &&
        errors.push(this.$t('form.company.error.maxLength', { count: 200 }));
      return [...errors, ...this.serverErrors.company];
    },
    departmentErrors() {
      const errors = [];
      if (!this.$v.department || !this.$v.department.$dirty) return errors;
      !this.$v.department.maxLength &&
        errors.push(this.$t('form.department.error.maxLength', { count: 200 }));
      return [...errors, ...this.serverErrors.department];
    },
    isFormInvalid() {
      return this.$v.$invalid && this.$v.$dirty;
    },
  },
  methods: {
    setServerError(error) {
      error?.response?.data?.errors?.forEach((err) => {
        if (err?.field && this.serverErrors[err.field]) {
          // HACK - JH - 08/09/2021 - renaming "new_password" to match ResetPasswordConfirmation's data (="password")
          // to be able to get the error message corresponding to this "password" field
          err.field == 'new_password' ? (err.field = 'password') : null;
          this.serverErrors[err.field].push(
            this.$t(`form.${err.field}.error.${camelCase(err.code)}`)
          );
        }
      });
    },
    touchInput(field, resetServerErrorMessage = false) {
      this.$v[field].$touch();
      resetServerErrorMessage ? (this.serverErrors[field] = []) : null;
    },
  },
};
</script>
