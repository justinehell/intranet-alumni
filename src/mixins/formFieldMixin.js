export const emailErrors = {
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required &&
        errors.push(this.$t('form.email.error.required'));
      !this.$v.email.email && errors.push(this.$t('form.email.error.valid'));
      return [...errors, ...this.serverErrors.email];
    },
  },
};
