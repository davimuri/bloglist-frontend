describe('BlogList ', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000/login')
  })

  it('login form is displayed', function() {
    cy.contains('username')
  })

  it('wrong user can\'t login', function() {
    cy.get('[data-test-id=username]')
      .type('wronguser')
    cy.get('[data-test-id=password]')
      .type('wrongpass')
    cy.get('[data-test-id=login]')
      .click()
    cy.get('.error').should('be.visible')
  })

})