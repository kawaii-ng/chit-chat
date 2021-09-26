import React, { useState, useEffect } from 'react'
import "./Modal.scss"

import Firebase from '../../Config/firebase'

import { Button } from 'react-bootstrap';

function Modal(props) {

    const db = Firebase.firestore()

    const [error, setError] = useState(false)
    const [chatTitle, setChatTitle] = useState()
    const [chatDescription, setChatDescription] = useState()

    const createChat = () => {

        setError(false)

        if(typeof chatTitle !== 'undefined' && chatTitle.length !== 0){

            if(typeof chatDescription === 'undefined'){

                // add chat room in firebase
                db
                .collection("ChatRoom")
                .add({

                    admin: props.user.id,
                    chatroomTitle: chatTitle,
                    createDate: new Date(),
                    // description: chatDescription,
                    chatIcon: `https://avatars.dicebear.com/api/initials/${chatTitle}.svg`,
                    like: 0

                })
                .then(()=>console.log("created chat room successfully"))
                .catch(err=>console.log(err))

            }else {

                    // add chat room in firebase
                db
                .collection("ChatRoom")
                .add({

                    admin: props.user.id,
                    chatroomTitle: chatTitle,
                    createDate: new Date(),
                    description: chatDescription,
                    chatIcon: `https://avatars.dicebear.com/api/initials/${chatTitle}.svg`,
                    like: 0

                })
                .then(()=>console.log("created chat room successfully"))
                .catch(err=>console.log(err))

            }

            

        }else {

            setError(true)

        }

    }

    const closeModal = () => {

        props.setIsOpen(false)

    }
    
    return (
        <div className="modal">
            <div className="modal__dialog">
                <Button className="modal__button" onClick={closeModal}>
                    Close
                </Button>
                <h1 className="modal__title">Create Chat Room</h1>
                <form action="" className="modal__form">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={chatTitle} onChange={e=>setChatTitle(e.target.value)} autoComplete="off" spellcheck="false" />
                    {

                        error &&
                        <p className="modal__error">Please fill in the title</p>

                    }
                    <label htmlFor="description">Description</label>
                    <textarea name="description" rows="4" value={chatDescription} onChange={e=>setChatDescription(e.target.value)} autoComplete="off" spellcheck="false" />
                    <div className="modal__container">
                        <Button className="modal__createBtn" onClick={createChat} >Create</Button>                    
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal
