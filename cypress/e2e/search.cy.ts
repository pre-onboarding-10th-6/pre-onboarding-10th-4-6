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

  it('should load more results on scroll', () => {
    cy.visit('/')

    cy.get('[data-cy=search-input]').type('lorem')

    cy.get('[data-cy=dropdown-item]').should('have.length', 10)

    cy.get('[data-cy=search-dropdown]').scrollTo('bottom')

    cy.get('[data-cy=dropdown-item]').should('have.length.greaterThan', 9)
  })

  it('should add selected item to todo list', () => {
    cy.visit('/')

    cy.get('[data-cy=search-input]').type('lorem')

    cy.get('[data-cy=dropdown-item]').first().click()

    cy.get('[data-cy=todo-item]')
      .its('length')
      .then(length => {
        cy.log(`Todo list length after adding: ${length}`)

        cy.wrap(length).should('eq', length)
      })
  })
})
