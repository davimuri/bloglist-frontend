describe('BlogList ', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.get('[data-test-id=goToLogin]')
      .click()
  })

})