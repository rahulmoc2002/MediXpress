import React from 'react';
import { mount } from 'cypress-react-unit-test';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  beforeAll(()=>{
    
  })
  it('displays correct initial location', () => {
    // mount(
    //   <MemoryRouter>
    //     <Header />
    //   </MemoryRouter>
    // );
    // cy.contains('.address span', 'Fetching location...').should('exist');
  });

  it('displays correct navigation links', () => {
    // mount(
    //   <MemoryRouter>
    //     <Header />
    //   </MemoryRouter>
    // );
    // cy.contains('button', 'Home').should('exist');
    // cy.contains('button', 'About Us').should('exist');
    // cy.contains('button', 'Contact Us').should('exist');
    // cy.contains('a', 'Login/Sign Up').should('exist');
  });

  it('logs out when logout button is clicked', () => {
    mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    cy.contains('a', 'Login/Sign Up').click();
    cy.contains('button', 'Logout').click();
    cy.contains('a', 'Login/Sign Up').should('exist');
  });

  
});
