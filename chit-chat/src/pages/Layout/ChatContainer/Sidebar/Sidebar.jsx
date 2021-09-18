import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import './Sidebar.scss'
import ChatItem from './ChatItem/ChatItem';

import Firebase from '../../../../Config/firebase'

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faSearch, faPlusCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../../../components/Modal/Modal';

function Sidebar() {

    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState()
    const [chatroomList, setChatroomList] = useState()
    const [isRefresh, setIsRefresh] = useState(false)

    const db = Firebase.firestore()
    const currentUser = Firebase.auth().currentUser

    const getUser = () => {

        if(currentUser){

            db
            .collection('User')
            .doc(currentUser.uid)
            .get()
            .then(doc => {

                if(!doc.empty){

                    setUser({id: doc.id, ...doc.data()})

                }

            })

        }

    }

    const getChatroomList = () => {

        let newList = []

        db.collection('ChatRoom')
        .onSnapshot(snapshot => {

            snapshot.docs.forEach(doc => {

                var data = {id:doc.id, ...doc.data()}

                if(!newList.includes(data)){

                    newList.push(data)
                }

            })


            setChatroomList(newList)


        })

    }

    // const refreshChat = () => {

    //     setIsRefresh(true)

    // }

    const addChat = () => {

        setIsOpen(true)
        console.log("opened")

    }

    useEffect(() => {

        if(typeof user !== 'undefined'){

            setIsLoading(false)

        } else {

            setIsLoading(true)
            console.log('loading...')
            getUser()

        }

        if(typeof chatroomList === 'undefined'){

            getChatroomList();

        }

    }, [user, chatroomList, isLoading, isRefresh])


    if(!currentUser){

        history.push('/')
        return null

    }else{

        return (
    
            <>
            <div className="sidebar">
    
                {
    
                    !isLoading
                    &&
    
                    <>
                        <div className="sidebar__headerWrap">
                            <div className="sidebar__header">                
                                <img className="sidebar__avatar" src={user.avatarUrl? user.avatarUrl:''} />
                                <h1 className="sidebar__userName">{user.userName? user.userName:''}</h1>
                                {/* <Button className="sidebar__button">
                                    <FontAwesomeIcon icon={faPen} />
                                </Button> */}
                            </div>
                        </div>
                        {/* <div className="sidebar__searchBox">
                            <input type="text" className="sidebar__searchbar" placeholder="Search for a ChatRoom" />
                            <Button className="sidebar__button" style={{color: '#1ac0a2'}}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div> */}
                        <div className="sidebar__chatRoomSection">
                            <div className="sidebar__titleHeader">
                                <h1 className="sidebar__title">
                                    ChatRoom
                                </h1>
                                {/* <Button className="sidebar__button" onClick={setIsRefresh(true)}>
                                    <FontAwesomeIcon icon={faSyncAlt} />
                                </Button> */}
                                <Button className="sidebar__button" onClick={addChat}>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </Button>
                            </div>
                            <div className="sidebar__chatRoomList">
                                
                                {
    
                                    typeof chatroomList !== 'undefined' &&
                                    chatroomList.map(chatroom => {
    
                                        return(
    
                                            <>
                                            {
    
                                                typeof chatroom !== 'undefined' && 
                                                <ChatItem key={chatroom.id} data={chatroom} />
    
                                            }
                                            </>
    
    
                                        )
    
                                    })
    
                                }
    
                            </div>
                        </div>

                    </>
    
                }

            </div>

            {
                isOpen &&
                <Modal user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
            }
            
            </>
        )

    }

}

export default Sidebar
