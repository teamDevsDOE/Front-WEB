import React from 'react';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/UserContext';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Mulher from "../../image/mulher.svg"
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FaFacebookSquare, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContainerFundo = styled.div`
  background: linear-gradient(to bottom, #2d4f81, #042137);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ContainerDescription = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 90%;
  max-width: 100%;
  min-height: 680px;
  display: flex;
  flex-direction: row;
`;

const About = styled.p`
  flex: 1;
  padding: 24px;
  font-size: 20px;
  color: #fff;
  position: relative;
  top: -5px;
  width: 529px;
  text-align: center;
    h1{
       position: relative;
       left: 80px;
       
    }
`;
const ContainerSobre = styled.div`

width: 706px;
height: 690px;
flex-shrink: 0;
border-radius: 6px;
background: #00092C;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
img{
  position: relative;
  left: 505px;
  width: 200px;
  top: -151px;
}
p{
  position: relative;
    top: 36px;
    width: 491px;
    font-size: 18px;
    left: 24px;
    text-align: center;
}
h1{
  text-align:center ;
}
`
const SaibaMaisLink = styled(Link)`
 display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  top: 260px;
  text-decoration: none;
  border-radius: 4px;
  position: relative;
  transition: background-color 0.3s ease;

  &:hover {
   /* Move o link para cima */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra sutil */
    color: #FF5F00; /* Muda a cor do texto ao passar o mouse */
    
  }
`;
const WhatsappIcon = styled(FaWhatsapp)`
  font-size: 20px;
  color: #ffffff;
  position: relative;
  top: 250px;
  left: 415px;
  transition: transform 0.3s ease;

  ${SaibaMaisLink}:hover & {
    transform: rotate(360deg);
  }
`

const ContainerItens = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 520px;
  height: 425px;
  position: relative;
  left:80px;
  top: 100px;
  
  
  
`;

const Titulo = styled.h1`
  font-size: 24px;
  color: #333333;
  margin-bottom: 16px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 16px;
  position: relative;
  top: 50px;
  color: #333333;

  ${({ error }) =>
    error &&
    `
    border-color: #ff0000;
  `}
`;

const Error = styled.span`
  color: #ff0000;
  font-size: 14px;
  margin-bottom: 8px;
`;
const SocialContainer = styled.a`
position: relative;

a{
  margin-right: 10px;
}
`
// const Mulher = styled.img`
//  width: 100%;
//   max-height: 500px;
//   object-fit: cover;
// `
const Button = styled.button`
  background-color: #FF5F00;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  width: 220px;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  top: 50px;
  left: 120px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
`;

function Login() {
  const { putUserData } = useUser();
  const history = useHistory();

  const schema = Yup.object().shape({
    cnpj: Yup.string().required('O campo CNPJ é obrigatório'),
    pass: Yup.string().min(3, 'A senha deve conter pelo menos 3 caracteres').required('A senha é obrigatóriaria'),
  });

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
        pending: 'Verificando seus dados',
        success: 'Seja bem-vindo!',
        error: 'Verifique seus dados! Tente novamente 🤯'
      }
    );
    putUserData(data);
    history.push("/ScheduleList");
  };

  return (
    <ContainerFundo>
      <ContainerDescription>
        <ContainerSobre>
          <About>
            <h1>Seja bem-vindo ao Hemotech</h1>
            <p>A ferramenta revolucionária que conecta doadores, pacientes e profissionais da saúde em uma missão comum: salvar vidas.
              Com uma interface intuitiva e recursos avançados, nosso sistema simplifica todo o processo de doação de sangue, tornando-o eficiente e seguro.
            </p>
            <WhatsappIcon style={{zIndex:'1'}} />
          <SaibaMaisLink to="/">Tem dúvidas?Entre em contato com o suporte</SaibaMaisLink>
          </About>
          <img src={Mulher} alt="Mulher de Negócios" />
        </ContainerSobre>
        <ContainerItens>
          <Titulo>Entrar no Hemocentro</Titulo>

          <SocialContainer >
            <a href="https://www.fatecourinhos.edu.br/" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare size={24} />
            </a>
            <a href="https://www.fatecourinhos.edu.br/" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.fatecourinhos.edu.br/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          </SocialContainer>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" {...register("cnpj")} placeholder='CNPJ' error={errors.cnpj?.message} />
            <Error>{errors.cnpj?.message}</Error>

            <Input type="password" {...register("pass")} placeholder='Senha' error={errors.pass?.message} />
            <Error>{errors.pass?.message}</Error>

            <Button type='submit'>Entrar</Button>
          </form>
        </ContainerItens>
      </ContainerDescription>
    </ContainerFundo>
  );
}



// function Login() {
//     const { putUserData } = useUser();
//     const history = useHistory();

//     const schema = Yup.object().shape({
//       cnpj: Yup.string()
//         .required('O campo CNPJ é obrigatório'),
//       pass: Yup.string()
//         .min(3, 'A senha deve conter pelo menos 3 caracteres')
//         .required('A senha é obrigatóriaria'),
//     });

//     const { register, handleSubmit, formState: { errors } } = useForm({
//       resolver: yupResolver(schema)
//     });

//     const onSubmit = async (clientData) => {
//         try {
//           const response = await api.post('/hemocentro/login', {
//             cnpj: clientData.cnpj,
//             pass: clientData.pass
//           });

//           console.log(response.data);
//           const { cnpj } = response.data;
//           putUserData(response.data);
//           history.push("/ScheduleList?cnpj=" + cnpj);
//         } catch (error) {
//           console.error(error);
//           toast.error("Verifique seus dados! Tente novamente.");
//         }
//       };


//     return (
//       <ContainerFundo>
//         <ContainerAnimado></ContainerAnimado>
//         <ContainerItens>
//           <Titulo>Entrar no Hemocentro </Titulo>
//           <form noValidate onSubmit={handleSubmit(onSubmit)}>
//             <Input type="text" {...register("cnpj")} placeholder='Cnpj' error={errors.cnpj?.message} />
//             <Error>{errors.cnpj?.message}</Error>
//             <Input type="password" {...register("pass")} placeholder='Senha' error={errors.pass?.message} />
//             <Error>{errors.pass?.message}</Error>
//             <Button type='submit'>Entrar</Button>
//           </form>
//         </ContainerItens>
//       </ContainerFundo>
//     );
//   }
export default Login