import React, {useState, useEffect} from 'react'
import "./InfoBox.scss"

import Firebase from '../../../../../Config/firebase'

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router';

function InfoBox(props) {

    const db = Firebase.firestore();
    const history = useHistory()
    const params = useParams();
    const user = props.user;
    const chatRoom = props.chatRoom
    const [admin, setAdmin] = useState();

    const getAdmin = () => {


        db
        .collection("User")
        .doc(chatRoom.admin)
        .get()
        .then(doc=> {

            if(!doc.empty)
                setAdmin(doc.data().userName)

        })
        .catch(err=> console.log(err))


    }

    useEffect(()=>{

        getAdmin();

    }, [])

    const deleteChat = () => {

        db
        .collection("ChatRoom")
        .doc(chatRoom.id)
        .get()
        .then(doc=> {

            if(!doc.empty)
                doc.ref.delete();

        })
        .catch(err=>console.log(err))

        history.push('/dashboard/chat')

    }

    return (
        <div className="infoBox">
            
            <div className="infoBox__toolbar">
                <Button className="infoBox__button" onClick={()=>{history.push('/dashboard/chat/' + params.id)}}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <div className="infoBox__title">Chat Room Details</div>
            </div>
            <div className="infoBox__container">
                <h1 className="infoBox__title">{chatRoom.chatroomTitle}</h1>
                <div className="infoBox__avatar">
                    <img src={chatRoom.chatIcon} />
                </div>
                <div className="infoBox__infoSection">
                    <div className="infoBox__description">
                        <div className="infoBox__title">
                            Description
                        </div>
                        <div className="infoBox__info">
                            { chatRoom.description? chatRoom.description: "NA"}
                        </div>
                    </div>
                    <div className="infoBox__grid">
                        <div className="infoBox__card admin">
                            <div className="infoBox__title">
                                Admin
                            </div>
                            <div className="infoBox__info">
                                <div className="infoBox__userAvatar">
                                    <img src={`https://avatars.dicebear.com/api/initials/${admin}.svg`} alt="" />
                                </div>
                                {admin}
                            </div>
                        </div>
                        <div className="infoBox__card">
                            <div className="infoBox__title">
                                
                            </div>
                            <div className="infoBox__info">
                                
                            </div>
                        </div>
                        <div className="infoBox__card">
                            <div className="infoBox__title">
                                Created on
                            </div>
                            <div className="infoBox__info">
                                {
                                    new Date(chatRoom.createDate.seconds * 1000).getFullYear()
                                    + "/" +
                                    (new Date(chatRoom.createDate.seconds * 1000).getMonth() + 1)
                                    + "/" +
                                    new Date(chatRoom.createDate.seconds * 1000).getDate()
                                }
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                { 
                        user.id === chatRoom.admin ? 
                        <>
                            <Button className="del-btn" onClick={deleteChat}>
                                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                            </Button>
                        </>
                        :
                        ""
                }
            </div>
                    
        </div>
    )
}

export default InfoBox
