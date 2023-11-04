import React, { useEffect, useState } from "react";

import api from '../../../services/api'
import { Container, Menu, LinkMenu, Content } from "../Schedules/styles";
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

import { BarraMenu } from '../../../components/BarraMenu'
import situation from '../Schedules/scheduleStatus'

function Schedules() {

    const [rows, setRows] = useState([])
    //variavel auxiliar que vai guardar  situações filtrados
    const [filteredSit, setfilteredSit] = useState([])
    const [isNull, setIsNull] = useState(false)
    const [activeSituation, setfActiveSituation] = useState([1])
    const [atualizar, setAtualizar] = useState(false)

    //função para listar tabela 
    async function fetchData() {
        const { data } = await api.get('schedules/getScheduleHemo')
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
        setfilteredSit(newArrayDataSituation)
    }
    useEffect(() => {
        fetchData()
        // setAtualizar(false)
    }, [atualizar])

    // função quando clicar no link:
    function hadleSituation(situation) {
        if (situation.label == 'Todos') {
            setfilteredSit(rows)
            setIsNull(false)
        } else {
            let newSituation = rows.filter(row => row.situation == situation.id)
            if (situation.id == 2) {
                newSituation = rows.filter(row => row.situation == situation.id || row.situation == 1)
            }

            if (newSituation.length == 0) {
                setIsNull(true)
            } else {
                setIsNull(false)
            }
            setfilteredSit(newSituation)
        }
        setfActiveSituation(situation.id)
    }

    console.log(filteredSit)
    return (
        <Content>
            <BarraMenu />
            <Container>
                <Menu>
                    {situation && situation.map(situation => (
                        <LinkMenu key={situation.id}
                            onClick={() => hadleSituation(situation)}isActivesituation={activeSituation===situation.id}>
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
                                <TableCell >Situação</TableCell>
                                <TableCell >Alterar Situação</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isNull ? (
                                (filteredSit.length > 0 ? filteredSit : rows).map((row) => (
                                    <Row key={row.name} row={row} atualizar={atualizar} setAtualizar={setAtualizar}  />
                                ))
                            ) : ('')}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Content>
    )
}




export default Schedules