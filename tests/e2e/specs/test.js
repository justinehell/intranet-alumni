// https://docs.cypress.io/api/introduction/api.html

describe('Login page', () => {
  it('contains "Se connecter"', () => {
    cy.visit('/');
    cy.contains('Se connecter');
  });
});
