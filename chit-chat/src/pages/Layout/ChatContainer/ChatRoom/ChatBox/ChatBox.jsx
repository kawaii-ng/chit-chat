import React from 'react'
import './ChatBox.scss'

import ChatBubble from './ChatBubble/ChatBubble'

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function ChatBox() {
    return (
        <div className="chatBox">
            <ChatBubble />
            <div className="chatBox__inputContainer">
                <input type="text" className="chatBox__input" placeholder="Type in your message here"/>
                <Button className="chatBox__button">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </div>
        </div>
    )
}

export default ChatBox
