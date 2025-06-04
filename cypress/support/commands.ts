import { BASE_URL } from '../support/constants';

Cypress.Commands.add('loginByApi', () => {
  cy.request('POST', `${BASE_URL}/auth/login`, {
    email: 'test_user@example.com',
    password: '12345678',
  }).then((res) => {
    const accessToken = res.body.accessToken.split('Bearer ')[1];
    const refreshToken = res.body.refreshToken;

    cy.setCookie('accessToken', accessToken);
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', refreshToken);
    });

    cy.intercept('GET', 'api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'test_user@example.com',
          name: 'User',
        },
      },
    }).as('getUser');
  });
});

Cypress.Commands.add('addBun', (bunName) => {
  cy.contains(bunName).next().click();
});

Cypress.Commands.add('addFilling', (fillingName) => {
  cy.contains(fillingName).next().click();
});

Cypress.on('window:before:load', (win) => {
  cy.spy(win, 'fetch').as('fetchSpy');
});