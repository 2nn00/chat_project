import React from 'react';

function InputField({ onSendMessage, message, setMessage }) {
    const handleSendMessage = (event) => {
        event.preventDefault();
        if (message.trim()) {
            onSendMessage(event);
        }
    };

    return (
        <form className="message-input" onSubmit={handleSendMessage}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
            />
            <button type="submit">전송</button>
        </form>
    );
}

export default InputField;