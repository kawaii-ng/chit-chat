import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ChatItem.scss'
import { useHistory } from 'react-router'
import Firebase from '../../../../../Config/firebase'

function ChatItem(props) {

    const [lastMsg, setLastMsg] = useState()

    const db = Firebase.firestore()
    const history = useHistory();

    const getLastMsg = () => {

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

    const goto_chat = () => {

        history.push(`/dashboard/chat/${props.data.id}`)
        
    }

    useEffect(()=>{

        if(typeof lastMsg === "undefined"){

            getLastMsg()

        }else {

            db
            .collection("ChatRoom")
            .doc(props.data.id)
            .collection("Message")
            .orderBy('time', 'desc')
            .limit(1)
            .onSnapshot(snapshot=>{

                const changes = snapshot.docChanges();
                changes.forEach(change => {

                    if(change.type === 'added'){

                        setLastMsg(change.doc.data().msg)

                    }

                })

            })

        }

    }, [lastMsg])

    return (
        <div className="chatItem" onClick={goto_chat}>
            <div className="chatItem__avatar" >
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
        </div>
    )
}

export default ChatItem
