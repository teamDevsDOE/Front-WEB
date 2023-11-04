import React from "react";

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'


import Acompanhar from '../containers/Acompanhar'

import Login from '../containers/login'
import Agendamento from '../containers/Agendamento/CadastroForm'
import Recompensa from '../containers/Recompensa'
import ListaRec from '../containers/Recompensa/ListaRec'
import ActiveBonusList from "../containers/Recompensa/ActiveBonusList";
import AlteraBonus from "../containers/Recompensa/AlteraBonus"
import CadastroList from "../containers/Agendamento/CadastroList";
import Atribuicao from "../containers/Recompensa/Atribuicao"
import ScheduleList from "../containers/Teste/ScheduleList"
import BonusList from "../containers/Recompensa/BonusList";
import Finalizado from "../containers/Recompensa/Finalizado"

// import testeListaRec from '../containers/Recompensa/testeListaRec'
//





 function Routes (){
    return (
        <Router>
            <Switch>
                <Route component = {Login} path="/login"/>
                <Route component = {Acompanhar} path="/acompanhar"/>
                <Route component = {Agendamento} path="/Agendamento"/>
                <Route component = {Recompensa} path="/Recompensa"/>
                <Route component = {ScheduleList} path="/ScheduleList"/>
               //rota abaixo lista e edita 
                <Route component={ListaRec} path="/bonus" /> 
                <Route component={ActiveBonusList} path="/BonusAtivo" />
                
                <Route component={AlteraBonus} path="/update" /> 
                <Route component={CadastroList} path="/listacadastros" /> 
                <Route component={Atribuicao} path="/atribuicao" /> 
                <Route component={BonusList} path="/listbonus" /> 
                <Route component={Finalizado} path="/Finalizados"/>
                

            </Switch>
        </Router>
    )
 }
 export default Routes