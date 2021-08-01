import React from 'react'
import './ChatBubble.scss'

function ChatBubble() {
    return (
        <div className="chatBubble">
            <div className="chatBubble__avatar">
                <img src="https://avatars.dicebear.com/api/initials/Kw.svg" alt="" />
            </div>
            <div className="chatBubble__bubble">
                <div className="chatBubble__name">KWai</div>
                <div className="chatBubble__message">
                    Hi guys
                    <div className="chatBubble__time">21:30</div>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble
