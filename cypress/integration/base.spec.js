describe('CSS in JS Playground', () => {
  it('should have a title', () => {
    cy.visit('https://css-in-js-playground.com')

    cy.title().should('include', 'CSS in JS Playground')
  });

  describe('basic functionality', () => {
    beforeEach(() => {
      cy.visit('https://css-in-js-playground.com')
    });

    it('should have a select box', () => {
      cy.get('select option').should('have.length', 8);
    });
  });
});
