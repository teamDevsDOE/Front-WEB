import React from "react";

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'


import Acompanhar from '../containers/Acompanhar'

import Login from '../containers/login'
import Agendamento from '../containers/Agendamento'


 function Routes (){
    return (
        <Router>
            <Switch>
                <Route component = {Login} path="/login"/>
                <Route component = {Acompanhar} path="/acompanhar"/>
                <Route component = {Agendamento} path="/Agendamento"/>
            </Switch>
        </Router>
    )
 }
 export default Routes