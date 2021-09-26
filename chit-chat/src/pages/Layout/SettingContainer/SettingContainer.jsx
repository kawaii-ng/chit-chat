import React, { useState, useEffect } from 'react'
import './SettingContainer.scss'

import Firebase from '../../../Config/firebase'

function SettingContainer() {

    const db = Firebase.firestore()
    const currentUser = Firebase.auth().currentUser

    const [user, setUser] = useState()
    const [name, setName] = useState()
    const [isValid, setIsValid] = useState(false)
    const [length, setLength] = useState()

    const getUser = () => {

        if(currentUser){

            db
            .collection('User')
            .doc(currentUser.uid)
            .get()
            .then(doc => {

                if(!doc.empty){

                    setUser({id: doc.id, ...doc.data()})
                    setName(doc.data().userName)
                    setLength(doc.data().userName.length)

                }

            })

        }

    }

    const handle_reset = () => {

        setName(user.userName)

    }

    const handle_update = () => {

        if(length !== 0 && isValid){
            
            db
            .collection("User")
            .doc(user.id)
            .update({
    
                userName: name,
                avatarUrl: `https://avatars.dicebear.com/api/initials/${name}.svg`
    
            })
            .catch(err=>console.log(err))
            getUser()
            setName(name)
            setLength(name.length)
            
        }

    }

    const checkValid = (name) => {

        db
        .collection("User")
        .where('userName', '==', name)
        .get()
        .then(docs=>{

            if(!docs.empty){

                setIsValid(false)

            }else {

                setIsValid(true)

            }

        })

    }

    useEffect(()=>{
        if(typeof user === 'undefined'){

            getUser();
            
        }
    }, [user])


    useEffect(()=>{

        if(name){

            checkValid(name);

        }

    }, [name])

    return (
        <div className="settingContainer">
            {

                typeof user != 'undefined'?
                <>
                    <h1>Setting</h1>

                    <div className="settingContainer__avatar">
                        <img src={user.avatarUrl? user.avatarUrl:''} alt="" />
                    </div>

                    <form action="" className="settingContainer__form">
                        <label htmlFor="name">User Name</label>
                        <input type="text" value={name} onChange={e=>{setName(e.target.value); setLength(e.target.value.length)}}/>
                        {
                            !isValid && user.userName !== name?
                            <p style={{color: "red"}}>This user name has already existed</p>
                            :
                            ""
                        }
                        {

                            length == 0 ? 
                            <p style={{color: "red"}}>User name should not be empty</p>
                            :
                            ""

                        }
                        <div>
                            <button className="settingContainer__btn reset" onClick={()=>handle_reset()}>Reset</button>
                            <button className={`settingContainer__btn ${!isValid && "disable"}`} onClick={()=> isValid? handle_update(): ""}>Update</button>
                        </div>
                    </form>
                </>
                :
                <h1>Loading</h1>

            }
        </div>
    )
}

export default SettingContainer
