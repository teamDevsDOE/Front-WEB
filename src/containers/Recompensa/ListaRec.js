import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../services/api";
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarraMenu } from '../../components/BarraMenu'
import { useHistory } from "react-router-dom";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AlteraBonus from "../Recompensa/AlteraBonus"
import { makeStyles } from '@material-ui/core/styles';
// import { Modal, Paper, Typography, TextField, Button } from '@material-ui/core';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Box, IconButton } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Paper, Typography, TextField } from '@mui/material';


const ListItemText = styled(Typography)`
  flex-grow: 1;
  
`;

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  margin-top: 50px;
  height: 150px;
  
  
`;

const StyledList = styled('ul')`
  list-style-type: none;
  padding: 0;
  text-align: left;
  width: 60%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Define 3 colunas com largura igual */
  grid-gap: 30px; /* Define um espaçamento de 10px entre os itens */
 
  
  
`;

const StyledListItem = styled('li')`

width: 331px;
height: 318px;


background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 14px;
hr{
  
width: 315px;
height: 1px;
left: 887px;
top: 70%;

background: #00092C;
}

:hover{
    background-color: #00092C;
    p{
      color: #FFFFFF;
    }
    hr{
      background-color: #fff;
    }
    
  }

`;

const StyledButton = styled('button')`

  left: 79%;
  top: -50%;
  position: relative;
  width: 50px;
  height: 41px;
  border-style:none;
  background: #FF5F00;
  border-radius: 30px;
  color: #fff;
  
`;
const ContendContainer = styled('div')`

position: absolute;
width: 514px;
height: 47px;
top: 35%;
/* background: rgba(9, 32, 121, 0.04); */
border-radius: 6px;


`

const ContValue = styled('p')`
position: absolute;
width: 215px;
height: 44px;
padding-top: 15px;
margin-top: -42px;
margin-left: -42px;
background: rgba(0, 9, 44, 0.94);
border-radius: 20px 9px 20px 0px;
font-family: 'Roboto';
font-weight: 400;
font-size: 30px;
line-height: 14px;
text-align: center;
z-index: 999;
color: #FFFFFF;
`;

const ValorBonus = styled('p')`

position: relative;
  width: 53px;
  /* height: 21px; */
  left: 20px;
  top: 100px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 126%;
  color: #00092C;
  cursor: pointer;

`
const StyledButtonView = styled('button')`

position: relative;
width: 128px;
height: 45px;
left: 131px;
top: 77px;
border: none;
background: #FF5F00;
border-radius: 22.5px;
cursor: pointer;
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 125%;
/* or 20px */


color: #FFFFFF;

`
const PeopleCompany = styled('p')`

left: 903px;
top: 335px;
font-family: 'Inter';
font-style: normal;
font-weight: 300;
font-size: 19px;
line-height: 125%;
/* or 24px */


color: #00092C;
 
`
const StyledModalInformation = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  
`;
const Detalhes = styled.h2`
  position: relative;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  line-height: 125%;
  color: #00092C;
  left: 5%;
  top: 12px;
  

`

const ModalContentInfo = styled(Paper)`
  background: #FF9700;
  padding: 20px;
  width: 500px;
  height: 360px;
  
  column-count: 2;
  
  

  div{
    width: 502px;
    left: -259px;
    height: 50px;
    background: #FF5F00;
    position: relative;
    top: -148px ;
    border-top-left-radius: 1px;
    border-bottom-right-radius: 25px;
  }

  p{
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 125%;
    color: #00092C;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
    font-weight: 500;
    margin-top: 5%;
    position: relative;
    top: 60px;
    margin-left: 30px;
    
    
    

  }
 
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
display: flex;
  justify-content: center;
  width: 400px;
  padding: 20px;
  max-height: 400px; /* Altura máxima do modal */
  overflow: auto; /* Adiciona uma barra de rolagem quando necessário */
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  h2 {
   margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;

const TextFieldInput = styled(TextField)`


