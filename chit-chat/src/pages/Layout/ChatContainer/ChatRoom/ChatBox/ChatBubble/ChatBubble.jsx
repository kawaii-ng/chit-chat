import React, { useEffect } from 'react'
import './ChatBubble.scss'

function ChatBubble(props) {

    const sentTime = new Date(props.time.seconds * 1000);
    const currentTime = new Date().getTime() / 1000;
    
    const formatTime = (time) => {
        
        const ago = Math.abs(time.getTime() / 1000 - currentTime);
        
        if(ago>60*60*24){
            
            // a day ago
            return `${time.getHours() > 9? time.getHours():'0'+time.getHours()}:${time.getMinutes() > 9? time.getMinutes():'0'+time.getMinutes()}`
            
        }else if(ago>60*60){
            
            // a hour ago
            return `${Math.ceil(ago/60/60)} hours ago`
            
        }else if(ago>60){
            
            // a minutes ago
            return `${Math.ceil(ago/60)} minutes ago`
            
        }else{
            
            // a second ago
            return `${Math.ceil(ago)} second ago`
            
        }
        
    }
    
    const time = formatTime(sentTime);

    return (
        <div className="chatBubble" style={{flexDirection: props.isMe?"row-reverse":"row"}}>
            <div className="chatBubble__avatar">
                <img src={`https://avatars.dicebear.com/api/initials/${props.sender.substring(0, 2)}.svg`} alt="" />
            </div>
            <div className="chatBubble__bubble" style={{background: props.isMe? "#1bb798":"white", color: props.isMe? "white":"black"}}>
                <div className="chatBubble__name">{props.sender}</div>
                <div className="chatBubble__message">
                    {props.msg}
                    <div className="chatBubble__time">{time}</div>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble
