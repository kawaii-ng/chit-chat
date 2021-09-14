import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import './ChatRoom.scss'

import ChatBox from './ChatBox/ChatBox'

import Firebase from '../../../../Config/firebase'

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function ChatRoom() {

    const params = useParams()
    const history = useHistory()

    const [chatRoom, setChatRoom] = useState()
    const [user, setUser] = useState()

    const db = Firebase.firestore()
    const currentUser = Firebase.auth().currentUser

    const getChatroom = () => {

        db
        .collection('ChatRoom')
        .doc(params.id)
        .get()
        .then(doc => {

            if(!doc.emtpy){

                setChatRoom({id: doc.id, ...doc.data()})

            }            

        })

    }

    const getUser = () => {

        if(currentUser){

            db
            .collection('User')
            .doc(currentUser.uid)
            .get()
            .then(doc => {
    
                if(!doc.emtpy){
    
                    setUser({id: doc.id, ...doc.data()})

                }
    
            })

        }

    }

    const handle_liked = () => {

        if(typeof user !== 'undefined' && typeof chatRoom !== 'undefined'){

            if(user.favouriteChat.includes(chatRoom.id)){

                

            }

        }

    }

    useEffect(()=>{

        if(typeof chatRoom === 'undefined' && params.id){

            getChatroom();
            
        }
        
        if(typeof user === 'undefined'){

            getUser();

        }


    }, [chatRoom, user, params.id])


    if(!currentUser){
          
        history.push('/')

    }else{
        return (
            <div className="chatRoom">
                <div className="chatRoom__titleBar">
                    {

                        typeof chatRoom !== 'undefined' && params.id &&
                        <>
                        <div className="chatRoom__avatar">
                            <img src={chatRoom.chatIcon} />
                        </div>
                        <div className="chatRoom__detail">
                            <div>
                                <div className="chatRoom__title">
                                    {chatRoom.chatroomTitle}
                                </div>
                                <div className="chatRoom__lastSeem">
                                    Last seem at 21 Jul 2021 14:30
                                </div>
                            </div>
                        </div>
                        <div className="chatRoom__buttons">
                            <Button className="chatRoom__button">
                                <FontAwesomeIcon icon={faHeart} />
                            </Button>
                            <Button className="chatRoom__button">
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </Button>
                        </div>
                        </>
                    }
                </div>
                <div className="chatRoom__chatContainer">
                    <ChatBox user={user}/>
                </div>
            </div>
        )
    }
}

export default ChatRoom
