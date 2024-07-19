import React from 'react';
import './ConversationList.css';

const ConversationList = ({ users, setActiveConversation, currentUser }) => {
    return (
        <div className="conversation-list">
            {users
                .filter(user => user.name !== currentUser.name)
                .map(user => (
                    <div
                        key={user.id}
                        className="conversation"
                        onClick={() => setActiveConversation(user)}
                    >
                        <div className="conversation-name">{user.name}</div>
                        <div className="conversation-last-message">
                            {user.lastMessages && user.lastMessages[`${[user.name, currentUser.name].sort().join('-')}`] ?
                                user.lastMessages[`${[user.name, currentUser.name].sort().join('-')}`].length > 17 ?
                                    user.lastMessages[`${[user.name, currentUser.name].sort().join('-')}`].substring(0, 17) + '...' :
                                    user.lastMessages[`${[user.name, currentUser.name].sort().join('-')}`] :
                                ''}
                        </div>
                        <div className="conversation-last-time">10 min</div>
                    </div>
                ))}
        </div>
    );
}


export default ConversationList;