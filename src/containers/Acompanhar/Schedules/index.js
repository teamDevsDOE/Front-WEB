import React, { useEffect, useState } from "react";

import api from '../../../services/api'
import { Container, Menu, LinkMenu } from "../Schedules/styles";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Row from "./row";

// import {Menu} from '../../../components/Menu'
import situation from '../Schedules/scheduleStatus'

function Schedules() {

    //guarda os voluntarios
    const [filtrasituation, setSituation] = useState([]);
    const [activeSituation, setActiveSituation] = useState([1
    ]);
    const [rows, setRows] = useState([])
    
//para buscar pacientes para filtrar
    useEffect(() => {
        async function fetchData() {
            const response = await api.get('schedules/getScheduleHemo');
            setSituation(response.data);
          
        }
        fetchData();
    }, []);

//função para listar tabela 
    async function fetchData() {
        const { data } = await api.get('schedules/getScheduleHemo');
        const newArrayDataSituation = data.schedules.map(schedulin => {
            return {
                name: schedulin.name,
                situation: schedulin.situation,
                situacao_text: schedulin.situacao_text,
                data_agendamento: new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(schedulin.data_agendamento)),
                description:
                    [
                        {
                            cpf: schedulin.cpf,
                            id_date: schedulin.id_date,
                            id_hemo: schedulin.id_hemo,
                            date_hour: schedulin.date_hour,
                            hora_agendamento: schedulin.hora_agendamento,
                        }
                    ]
            }
        })
        setRows(newArrayDataSituation)
    }

    useEffect(() => {
        fetchData()
    }, [])

//função dos  botões de listagem  de cadda situação (tentativa)
    async function handleSituation(situation) {

        const response = await api.get('schedules/getScheduleHemo');
        setSituation(response.data);
        if (situation.id === 2) {
            //todos os pacientes
            setSituation(response.data)

        } else {
            const { data } = await api.get('schedules/getScheduleHemo');
            const newArrayDataSituation = data.schedules.filter(schedule => schedule === situation.value)
            setRows(newArrayDataSituation)
        }
        setActiveSituation(situation.id)
    }

    return (

        <Container>
            <Menu>
                {situation && situation.map(situation => (
                    <LinkMenu
                        key={situation.id}
                        onClick={() => handleSituation(situation)}
                        isActivesituation={activeSituation === situation.id}
                    >
                        {situation.label}
                    </LinkMenu>
                ))}
            </Menu>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Nome </TableCell>
                            <TableCell >Data da solicitação</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell >Alterar Situação</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    )
}




export default Schedules