import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './DashboardPage.scss'

import Toolbar from '../../components/Toolbar/Toolbar'

import ChatContainer from '../Layout/ChatContainer/ChatContainer'
import SettingContainer from '../Layout/SettingContainer/SettingContainer'

function DashboardPage() {
    return (
        <div className="dashboardPage">
            <Router>
                <Toolbar />
                <Switch>
                    <Route path="/dashboard/chat/:id?" component={ChatContainer} />
                    <Route path="/dashboard/setting" component={SettingContainer} />
                </Switch>
            </Router>

        </div>
    )
}

export default DashboardPage
