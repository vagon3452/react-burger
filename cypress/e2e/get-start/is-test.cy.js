

  describe('Login', () => {
    before(function() {
      cy.visit('http://localhost:3000');
    });
    it('should be able to login', () => {
      cy.visit('/login') // открываем�ицраницу авторизации
      cy.visit('/') // открываем�ицраницу авторизации
    })
    it('should open cart page by default', function() {
      cy.contains('Личный кабинет');
    });
    it('should open cart page by default', function() {
      cy.contains('Конструктор');
    });
  
  })

