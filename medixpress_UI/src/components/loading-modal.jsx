import React from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';

const LoadingModal = ({ show, error, onClose }) => (
    <Modal show={show} centered>
        <Modal.Body className="text-center">
            {error ? (
                <>
                    <p>{error}</p>
                    <Button variant="primary" onClick={onClose}>Close</Button>
                </>
            ) : (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </Modal.Body>
    </Modal>
);

export default LoadingModal;
