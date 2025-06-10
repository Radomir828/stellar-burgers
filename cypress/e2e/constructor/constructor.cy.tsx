describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'test@example.com', name: 'Test User' }
      }
    }).as('getUser');

    cy.setCookie('accessToken', 'fake-access-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.visit('/');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('добавляет булку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=burger-constructor]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('добавляет начинку в конструктор', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=burger-constructor]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();

    cy.get('[data-cy=modal]').should('exist');

    cy.get('[data-cy=modal] button').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('создает заказ и очищает конструктор', () => {
    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Флюоресцентный бургер',
        order: {
          number: 80635
        }
      }
    }).as('createOrder');

    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get('[data-cy=modal]')
      .should('exist')
      .and('contain', 'Ваш заказ')
      .and('contain', '80635');

    cy.get('[data-cy=modal] button').click();

    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=burger-constructor]').should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy=burger-constructor]').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
});
