describe('libraries', () => {
  beforeEach(() => {
    cy.visit('https://css-in-js-playground.com')
  });

  [
    'styled-components',
    'glamorous',
    'aphrodite',
    'radium',
    'emotion',
    'jss',
    'react-jss',
    'cxs'
  ]
    .forEach(library => {
      it(`displays ${library}`, () => {
        cy.get('select').select(library);

        cy.get('pre').should(pre => expect(pre).to.have.length(0));
      });
    });

});
