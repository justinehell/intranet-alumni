const formContent = {
  getVInput(input) {
    return cy.get(input).closest('.v-input');
  },

  getVInputMessage(input) {
    return formContent.getVInput(input).find('.v-messages__message');
  },

  getVInputButton(input) {
    return formContent.getVInput(input).find('button');
  },

  field: {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[name="password"]',
    textInput: 'input[type="text"]',
  },

  action: {
    cancelButton: 'button[name="cancel"]',
    submitButton: 'button[name="submit"]',
  },
};

export default formContent;
