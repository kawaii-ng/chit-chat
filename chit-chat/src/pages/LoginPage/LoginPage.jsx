import React from 'react'
import './LoginPage.scss'

import LoginForm from './LoginForm/LoginForm'

function LoginPage() {
    return (
        <div className="loginPage">

            <div className="loginPage__circle"></div>
            <div className="loginPage__square"></div>
            
            <LoginForm />
            
        </div>
    )
}

export default LoginPage
