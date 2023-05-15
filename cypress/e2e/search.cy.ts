describe('Search', () => {
  before(() => {
    cy.visit('/')
  })

  it('should display dropdown items length', () => {
    cy.intercept('GET', '**/search**', { fixture: 'searchResult.json' }).as(
      'searchRequest'
    )

    cy.get('[data-cy="search-input"]').type('lorem')

    cy.wait('@searchRequest')

    cy.get('[data-cy="dropdown-item"]').should('have.length', 10)
  })
})
