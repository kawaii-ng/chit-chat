import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router'
import './ChatRoom.scss'

import ChatBox from './ChatBox/ChatBox'
import InfoBox from './InfoBox/InfoBox'

import Firebase from '../../../../Config/firebase'

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function ChatRoom() {

    const params = useParams()
    const history = useHistory()
    const location = useLocation()

    const [chatRoom, setChatRoom] = useState()
    const [user, setUser] = useState()
    const [liked, setLiked] = useState()
    const [isChange, setIsChange] = useState(false)
    const [likeList, setLikeList] = useState()

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

    const goto_info = () => {

        history.push(`/dashboard/info/${params.id}`)

    }

    useEffect(()=>{

        if(typeof user !== 'undefined' && typeof chatRoom !== 'undefined'){

            
            if(typeof likeList === 'undefined'){

                setLikeList(user.favouriteChat)

            }

            if(typeof likeList !== 'undefined' && typeof liked === 'undefined'){

                if(likeList.includes(chatRoom.id)){

                    setLiked(true)
        
                }else if(!likeList.includes(chatRoom.id)){
        
                    setLiked(false)
        
                }

            }
        
        }

    }, [chatRoom, liked, likeList])

    useEffect(() => {
        
        if(isChange){

            db
            .collection("User")
            .doc(user.id)
            .update({
    
                favouriteChat: likeList
    
            })
            .then(()=>console.log("updated like status"))
            .catch(err=>console.log(err))

            setIsChange(false)

        }

    }, [liked, likeList, isChange])

    const handle_liked = () => {

        if(liked){

            let newList = likeList
            newList = newList.filter(id => id !== chatRoom.id)
            setLikeList(newList)
            setLiked(false)

        }else{

            let newList = likeList
            newList.push(chatRoom.id)
            setLikeList(newList)            

            setLiked(true)

        }

        setIsChange(true)


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
                {

                    params.type === "chat" ?
                    <>
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
                                        {/* <div className="chatRoom__lastSeem">
                                            Last seem at 21 Jul 2021 14:30
                                        </div> */}
                                    </div>
                                </div>
                                <div className="chatRoom__buttons">
                                    <Button className="chatRoom__button" style={{background: liked? "orange":"transparent"}} onClick={handle_liked}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </Button>
                                    <Button className="chatRoom__button" onClick={()=>{goto_info()}}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </Button>
                                </div>
                            </>

                        }
                    </div>
                    <div className="chatRoom__chatContainer">
                        <ChatBox user={user}/>
                    </div>
                    </>
                    :
                    ""

                }

                {

                    params.type === "info" ?
                    <>
                        <InfoBox chatRoom={chatRoom} />
                    </>
                    :
                    ""

                }
            </div>
        )
    }
}

export default ChatRoom
