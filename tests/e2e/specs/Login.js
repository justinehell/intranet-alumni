// https://docs.cypress.io/api/introduction/api.html
import Form from '../pageObject/form';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Se connecter');
  });

  describe('email field', () => {
    it('should have a correct email input', () => {
      cy.get(Form.field.emailInput)
        .type('example@gmail.com')
        .should('have.value', 'example@gmail.com')
        .clear();
    });

    it('should show a message with invalid email input', () => {
      Form.getVInput(Form.field.emailInput).type('exampleagmail.com');

      Form.getVInputMessage(Form.field.emailInput).contains(
        'Veuillez renseigner une adresse e-mail valide'
      );
    });

    it('should show a required message with empty email input', () => {
      Form.getVInput(Form.field.emailInput)
        .type(' ')
        .clear();

      Form.getVInputMessage(Form.field.emailInput).contains(
        "L'adresse e-mail est requise."
      );
    });
  });

  describe('password field', () => {
    it('should show a message with invalid password input', () => {
      Form.getVInput(Form.field.passwordInput).type('123password');

      Form.getVInputMessage(Form.field.passwordInput).contains(
        'Le mot de passe doit posséder au moins 8 caractères.'
      );
    });

    it('should show a required message with empty email input', () => {
      Form.getVInput(Form.field.passwordInput)
        .type(' ')
        .clear();

      Form.getVInputMessage(Form.field.passwordInput).contains(
        'Le mot de passe est requis.'
      );
    });

    it('should toggle password', () => {
      Form.getVInputButton(Form.field.passwordInput).should(
        'have.class',
        'mdi-eye-off'
      );
      cy.get(Form.field.passwordInput).should('have.attr', 'type', 'password');

      Form.getVInputButton(Form.field.passwordInput).click();

      Form.getVInputButton(Form.field.passwordInput).should(
        'have.class',
        'mdi-eye'
      );
      cy.get(Form.field.passwordInput).should('have.attr', 'type', 'text');

      Form.getVInputButton(Form.field.passwordInput).click();

      Form.getVInputButton(Form.field.passwordInput).should(
        'have.class',
        'mdi-eye-off'
      );
      cy.get(Form.field.passwordInput).should('have.attr', 'type', 'password');
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

      cy.get(Form.field.emailInput).type('example@gmail.com');
      Form.getVInput(Form.field.passwordInput).type('123password');

      cy.get(Form.action.submitButton).click();
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

      cy.get(Form.field.emailInput).type('example@gmail.com');
      Form.getVInput(Form.field.passwordInput).type('123password');

      cy.get(Form.action.submitButton).click();
    });
  });
});
