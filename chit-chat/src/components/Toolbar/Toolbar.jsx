import React from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import './Toolbar.scss'

import Firebase from '../../Config/firebase';

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faCog, faHeart, faCommentAlt } from '@fortawesome/free-solid-svg-icons'

function Toolbar() {

    const history = useHistory()

    const handle_logout = () => {

        Firebase.auth().signOut()
        history.push('/')

    }

    return (
        <div className="toolbar">
            <div className="toolbar__list">
                <Link to="">
                    <Button className="toolbar__btn">
                        <FontAwesomeIcon icon={faCommentAlt} />
                    </Button>
                </Link>
                <Link to="">
                    <Button className="toolbar__btn">
                        <FontAwesomeIcon icon={faCog} />
                    </Button>
                </Link>
                <Link to="">
                    <Button className="toolbar__btn" onClick={()=>{handle_logout()}}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Toolbar
