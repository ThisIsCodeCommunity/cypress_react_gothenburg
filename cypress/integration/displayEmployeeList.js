describe('Displays list of employees', () => {
  beforeEach(() => {
    cy.request("https://reqres.in/api/users?per_page=5").then(
      response => {
        cy.writeFile("cypress/fixtures/myRecordedResp.json", response.body);
      }
    );
    cy.server()
    cy.route({
      url: 'https://reqres.in/api/users',
      method: 'GET',
      response: 'fixture:myRecordedResp.json'
    })
    cy.visit('http://localhost:3000')
  })

  it('has a header', () => {
    cy.get('h1').should('contain', 'Employee list')
  });

  it('displays a <ul>', () => {
    cy.get('section[id="main"]').within(() => {
      cy.get('div[role="list"]').should('have.length', 1)
      cy.get('div[role="listitem"]').should('have.length', 5)
    })
  });
});