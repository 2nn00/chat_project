import React, { useEffect, useState } from "react";
import socket from "./socket";
import ConversationList from "./components/ConversationList";
import ChatWindow from "./components/ChatWindow";
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userName = prompt("Enter your name:");
    if (userName.trim()) {
      socket.emit('login', userName, (response) => {
        if (response?.ok) {
          setUser(response.user);
        } else {
          console.error('Login failed:', response?.message);
        }
      });
    }

    socket.on("message", (message) => {
      setMessageList(prevState => [...prevState, message]);
    });

    socket.on("updateUserList", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    return () => {
      socket.off("message");
      socket.off("updateUserList");
    };
  }, []);

  const handleSendMessage = (message) => {
    if (user && activeConversation) {
      const newMessage = {
        chat: message,
        user: {
          id: user.id,
          name: user.name,
        },
        to: activeConversation.name,
        room: `${[user.name, activeConversation.name].sort().join('-')}`
      };
      socket.emit("sendMessage", newMessage, (response) => {
        if (response?.ok) {
          setMessageList(prevState => [...prevState, newMessage]);
        } else {
          console.error('Message send failed:', response?.message);
        }
      });
    }
  };

  const getMessagesForActiveConversation = () => {
    const room = `${[user.name, activeConversation.name].sort().join('-')}`;
    return messageList.filter(msg => msg.room === room);
  };

  return (
    <div className="app">
      {user ? (
        <div className="main-container">
          <ConversationList users={users} setActiveConversation={setActiveConversation} currentUser={user} />
          {activeConversation && (
            <ChatWindow
              user={user}
              messages={getMessagesForActiveConversation()}
              activeConversation={activeConversation}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;