import React from 'react';
import './Message.css';

const Message = ({ message, user }) => {
    const isSentByCurrentUser = message.user === user.name;

    return (
        <div className={`chat-message ${isSentByCurrentUser ? 'sent' : 'received'}`}>
            <p>{message.text}</p>
            <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
    );
};

export default Message;