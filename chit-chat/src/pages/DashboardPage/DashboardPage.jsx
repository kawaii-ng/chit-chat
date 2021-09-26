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
                    <Route path="/dashboard/setting" component={SettingContainer} exact/>
                    <Route path="/dashboard/:type/:id?" component={ChatContainer} />
                </Switch>
            </Router>

        </div>
    )
}

export default DashboardPage
