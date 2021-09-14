import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ChatItem.scss'

import Firebase from '../../../../../Config/firebase'

function ChatItem(props) {

    const [lastMsg, setLastMsg] = useState()

    const db = Firebase.firestore()

    const getLastMsg = () => {

        let newMsg = ''

        db
        .collection('ChatRoom')
        .doc(props.data.id)
        .collection('Message')
        .orderBy('time', 'desc')
        .limit(1)
        .get()
        .then(docs => {

            if(!docs.empty){

               docs.forEach(doc => {

                setLastMsg(doc.data().msg)

               })

            }

        })


    }

    useEffect(()=>{

        if(typeof lastMsg === "undefined"){

            getLastMsg()

        }

    }, [lastMsg])

    return (
        <Link to={`/dashboard/chat/${props.data.id}`} className="chatItem">
            <div className="chatItem__avatar">
                <img src={props.data.chatIcon} />
            </div>
            <div className="chatItem__detail">
                <div className="chatItem__title">
                    {props.data.chatroomTitle}
                </div>
                <div className="chatItem__message">
                    {lastMsg}
                </div>
            </div>
        </Link>
    )
}

export default ChatItem
