import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from '../../src/components/aboutus/aboutus.jsx';

describe('AboutUs Component', () => {
  it('renders the AboutUs component correctly', () => {
    const { getByText, getAllByText } = render(<AboutUs />);
    
    // Test for the title
    const title = getByText('About MediXpress');
    expect(title).toBeInTheDocument();

    // Test for the description
    const description = getByText('MediXpress is a cutting-edge medical app dedicated to providing quick and reliable access to pharmaceutical services at your doorstep. Our mission is to simplify the way you manage your health by offering a seamless experience for ordering medicines and accessing health information.');
    expect(description).toBeInTheDocument();

    // Test for mission card
    const missionTitle = getByText('Our Mission');
    const missionText = getByText('To ensure everyone has access to the medicines they need, with a focus on convenience, affordability, and reliability.');
    expect(missionTitle).toBeInTheDocument();
    expect(missionText).toBeInTheDocument();

    // Test for innovative technology card
    const techTitle = getByText('Innovative Technology');
    const techText = getByText('Leveraging the latest in website technology to bring you a user-friendly platform for all your medical needs.');
    expect(techTitle).toBeInTheDocument();
    expect(techText).toBeInTheDocument();

    // Test for community focused card
    const communityTitle = getByText('Community Focused');
    const communityText = getByText('Building a community of health-conscious individuals and providing resources to help you live a healthier life.');
    expect(communityTitle).toBeInTheDocument();
    expect(communityText).toBeInTheDocument();

    // Test for customer satisfaction card
    const satisfactionTitle = getByText('Customer Satisfaction');
    const satisfactionText = getByText('Our top priority is your satisfaction. We strive to deliver exceptional service and support.');
    expect(satisfactionTitle).toBeInTheDocument();
    expect(satisfactionText).toBeInTheDocument();

    // Test for all icons
    const icons = getAllByText(/Fa[A-Z][a-z]+/); 
    expect(icons.length).toBe(4);
  });
});
