import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i> Facebook</a></li>
                            <li className="list-inline-item"><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i> Instagram</a></li>
                            <li className="list-inline-item"><a href="https://twitter.com/"><i className="fab fa-twitter"></i> Twitter</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Company</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about" className="footer-link">About Company</a></li>
                            <li><a href="/careers" className="footer-link">Return Policy</a></li>
                            <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
                            <li><a href="/privacy-policy" className="footer-link">Terms and Conditions</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <address>
                            Bellandur <br />
                            Bengaluru,Karnataka<br />
                            <a href="mailto:info@example.com" className="footer-link">info@medixpress.com</a>
                        </address>
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <p>&copy; Medixpress 2024. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
