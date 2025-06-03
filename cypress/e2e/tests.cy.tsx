describe('Авторизация и профиль', () => {
  it('Переход в профиль после входа', () => {

    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'user@example.com',
          name: 'User'
        }
      }
    }).as('getUser');

    cy.loginByApi();

    cy.visit('/');
    cy.contains('Личный кабинет').click();

    cy.wait('@getUser');

    cy.contains('User').click();
    cy.url().should('include', '/profile');
    cy.get('form', { timeout: 10000 }).should('exist');
    cy.get('input[name="name"]').should('have.value', 'User');
  });
});

describe('Функциональность конструктора бургеров', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('userData');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.setCookie('accessToken', 'mockToken');
    cy.window().then(win => {
      win.localStorage.setItem('refreshToken', 'mockToken');
    });

    cy.visit('/');
    cy.contains('Соберите бургер', { timeout: 10000 }).should('exist');
  });

  it('Нет булки при старте', () => {
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });

  it('Добавление булки в конструктор', () => {
    cy.contains('Флюоресцентная булка R2-D3').next().click();

    cy.contains('Флюоресцентная булка R2-D3', { timeout: 10000 }).should(
      'exist'
    );
  });

  it('Добавление начинки в конструктор', () => {
    cy.contains('Начинки').scrollIntoView().click({ force: true });

    cy.contains('Биокотлета из марсианской Магнолии').next().click();

    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('Добавление ингредиентов в заказ и очистка конструктора', () => {

    cy.intercept('POST', 'api/orders', {
      fixture: 'makeOrder.json',
      statusCode: 200
    }).as('newOrder');

    cy.contains('Флюоресцентная булка R2-D3').next().click();

    cy.contains('Начинки').scrollIntoView();
    cy.contains('Биокотлета из марсианской Магнолии').next().click();

    cy.contains('Оформить заказ').should('not.be.disabled').click();

    cy.wait('@newOrder', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.contains('идентификатор заказа').should('be.visible');
    cy.get('body').type('{esc}');

    cy.contains('Выберите булки').should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.contains('Краторная булка').click();

    cy.url().should('include', '/ingredients/');

    cy.get('body').type('{esc}');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('Закрытие модального окна через клик на оверлей', () => {
    cy.contains('Краторная булка').click();

    cy.get('body').click(10, 10);

    cy.url().should('eq', 'http://localhost:4000/');
  });
});