`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px; /* Espaço entre os botões */
 
`;
const TextFieldWrapper = styled('div')`
 margin-bottom: 20px;
 align-items: center;

`
const StyledButtonSalvar = styled('button')`
width: 138px;
height: 45px;
border: none;
color: #fff;
background: #FF5F00;
border-radius: 10px;
cursor: pointer;

`
const StyledButtonCancel = styled('button')`
width: 138px;
height: 45px;
border: none;
color: #fff;
background: #00092C;
border-radius: 10px;
cursor: pointer;
margin-bottom: 20px;

`

const StyledGif = styled('img')`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;
const PalChav = styled('p')`
left: 909px;
top: 222px;
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 125%;
/* or 20px */


color: #00092C;
`
const DateValid = styled('p')`
top: 247px;

font-family: 'Inter';
font-style: normal;
font-weight: 300;
font-size: 13px;
line-height: 125%;
/* or 16px */


color: #00092C;
`
const StyledListItemText = styled('div')`
position: relative;
top: 170px;
p{
  padding: 8px 20px 0px 23px;
  
}
hr{
  width: 283px;
  height: 1px;
  position: relative;
  left: 20px;
  top: 10px;
}
`
const ItemContainerBonus = styled('div')`
  position: relative;
  top: -60px;
  margin: 25px;

`
const NameEstablishment = styled('p')`
left: 903px;
top: 335px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 19px;
line-height: 125%;
/* or 24px */


color: #00092C;

`

export const Content = styled.div`
  display: flex;
  max-width: 100vw;
  height: 120vh;
   
