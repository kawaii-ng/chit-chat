import React from 'react'
import './ChatContainer.scss'

import Sidebar from './Sidebar/Sidebar'
import ChatRoom from './ChatRoom/ChatRoom'

function ChatContainer() {
    return (
        <div className="chatContainer">
            <Sidebar />
            <ChatRoom />
        </div>
    )
}

export default ChatContainer
