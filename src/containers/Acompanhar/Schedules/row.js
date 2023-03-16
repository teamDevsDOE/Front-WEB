import React, { useEffect, useState } from "react";

import {
    Button
} from './styles'
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
import api from '../../../services/api'
import Select from 'react-select'
import ReactSelect from "react-select";
import status from './scheduleStatus'
import { useHistory } from "react-router-dom";
import { useUser } from '../../../hooks/UserContext'
import { toast } from 'react-toastify';


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    //variavel para pegar o cpf
    console.log(row)
    const dados = row.description[0];

    
    async function handleClick() {
        try {
            const resultSituation = row.situation;
            // console.log(row.pop())
            let response = await api.post('schedules/insertsituation', {
              situation: resultSituation === 1 ? 2 : resultSituation === 2 ? 3 : 4 ,
              id_user: dados.cpf,
              id_date: dados.id_date
            });
            
            console.log(response)
            // // Aqui você pode tratar a resposta da chamada de API, se necessário
        } catch (error) {
            console.log(error)
            // Aqui você pode tratar o erro, se necessário
        }
    }


    async function hankdleCancela() {
        console.log("to aqui")
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.cpf}</TableCell>
                <TableCell>{row.data_agendamento}</TableCell>
                <TableCell>{row.situation}</TableCell>
                <TableCell>
                    <Button onChange={newSituation => {
                        setNewSituation(row.cpf, newSituation.value)
                    }} >Teste</Button>
                    <Button onClick={() => handleClick()}>Aceitar</Button>

                    <Button onClick={hankdleCancela}>Cancelar</Button>

                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Descrição
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>CPF</TableCell>
                                        <TableCell>Horario</TableCell>
                                        <TableCell>Id Hemo</TableCell>
                                        <TableCell>Id Date</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.description.map((descriptionRow) => (
                                        <TableRow key={descriptionRow.cpf}>
                                            <TableCell component="th" scope="row">
                                                {descriptionRow.cpf}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {descriptionRow.hora_agendamento}
                                            </TableCell>
                                            <TableCell>{descriptionRow.id_hemo}</TableCell>
                                            <TableCell>
                                                {descriptionRow.id_date}
                                            </TableCell>
                                            {/* <Button onClick={() => handleClick(descriptionRow.cpf,descriptionRow.id_date,)}>Aceitar</Button> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row