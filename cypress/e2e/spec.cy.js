describe('url shortener', () => {

  beforeEach(() => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/urls', {
      statusCode:201,
      fixture:"urls.json"
      }
    )
    cy.intercept("POST", 'http://localhost:3001/api/v1/urls', {
      statusCode:201,
      fixture:"newUrl.json"
      }
    )
    cy.visit('http://localhost:3000/')
  })

  it('visits landing page with correct urls already loaded', () => {
    cy.contains("URL Shortener")
    cy.get(".url").first()
    cy.contains("Awesome photo")
    cy.contains("http://localhost:3001/useshorturl/1")
    cy.contains("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    cy.get(".url").last()
    cy.contains("link")
    cy.contains("http://localhost:3001/useshorturl/2")
    cy.contains("https://github.com/masaki-kleinkopf/url-shortener-ui")
  })

  it('should show a form with correct inputs on landing page', () => {
    cy.get("input").first().should("have.attr","name","title")
    cy.get("input").first().should("have.attr","placeholder","Title...")
    cy.get("input").last().should("have.attr","name","urlToShorten")
    cy.get("input").last().should("have.attr","placeholder","URL to Shorten...")
  })

  it('should show be able to fill the form', () => {
    cy.get("input").first().type("new added backend repo")
    cy.get("input").last().type("https://github.com/turingschool-examples/url-shortener-api")
    cy.get("input").first().should("have.value","new added backend repo")
    cy.get("input").last().should("have.value","https://github.com/turingschool-examples/url-shortener-api")
  })

  it("should shorten url and show on DOM when submitted", () => {
    cy.get("input").first().type("new added backend repo")
    cy.get("input").last().type("https://github.com/turingschool-examples/url-shortener-api")
    cy.get("button").click()
    cy.get(".url").last().contains("new added backend repo")
    cy.get(".url").last().contains("https://github.com/turingschool-examples/url-shortener-api")
    cy.get(".url").last().contains("http://localhost:3001/useshorturl/3")
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

it("should show error message if network request fails on post", () => {
  cy.intercept("POST", 'http://localhost:3001/api/v1/urls', {
  statusCode:404,
  body:"cypress force error"
  })
  cy.visit('http://localhost:3000/')
  cy.get("input").first().type("new added backend repo")
  cy.get("input").last().type("https://github.com/turingschool-examples/url-shortener-api")
  cy.get("button").click()
  cy.contains("something went wrong!")
})

})