`


//TESTE MAIS NOVO ABAIXO 
const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
  },
  cnpj: {
    fontWeight: 'bold',
  },
  name: {
    color: 'blue',
  },
  value: {
    color: 'green',
  },
  expiration: {
    fontStyle: 'italic',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));



function ListaDadosCadastrados() {
  const [bonusList, setBonusList] = useState([]);
  const [editBonus, setEditBonus] = useState(null);
  const [cnpj, setCnpj] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);



  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
      const idHemo = userData && userData.data.cnpj;

      const response = await api.get(`/bonus/all/${idHemo}`);
      console.log(response)
      setBonusList(response.data.bonus);
      console.log(response)
    } catch (error) {
      console.error('Erro ao buscar a lista de bônus:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cnpj]);

  const handleEditBonus = (id_bonus) => {
    const bonusToEdit = bonusList.find((bonusRec) => bonusRec.id_bonus === id_bonus);
    console.log(bonusToEdit.id_address)
    const formattedExpirationDate = new Date(bonusToEdit.expiration_date).toISOString().split('T')[0];
    setEditBonus({
      id_bonus: bonusToEdit.id_bonus,
      name_establishment: bonusToEdit.name_establishment,
      value: bonusToEdit.value,
      word_key: bonusToEdit.word_key,
      expiration_date: formattedExpirationDate,
      id_address: bonusToEdit.id_address,
      expired: bonusToEdit.expired,
      cnpj: bonusToEdit.cnpj,
      fk_hemocentro: bonusToEdit.fk_hemocentro,
      street: bonusToEdit.street,
      district: bonusToEdit.district,
      number_address: bonusToEdit.number_address,
      cep: bonusToEdit.cep,
      point_references: bonusToEdit.point_references,
    });
  };

  useEffect(() => {
    if (showSuccessToast) {
      toast.success('Bônus alterado com sucesso!'); // Exibe o toast de sucesso
    }
  }, [showSuccessToast]);


  const handleUpdateBonus = async (event) => {
    event.preventDefault();

    try {
      const updateBonusPromise = api.patch(`/bonus/update/${editBonus.id_bonus}`, {

        id_bonus: editBonus.id_bonus,
        name_establishment: editBonus.name_establishment,
        value: editBonus.value,
        word_key: editBonus.word_key,
        fk_id_address: editBonus.id_address,
        expiration_date: editBonus.expiration_date,
      });
      console.log('bonus', updateBonusPromise)

      const updateAddressPromise = api.patch(`/address/updateAddress/${editBonus.id_address}`, {

        street: editBonus.street,
        district: editBonus.district,
        number_address: editBonus.number_address,
        cep: editBonus.cep,
        point_references: editBonus.point_references


      })

      // ...continuação do código
      console.log('endere', updateAddressPromise)
      const [updateBonusResponse, updateAddressResponse] = await Promise.all([updateBonusPromise, updateAddressPromise]);

      console.log('-->', updateBonusResponse.data);
      console.log('endereço', updateAddressResponse.data);
      fetchData();
      setShowSuccessToast(true);

    } catch (error) {
      console.error('->', error);
    }
  };

  const handleCancelEdit = () => {
    setEditBonus(null);
    setShowSuccessToast(false);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  return (
    <Content>
      <BarraMenu />

      <StyledContainer>
        <h2 style={{marginBottom:'30px'}}>Lista de Bônus Cadastrados</h2>
        {bonusList.length > 0 ? (
          <StyledList>
            {bonusList.map((bonus) => (
              <StyledListItem key={bonus.id_bonus}>
                <StyledListItemText>
                  <NameEstablishment>{bonus.name_establishment}</NameEstablishment>
                  <PeopleCompany>{bonus.cnpj}</PeopleCompany>
                  <hr></hr>
                </StyledListItemText>


                <ItemContainerBonus>
                  {<PalChav> {bonus.word_key}</PalChav>}
                  {<DateValid>Validade: {formatDate(bonus.expiration_date)}</DateValid>}
                </ItemContainerBonus>
                <ValorBonus>{bonus.value}  </ValorBonus>


                {/* <p> {bonus.street}, {bonus.number_address}, {bonus.district}</p>
                    <p> {bonus.cep}</p>
                    <p> {bonus.point_references}</p> */}
                <StyledButton onClick={() => handleEditBonus(bonus.id_bonus)}> <ModeEditOutlineOutlinedIcon style={{ cursor: 'pointer' }} ></ModeEditOutlineOutlinedIcon></StyledButton>
                <StyledButtonView onClick={() => {
                  setSelectedBonus(bonus);
                  setModalOpen(true);
                }}>
                  Ver mais
                </StyledButtonView>



              </StyledListItem>
            ))}
          </StyledList>
        ) : (
          <p>Nenhum bônus cadastrado.</p>
        )}
        <StyledModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ModalContentInfo  >
            {selectedBonus && (
              <>

                <p >{selectedBonus.street} </p>
                <p>{selectedBonus.number_address}</p>
                <p>{selectedBonus.district}</p>
                <p>{selectedBonus.cep}</p>
                <p>{selectedBonus.point_references}</p>
                <p>{selectedBonus.value}</p>

                <p style={{ marginTop: '8px' }}>Validade: {formatDate(selectedBonus.expiration_date)}</p>
                <p>{selectedBonus.word_key}</p>
                <p>{selectedBonus.cnpj}</p>
                <p style={{width:'100%', whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{selectedBonus.name_establishment}</p>
              </>
            )}
            {/* <ModeEditOutlineOutlinedIcon style={{ cursor: 'pointer' }} ></ModeEditOutlineOutlinedIcon> */}
            <div><Detalhes>DETALHES✨</Detalhes></div>
            <CloseIcon style={{ cursor: 'pointer', position: 'relative', top: '-190px', left: '95%' }} onClick={() => setModalOpen(false)}>Fechar</CloseIcon> {/* Botão de fechar */}
          </ModalContentInfo>
        </StyledModal>
        {editBonus && (
          <StyledModal
            open={Boolean(editBonus)}
            onClose={handleCancelEdit}
            aria-labelledby="edit-modal-title"
            aria-describedby="edit-modal-description"
          >
            <StyledPaper>

              <form onSubmit={handleUpdateBonus}>

                <h2 id="edit-modal-title">Editar Bônus</h2>
                <TextFieldWrapper>
                  <TextFieldInput
                    label="Nome do Estabelecimento"
                    value={editBonus.name_establishment}
                    onChange={(event) => setEditBonus({ ...editBonus, name_establishment: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="Valor"
                    value={editBonus.value}
                    onChange={(event) => setEditBonus({ ...editBonus, value: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="Palavra-chave"
                    value={editBonus.word_key}
                    onChange={(event) => setEditBonus({ ...editBonus, word_key: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="Data de Validade"
                    value={editBonus.expiration_date}
                    onChange={(event) => setEditBonus({ ...editBonus, expiration_date: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="Endereço"
                    value={editBonus.street}
                    onChange={(event) => setEditBonus({ ...editBonus, street: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="Número"
                    value={editBonus.number_address}
                    onChange={(event) => setEditBonus({ ...editBonus, number_address: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="Bairro"
                    value={editBonus.district}
                    onChange={(event) => setEditBonus({ ...editBonus, district: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="CEP"
                    value={editBonus.cep}
                    onChange={(event) => setEditBonus({ ...editBonus, cep: event.target.value })}
                  />
                </TextFieldWrapper>

                <TextFieldWrapper>
                  <TextFieldInput
                    label="Pontos de Referência"
                    value={editBonus.point_references}
                    onChange={(event) => setEditBonus({ ...editBonus, point_references: event.target.value })}
                  />
                </TextFieldWrapper>

                <ButtonWrapper>
                  <StyledButtonSalvar variant="contained" color="primary" type="submit" onClick={() => setModalOpenS(false)}>
                    Salvar
                  </StyledButtonSalvar>
                  <StyledButtonCancel variant="contained" color="secondary" onClick={handleCancelEdit}>
                    Cancelar
                  </StyledButtonCancel>
                </ButtonWrapper>
              </form>
            </StyledPaper>
          </StyledModal>
        )}

      </StyledContainer>
      <ToastContainer />
    </Content>

  );
}


export default ListaDadosCadastrados;

//abaixo lista certinho

// function ListaDadosCadastrados() {
//   const [bonusList, setBonusList] = useState([]);
//   const [editBonus, setEditBonus] = useState(null);
//   const [cnpj, setCnpj] = useState('');

//   const classes = useStyles();
//   const fetchData = async () => {
//     try {
//       const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//       const idHemo = userData && userData.data.cnpj;

//       const response = await api.get(`/bonus/all/${idHemo}`);
//       setBonusList(response.data.bonus);
//       // setIdBonus(response.data.bonus[0].id_bonus);

//     } catch (error) {
//       console.error('Erro ao buscar a lista de bônus:', error);

//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [cnpj]);
//   //editar é responsável por obter os dados do bônus a ser editado e definir o estado editBonus
//   const handleEditBonus = (id_bonus) => {

//     const bonusToEdit = bonusList.find(bonusRec => bonusRec.id_bonus === id_bonus);
//     const formattedExpirationDate = new Date(bonusToEdit.expiration_date).toISOString().split('T')[0];
//     setEditBonus({
//       id_bonus: bonusToEdit.id_bonus,
//       name_establishment: bonusToEdit.name_establishment,
//       value: bonusToEdit.value,
//       word_key: bonusToEdit.word_key,
//       expiration_date: formattedExpirationDate,
//       id_address: bonusToEdit.id_address,
//       expired: bonusToEdit.expired,
//       cnpj: bonusToEdit.cnpj,
//       fk_hemocentro: bonusToEdit.fk_hemocentro,
//       street: bonusToEdit.street,
//       district: bonusToEdit.district,
//       number_address: bonusToEdit.number_address,
//       cep: bonusToEdit.cep,
//       point_references: bonusToEdit.point_references,
//     });
//     console.log(bonusToEdit)
//   };

//   //A handleUpdateBonus   faz uma solicitação para atualizar o bônus e o endereço associado, usando os dados armazenados em editBonus
//   const handleUpdateBonus = async (event) => {
//     event.preventDefault();
//     console.log(editBonus.expiration_date)

//     try {
//       const updateBonusPromise = api.patch(`/bonus/update/${editBonus.id_bonus}`, {
//         id_bonus: editBonus.id_bonus,
//         name_establishment: editBonus.name_establishment,
//         value: editBonus.value,
//         word_key: editBonus.word_key,
//         expiration_date: editBonus.expiration_date,
//         fk_id_address: editBonus.id_address



//       });

//       const updateAddressPromise = api.patch(`/address/updateAddress/${editBonus.id_address}`, {

//         street: editBonus.street,
//         district: editBonus.district,
//         number_address: editBonus.number_address,
//         cep: editBonus.cep,
//         point_references: editBonus.point_references,
//       });


//       const [updateBonusResponse, updateAddressResponse] = await Promise.all([updateBonusPromise, updateAddressPromise]);

//       console.log('-->', updateBonusResponse.data);
//       console.log(updateAddressResponse.data);
//       // Atualiza a lista após a edição
//       fetchData();

//       // Resto do código
//     } catch (error) {
//       console.error('->', error);
//     }
//   };



//   const handleCancelEdit = () => {
//     setEditBonus(null);
//   }
//   const formatDate=(date)=> {
//     const formattedDate = new Date(date);
//     const day = formattedDate.getDate().toString().padStart(2, '0');
//     const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
//     const year = formattedDate.getFullYear().toString();

//     return `${day}/${month}/${year}`;
//   }



//   return (
//     <div>
//       <h2>Lista de Bônus Cadastrados</h2>
//       {bonusList.length > 0 ? (
//         <ul>
//           {bonusList.map((bonus) => (
//             <li key={bonus.id_bonus}>
//               <p>Nome do Estabelecimento: {bonus.name_establishment}</p>
//               <p>Valor: {bonus.value}</p>
//               <p>Palavra-chave: {bonus.word_key}</p>
//               <p>Data de Validade:  {formatDate(bonus.expiration_date)}</p>
//               <p>CNPJ: {bonus.cnpj}</p>
//               <p>Endereço: {bonus.street}, {bonus.number_address}, {bonus.district}</p>
//               <p>CEP: {bonus.cep}</p>
//               <p>Pontos de Referência: {bonus.point_references}</p>
//               <button onClick={() => handleEditBonus(bonus.id_bonus)}>Editar</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Nenhum bônus cadastrado.</p>
//       )}
//       {editBonus && (
//         <Modal
//           open={Boolean(editBonus)}
//           onClose={handleCancelEdit}
//           className={classes.modal}
//           aria-labelledby="edit-modal-title"
//           aria-describedby="edit-modal-description"
//         >
//           <Paper className={classes.paper}>
//             <h2 id="edit-modal-title">Editar Bônus</h2>
//             <form onSubmit={handleUpdateBonus}>
//               <TextField
//                 label="Nome do Estabelecimento"
//                 value={editBonus.name_establishment}
//                 onChange={(event) => setEditBonus({ ...editBonus, name_establishment: event.target.value })}
//               />
//               <TextField
//                 label="Valor"
//                 value={editBonus.value}
//                 onChange={(event) => setEditBonus({ ...editBonus, value: event.target.value })}
//               />
//               <TextField
//                 label="Palavra-chave"
//                 value={editBonus.word_key}
//                 onChange={(event) => setEditBonus({ ...editBonus, word_key: event.target.value })}
//               />

//               <TextField

//                 label="Data de Validade"
//                 value={editBonus.expiration_date}
//                 onChange={(event) => setEditBonus({ ...editBonus, expiration_date: event.target.value })}
//               />

//               <TextField
//                 label="Endereço"
//                 value={editBonus.street}
//                 onChange={(event) => setEditBonus({ ...editBonus, street: event.target.value })}
//               />
//               <TextField
//                 label="Número"
//                 value={editBonus.number_address}
//                 onChange={(event) => setEditBonus({ ...editBonus, number_address: event.target.value })}
//               />
//               <TextField
//                 label="Bairro"
//                 value={editBonus.district}
//                 onChange={(event) => setEditBonus({ ...editBonus, district: event.target.value })}
//               />
//               <TextField
//                 label="CEP"
//                 value={editBonus.cep}
//                 onChange={(event) => setEditBonus({ ...editBonus, cep: event.target.value })}
//               />
//               <TextField
//                 label="Pontos de Referência"
//                 value={editBonus.point_references}
//                 onChange={(event) => setEditBonus({ ...editBonus, point_references: event.target.value })}
//               />

//               <Button onClick={handleUpdateBonus} variant="contained" color="primary" type="submit">
//                 Salvar
//               </Button>
//               <Button variant="contained" color="secondary" onClick={handleCancelEdit}>
//                 Cancelar
//               </Button>
//             </form>
//           </Paper>
//         </Modal>
//       )}

//     </div>
//   );
// };

//--------//