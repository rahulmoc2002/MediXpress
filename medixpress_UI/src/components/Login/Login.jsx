


import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { fetchAllAccounts, loginUser } from '../../services/user.service';
import LoadingModal from '../loading-modal';
import './Login.css';

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await loginUser(user.email, user.password);
            console.log(response);
            if (response && response.Token) {
                localStorage.setItem("token", response.Token);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userId", response.CurrentUser.UserId);

                // Check user role to navigate accordingly
                if (response.CurrentUser.Roles === 'Seller') {
                    navigate("/seller-dashboard");
                } else {
                    navigate("/buyer-dashboard");
                }
                setLoading(false); // Set loading to false after successful login
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            console.error('Error during login process:', error);
            setErrorMessage("An error occurred while trying to log in. Please try again later.");
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            await signInWithPopup(auth, provider);
            const data = await fetchAllAccounts();
            const { users, sellers } = data;
            const googleUserEmail = auth.currentUser.email;
            const foundSeller = sellers.find(s => s.email === googleUserEmail);
            const foundUser = users.find(u => u.email === googleUserEmail);
            console.log('Google User Email:', googleUserEmail);
            console.log('Found Seller:', foundSeller);
            console.log('Found User:', foundUser);
            localStorage.setItem("isLoggedIn", "true");
            if (foundSeller) {
                navigate("/seller-dashboard");
            } else if (foundUser) {
                navigate("/buyer-dashboard");
            } else {
                navigate("/buyer-dashboard");
            }
            setLoading(false); // Set loading to false after successful login
        } catch (error) {
            console.error("Error during Google Sign-In: ", error);
            setErrorMessage("An error occurred during Google Sign-In. Please try again later.");
        }
    };

    const handleCloseModal = () => {
        setLoading(false);
        setErrorMessage("");
    };

    return (
        <Container className="login-container">
            <LoadingModal show={loading} error={errorMessage} onClose={handleCloseModal} />
            <div className="login-box">
                <h1 className="logo-text">
                    <span style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#613385'
                    }}>
                        MediXpress Login
                    </span>
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Control name='email' type='email' placeholder='Enter your email' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Control name='password' type="password" placeholder="Enter your password" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                    <h6>or</h6>
                    <Button variant="danger" type="button" className="google-login-button" onClick={handleGoogleSignIn}>
                        Sign in with Google
                    </Button>
                    <div className="register-link">
                        <p>Not having an account? <Link to="/register">Register</Link></p>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
