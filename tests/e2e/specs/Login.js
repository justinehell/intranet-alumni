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
  const emailInput = "[type='email']";
  const passwordInput = "[name='password']";

  beforeEach(() => {
    cy.visit('/');
    cy.contains('Se connecter');
  });

  describe('email field', () => {
    it('should have a correct email input', () => {
      cy.get(emailInput)
        .type('example@gmail.com')
        .should('have.value', 'example@gmail.com')
        .clear();
    });

    it('should show a message with invalid email input', () => {
      getVInput(emailInput).type('exampleagmail.com');

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
    it('should show a message with invalid password input', () => {
      getVInput(passwordInput).type('123password');

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

  describe('click link', () => {
    it('should go to register page', () => {
      cy.get('a[href*="/register"]').click();

      cy.location('pathname').should('eq', '/register');
    });

    it('should go to forgotten password page', () => {
      cy.get('a[href*="/password/forgotten"]').click();

      cy.location('pathname').should('eq', '/password/forgotten');
    });
  });

  describe('submit form', () => {
    it('should fail and show no active account error message', () => {
      cy.intercept('POST', '/auth/jwt/create', {
        fixture: 'errors/noActiveAccount',
        statusCode: 401,
      });

      cy.get(emailInput).type('example@gmail.com');
      getVInput(passwordInput).type('123password');

      cy.get("button[type='submit']").click();
    });

    it('should succeed and redirect to home page', () => {
      cy.intercept('POST', '/auth/jwt/create', {
        fixture: 'tokens',
        statusCode: 200,
      });

      cy.intercept('GET', '/auth/users/me', {
        fixture: 'user/me',
        statusCode: 200,
      });

      cy.intercept('GET', '/students/*', {
        fixture: 'student/isCaMember',
        statusCode: 200,
      });
      cy.intercept('GET', '/students/*', {
        fixture: 'student/isContributor',
        statusCode: 200,
      });

      cy.get(emailInput).type('example@gmail.com');
      getVInput(passwordInput).type('123password');

      cy.get("button[type='submit']").click();
    });
  });
});
