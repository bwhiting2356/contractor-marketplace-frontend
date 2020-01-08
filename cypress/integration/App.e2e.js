describe('App E2E', () => {
    it('should assert that true is equal to true', () => {
        // Log in as Client
        cy.visit('http://localhost:3000');
        cy.get('#login').click();
        cy.get('input[name="id"]').type('Josie');
        cy.get('.ui.selection.dropdown').click();
        cy.get('[role="option"]:first-child').click();
        cy.get('button[type="submit"]').click();

        // Create a new project

        cy.get('#new-project').click();
        cy.get('input[name="description"]').type('Mow the lawn.');
        cy.get('input[name="maximumBudget"]').type('20');
        cy.get('button[type="submit"]').click();
        cy.get('.modal button').click();

         // Log out. "New Project" button should no longer be visible
         cy.get('#logout').click();
         cy.get('#new-project').should('not.exist');
    });
});