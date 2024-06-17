import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect } from 'chai';
import ContactUs from '../../src/components/contactus/contactus';

describe('ContactUs Component', () => {
  it('submits the form with a valid email', () => {
    const { getByPlaceholderText, getByText } = render(<ContactUs />);
    
    // Find the input field for email
    const emailInput = getByPlaceholderText('Enter your email');
    expect(emailInput).to.exist;
    
    // Type a valid email address
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Find the submit button and click it
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    
    // Assert that the alert is displayed with the correct message
    const alertMessage = getByText('Thank you! We will contact you at test@example.com');
    expect(alertMessage).to.exist;
    
    // Assert that the email input field is cleared after submission
    expect(emailInput.value).to.equal('');
  });

  it('displays an error message for an invalid email', () => {
    const { getByPlaceholderText, getByText } = render(<ContactUs />);
    
    // Find the input field for email
    const emailInput = getByPlaceholderText('Enter your email');
    expect(emailInput).to.exist;
    
    // Type an invalid email address
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    
    // Find the submit button and click it
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    
    // Assert that the error message is displayed
    const errorMessage = getByText('Please provide a valid email.', { exact: false });
    expect(errorMessage).to.exist;
  });
});
