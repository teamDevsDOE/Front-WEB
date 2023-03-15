import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/UserContext'
import { useHistory } from "react-router-dom";

import {
    ContainerItens, Titulo, Label, Input, Button, ContainerFundo, Error
} from './styles'

function Agendamento() {
    const { putUserData } = useUser()

    const history = useHistory();


    const schema = Yup.object().shape({
        cnpj: Yup.string()
            // .matches(/^\d{8}$/, 'CNPJ inválido')
            .required('O campo CNPJ é obrigatório'),
        pass: Yup.string()
            .min(3, 'A senha deve conter pelo menos 3 caracteres')
            .required('A senha é obrigatóriaria'),

    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = async clientData => {
        const data = await toast.promise(
            api.post('/hemocentro/login', {
                cnpj: clientData.cnpj,
                pass: clientData.pass

            }),
            {
                pending: 'Verificando seus dados ',
                success: 'Seja Bem Vindo!',
                error: 'Verifique seus dados!Tente novamente🤯'
            }
        )
        putUserData(data)
        history.push("/acompanhar");



    }

    return (
        <ContainerFundo>

            <ContainerItens>
                <Titulo>Aceito </Titulo>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text"  {...register("cnpj")} placeholder='Cnpj' error={errors.cnpj?.message} />
                    <Error>{errors.cnpj?.message}</Error>


                    <Input type="password" {...register("pass")} placeholder='Senha' error={errors.pass?.message} />
                    <Error>{errors.pass?.message}</Error>
                    <Button type='submit' >Entrar</Button>
                </form>



            </ContainerItens>

        </ContainerFundo>

    )


}
export default Agendamento