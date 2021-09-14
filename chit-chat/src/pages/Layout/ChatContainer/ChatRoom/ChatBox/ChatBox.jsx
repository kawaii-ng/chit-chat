import React, { useState, useEffect } from 'react'
import './ChatBox.scss'

import ChatBubble from './ChatBubble/ChatBubble'

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import Firebase from '../../../../../Config/firebase'
import { useParams } from 'react-router-dom';

function ChatBox(props) {

    const db = Firebase.firestore()
    const params = useParams()

    const [message, setMessage] = useState()
    const [dialog, setDialog] = useState()

    let frame = document.getElementById("chatBox__frame")

    const sendMessage = (message) => {

        if(message !== undefined && message !== '' && typeof props.user !== 'undefiend'){

            db
            .collection('ChatRoom')
            .doc(params.id)
            .collection('Message')
            .add({
                msg: message, 
                sender: props.user.userName,
                time: new Date(),
                type: 'text'
            })
            .then(()=>{console.log('sent successfully')})
            .catch(err=>console.log(err))

            setMessage("")

        }


    }

    const getDialog = () => {

        let newDialog = []

        db
        .collection('ChatRoom')
        .doc(params.id)
        .collection('Message')
        .orderBy('time', 'desc')
        .get()
        .then(docs => {

            if(!docs.empty){

                docs.forEach(doc=>{

                    newDialog.unshift({id: doc.id, ...doc.data()})

                })

                setDialog(newDialog)

            }

        })
        .catch(err=>console.log(err))

    }

    const checkUpdate = () => {

        db
        .collection('ChatRoom')
        .doc(params.id)
        .collection('Message')
        .orderBy('time', 'desc')
        .limit(1)
        .onSnapshot((snapshot)=>{

            const changes = snapshot.docChanges();
            let newList = []

            changes.forEach((change)=>{

                if(change.type === 'added'){

                    newList.push({

                        id: change.doc.id,
                        ...change.doc.data()

                    })

                    setDialog(currentDialog => {

                        if(typeof currentDialog.find(e=>e.id===newList[0].id) === 'undefined'){

                            return currentDialog.concat(newList)

                        }else{

                            return currentDialog

                        }

                    })

                }

            })
            
        })

    }

    useEffect(()=>{

        if(typeof dialog === 'undefined' && params.id){

            getDialog()

        }else{

            checkUpdate()
            if(frame !== null)
            frame.scrollTop = frame.scrollHeight;

        }

    }, [dialog, params.id, message])

    useEffect(()=>{

        

    }, [])

    return (
        <div className="chatBox">
            <div className="chatBox__container" id="chatBox__frame">

                {

                    typeof dialog !== 'undefined' && params.id &&
                    dialog.map(d => {

                        return(

                            <>
                                {

                                    dialog.indexOf(d) === 0 || 
                                    (dialog.indexOf(d) !== 0) &&
                                    (new Date(d.time.seconds * 1000).getMonth() !== new Date(dialog[dialog.indexOf(d) - 1].time.seconds * 1000).getMonth() ||
                                    new Date(d.time.seconds * 1000).getDate() !== new Date(dialog[dialog.indexOf(d) - 1].time.seconds * 1000).getDate() ||
                                    new Date(d.time.seconds * 1000).getFullYear() !== new Date(dialog[dialog.indexOf(d) - 1].time.seconds * 1000).getFullYear())
                                    ?
                                    <div className="chatBox__date">
                                        {new Date(d.time.seconds * 1000).getDate() + "/" + (new Date(d.time.seconds * 1000).getMonth()+1) + "/" + new Date(d.time.seconds * 1000).getFullYear()}
                                    </div>
                                    : 
                                    ""

                                }
                                <ChatBubble id={d.id} isMe={d.sender === props.user.userName? true: false} msg={d.msg} sender={d.sender} time={d.time}/>
                            </>

                        )

                    })

                }
                <div className="chatBox__inputContainer">
                    <input 
                        type="text" 
                        className="chatBox__input" 
                        placeholder="Type in your message here"
                        value={message}
                        onChange={e=>{setMessage(e.target.value)}}
                    />
                    <Button className="chatBox__button" onClick={()=>{sendMessage(message)}}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatBox
