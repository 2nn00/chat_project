import React from 'react';
import './RoomHeader.css';

function RoomHeader({ user }) {
    return (
        <div className="room-header">
            <h2>{user?.name}</h2>
            <div className="room-actions">
                <button>멤버추가</button>
                <button>나가기</button>
            </div>
        </div>
    );
}

export default RoomHeader;