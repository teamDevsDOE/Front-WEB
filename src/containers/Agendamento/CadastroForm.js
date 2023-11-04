import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import api from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { BarraMenu } from '../../components/BarraMenu'




// const FormularioDataHora = () => {
//   const [data, setData] = useState('');
//   const [hora, setHora] = useState('');

//   // Recupere o CNPJ do armazenamento local
//   const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//   const idHemo = userData && userData.data.cnpj;
//   // console.log(idHemo)

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const params = {
//       date: data,
//       hour: hora,
//       idHemo,
//       filed: 0
//     };

//     try {
//       const response = await api.post('/date/create', params);
//       console.log(response.data); // Use a resposta da API conforme necessário
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Data:
//           <input type="date" value={data} onChange={(event) => setData(event.target.value)} />
//         </label>
//         <br />
//         <label>
//           Hora:
//           <input type="time" value={hora} onChange={(event) => setHora(event.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Cadastrar</button>
//         <Link to="/listacadastros" >Ver todos os bônus</Link>
//       </form>
//     </div>
  
//   );
// };


import styled from 'styled-components';

const ContainerDt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left: 250px;



`;
export const Content = styled.div`
display: flex;
max-width: 100vw;
`


const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: -125px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 50vh;
 
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;

`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #FF5F00;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
`;
const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top:-560px;
  position: absolute;
  margin-left: -522px;
 
  
`;


const FormularioDataHora = () => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  // Recupere o CNPJ do armazenamento local
  const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
  const idHemo = userData && userData.data.cnpj;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const params = {
      date: data,
      hour: hora,
      idHemo,
      filed: 0
    };
    toast.success('Horas atribuidas!', { position: toast.POSITION.TOP_RIGHT });

    try {
      const response = await api.post('/date/create', params);
      console.log(response.data); // Use a resposta da API conforme necessário
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Content>
    <BarraMenu/>
      <ContainerDt>
      <Title>Cadastro de Data e Hora </Title>
        <Form onSubmit={handleSubmit}>
          <Label>Data:</Label>
          <Input type="date" value={data} onChange={(event) => setData(event.target.value)} />

          <Label>Hora:</Label>
          <Input type="time" value={hora} onChange={(event) => setHora(event.target.value)} />

          <Button type="submit">Cadastrar</Button>
          <StyledLink to="/listacadastros">Ver todos os horarios</StyledLink>
        </Form>
      </ContainerDt>
    </Content>
  );
};




export default FormularioDataHora;
