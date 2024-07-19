import React, { useState } from "react";
import "./MessageInput.css";

function MessageInput({ user, activeConversation, onSendMessage }) {
    const [message, setMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <form className="message-input" onSubmit={handleSendMessage}>
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default MessageInput;