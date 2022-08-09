describe('url shortener', () => {

    beforeEach(() => {
      cy.intercept("GET", 'http://localhost:3001/api/v1/urls', {
        statusCode:404,
        body:"cypress force error"
        })
        cy.visit('http://localhost:3000/')
    })
  
  
    it("should show error message if network request fails", () => {
        cy.intercept("GET", 'http://localhost:3001/api/v1/urls', {
        statusCode:404,
        body:"cypress force error"
        })
        cy.visit('http://localhost:3000/')
        cy.contains("No urls yet! Find some to shorten!")
        cy.contains("something went wrong!")
    })
  
  
  })