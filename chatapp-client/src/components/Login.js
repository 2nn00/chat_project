import React, { useState } from 'react';
import socket from '../socket';
import './Login.css';

function Login({ onLogin }) {
    const [userName, setUserName] = useState('');

    const handleLogin = () => {
        if (userName.trim()) {
            socket.emit('login', userName, (response) => {
                if (response.ok) {
                    onLogin(response.user);
                }
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Enter your name</h2>
            <div className="login-input">
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your name"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;