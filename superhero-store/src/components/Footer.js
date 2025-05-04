import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#2C3E50', color: 'white', textAlign: 'center', padding: '1rem' }}>
            <div>
                <p>© {new Date().getFullYear()} Starry Night Store - Powered by Superheroes</p>
                <p>Follow us on:
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> |
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a> |
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer; 