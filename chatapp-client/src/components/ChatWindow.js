import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ user, messages, activeConversation, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h2>{activeConversation.name}</h2>
                <div>
                    <button>멤버추가</button>
                    <button>나가기</button>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.user.name === user.name ? 'sent' : 'received'}`}
                    >
                        <div>{msg.chat}</div>
                    </div>
                ))}
            </div>
            <form className="chat-input" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatWindow;