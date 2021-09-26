import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import './LoginForm.scss'

import Firebase, { googleProvider } from '../../../Config/firebase'

import { Button } from 'react-bootstrap';

function LoginForm() {

    const history = useHistory()

    const [step, setStep] = useState('1')
    const [user, setUser] = useState()
    const [name, setName] = useState()
    const [valid, setValid] = useState(false)
    const [error, setError] = useState(false)

    const db = Firebase.firestore()
    const userRef = db.collection('User')

    const checkValid = (name) => {

        userRef
        .where('userName', '==', name)
        .get()
        .then(docs=>{

            if(!docs.empty){

                setValid(false)

            }else {

                setValid(true)

            }

        })

    }

    const handle_registerName = () => {

        setError(false)

        if(valid){

            const newUser = {

                email: user.email, 
                userName: name,
                favouriteChat: [],
                avatarUrl: 
                `https://avatars.dicebear.com/api/initials/${name}.svg`
    
            }
    
            userRef
            .doc(user.uid)
            .set(newUser)

            history.push("/dashboard/chat")

        }else{

            setError(true)

        }

    }

    const handle_login = (provider) => {

        Firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
            
            setUser({...res.user})

            userRef
            .doc(res.user.uid)
            .get()
            .then(doc => {
    
                if(!doc.empty && typeof doc.data() !== 'undefined'){
    
                    history.push("/dashboard/chat")
                    
                }else{
    
                    setStep('2')
    
                }
            }) 

        })
        .catch((err) => {

            console.log(err)

        })  

    }

    useEffect(()=>{
        
        if(name){

            checkValid(name)

        }

    }, [name])

    return (
        <div className="loginForm">

            <div className="loginForm__form">
                <div className="loginForm__headerWrap">
                    <div className="loginForm__header">
                        <h1 className="loginForm__title">Chit-Chat</h1>
                    </div>
                </div>
                <div className="loginForm__contentWrap">
                    {

                        step === '1'
                        &&
                        <Button className="loginForm__button" onClick={()=>{handle_login(googleProvider)}}>Login with Google</Button>
                        
                    }

                    {

                        step === '2'
                        &&
                        <>
                            <input 
                                type='text' name='name' 
                                autoComplete='off' 
                                spellCheck="false" 
                                placeholder="Your name"
                                value={name} 
                                onChange={(e)=>{setName(e.target.value)}} />

                            {

                                <font className={valid? 'loginForm__valid': 'loginForm__inValid'}>
                                    {
                                        (typeof name !== 'undefined' && name.length !== 0)
                                        &&
                                        <>{name} is {valid? '': 'not'} valid</>
                                    }
                                </font>

                            }
                            
                            <Button 
                                className="loginForm__button" 
                                style={{position: 'absolute', bottom: 20}}
                                onClick={()=>{handle_registerName()}}
                            >
                                Confirm
                            </Button>

                        </>

                    }
                </div>

            </div>

        </div>
    )
}

export default LoginForm
