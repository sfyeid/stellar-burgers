import { SELECTORS } from '../support/constants';

describe('Авторизация и профиль', () => {
  it('Переход в профиль после входа', () => {
    cy.intercept('GET', 'api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'test_user@example.com',
          name: SELECTORS.userName,
        },
      },
    }).as('getUser');

    cy.loginByApi();

    cy.visit('/');
    cy.contains(SELECTORS.userName).as('profileButton').click();

    cy.wait('@getUser');

    cy.get('@profileButton').click();
    cy.url().should('include', '/profile');
    cy.get('form', { timeout: 10000 }).should('exist');
    cy.get('input[name="name"]').should('have.value', SELECTORS.userName);
  });
});

describe('Функциональность конструктора бургеров', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('userData');

    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json',
    }).as('getUser');

    cy.setCookie('accessToken', 'mockToken');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockToken');
    });

    cy.visit('/');
    cy.contains('Соберите бургер', { timeout: 10000 }).should('exist');
  });

  it('Нет булки при старте', () => {
    cy.contains(SELECTORS.burgerConstructor.bunPrompt).should('exist');
    cy.contains(SELECTORS.burgerConstructor.fillingPrompt).should('exist');
  });

  it('Добавление булки в конструктор', () => {
    cy.contains(SELECTORS.burgerConstructor.bun).as('bun').next().click();

    cy.get('@bun', { timeout: 10000 }).should('exist');
  });

  it('Добавление начинки в конструктор', () => {
    cy.contains('Начинки').scrollIntoView().click({ force: true });

    cy.contains(SELECTORS.burgerConstructor.filling).as('filling').next().click();

    cy.get('@filling').should('exist');
  });

  it('Добавление ингредиентов в заказ и очистка конструктора', () => {
    cy.intercept('POST', 'api/orders', {
      fixture: 'makeOrder.json',
      statusCode: 200,
    }).as('newOrder');

    cy.contains(SELECTORS.burgerConstructor.bun).next().click();

    cy.contains('Начинки').scrollIntoView();
    cy.contains(SELECTORS.burgerConstructor.filling).next().click();

    cy.contains(SELECTORS.burgerConstructor.orderButton).should('not.be.disabled').click();

    cy.wait('@newOrder', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.contains(SELECTORS.burgerConstructor.orderId).should('be.visible');
    cy.get('body').type('{esc}');

    cy.contains(SELECTORS.burgerConstructor.bunPrompt).should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.contains(SELECTORS.modal.ingredient).as('ingredient').click();

    cy.url().should('include', '/ingredients/');

    cy.get('body').type('{esc}');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('Закрытие модального окна через клик на оверлей', () => {
    cy.contains(SELECTORS.modal.ingredient).as('ingredient').click();

    cy.get('body').click(10, 10);

    cy.url().should('eq', 'http://localhost:4000/');
  });
});