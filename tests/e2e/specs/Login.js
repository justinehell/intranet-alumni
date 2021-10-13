// https://docs.cypress.io/api/introduction/api.html
const getVInput = (input) => {
  return cy.get(input).closest('.v-input');
};

const getVInputMessage = (input) => {
  return getVInput(input).find('.v-messages__message');
};

const getVInputButton = (input) => {
  return getVInput(input).find('button');
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Se connecter');
  });

  describe('email field', () => {
    const emailInput = "[type='email']";

    it('should have a correct email input', () => {
      cy.get(emailInput)
        .type('hell.justine@gmail.com')
        .should('have.value', 'hell.justine@gmail.com')
        .clear();
    });

    it('should show a message with invalid email input', () => {
      getVInput(emailInput).type('hell.justineagmail.com');

      getVInputMessage(emailInput).contains(
        'Veuillez renseigner une adresse e-mail valide'
      );
    });

    it('should show a required message with empty email input', () => {
      getVInput(emailInput)
        .type(' ')
        .clear();

      getVInputMessage(emailInput).contains("L'adresse e-mail est requise.");
    });
  });

  describe('password field', () => {
    const passwordInput = "[name='password']";

    it('should show a message with invalid password input', () => {
      getVInput(passwordInput).type('123456');

      getVInputMessage(passwordInput).contains(
        'Le mot de passe doit posséder au moins 8 caractères.'
      );
    });

    it('should show a required message with empty email input', () => {
      getVInput(passwordInput)
        .type(' ')
        .clear();

      getVInputMessage(passwordInput).contains('Le mot de passe est requis.');
    });

    it('should toggle password', () => {
      getVInputButton(passwordInput).should('have.class', 'mdi-eye-off');
      cy.get(passwordInput).should('have.attr', 'type', 'password');

      getVInputButton(passwordInput).click();

      getVInputButton(passwordInput).should('have.class', 'mdi-eye');
      cy.get(passwordInput).should('have.attr', 'type', 'text');

      getVInputButton(passwordInput).click();

      getVInputButton(passwordInput).should('have.class', 'mdi-eye-off');
      cy.get(passwordInput).should('have.attr', 'type', 'password');
    });
  });
});
