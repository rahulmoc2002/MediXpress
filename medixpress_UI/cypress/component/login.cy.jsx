import Login from '../../src/components/Login/Login'

describe('Login Component', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });

    it('should display login form', () => {
        cy.get('.login-box').should('exist');
        cy.get('form').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('.login-button').should('exist');
        
        cy.get('.register-link').should('exist');
    });

    it('should display error message on invalid login', () => {
        
        cy.get('input[name="email"]').type('invalid@example.com');
        cy.get('input[name="password"]').type('invalidpassword');
        cy.get('.login-button').click();

        cy.get('.loading-modal').should('exist'); 
        cy.contains('Invalid email or password.').should('exist');
    });

    it('should login successfully with valid credentials', () => {
        
        const email = 'valid@example.com';
        const password = 'validpassword';

        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.get('.login-button').click();

        
        cy.url().should('include', '/buyer-dashboard');
        
    });

    
});
