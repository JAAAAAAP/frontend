import React from 'react'

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Go Back to Home
            </a>
        </div>
    )
}
