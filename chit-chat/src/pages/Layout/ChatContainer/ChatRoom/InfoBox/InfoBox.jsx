import React, {useState, useEffect} from 'react'
import "./InfoBox.scss"

import Firebase from '../../../../../Config/firebase'

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router';

function InfoBox(props) {

    const history = useHistory()
    const params = useParams();
    const chatRoom = props.chatRoom

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
                            {chatRoom.description}
                        </div>
                    </div>
                    <div className="infoBox__grid">
                        <div className="infoBox__card admin">
                            <div className="infoBox__title">
                                Admin
                            </div>
                            <div className="infoBox__info">
                                Hard Code Mary
                            </div>
                        </div>
                        <div className="infoBox__card">
                            <div className="infoBox__title">
                                Likes
                            </div>
                            <div className="infoBox__info">
                                100,000,000
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
            </div>
        </div>
    )
}

export default InfoBox
