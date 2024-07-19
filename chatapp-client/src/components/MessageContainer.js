import React from 'react';
import Message from './Message';
import './MessageContainer.css';

const MessageContainer = ({ messages, user }) => {
    return (
        <div className="chat-messages">
            {messages.map((message, index) => (
                <Message key={index} message={message} user={user} />
            ))}
        </div>
    );
};

export default MessageContainer;