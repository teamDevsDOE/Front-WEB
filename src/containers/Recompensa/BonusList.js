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
import BusinessIcon from '@mui/icons-material/Business';

import { Paper, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 16px;
    font-size: 20px;
  }

  p {
    margin: 0;
    font-size: 16px;
  }

  select {
    margin-top: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  button {
    margin-top: 16px;
    border: none;
    background-color: #FF5F00;
    color: #fff;
    padding: 8px 16px;
    margin-left: 85px;
    width: 150px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #FF5F00;
    }
  }
`;

const StyledItem = styled.div`
  position: absolute;
`;

const Empresa = styled.p`
  color: #00092C;
  top: -85%;
  left: 75%;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  padding-bottom: 25px;
`;

const Desconto = styled.div`
  position: absolute;
  width: 215px;
  height: 45px;
  left: 66%;
  top: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FF5F00;
  border-radius: 10px 9px 20px 0px;

  p {
    font-family: 'Quicksand';
    font-weight: 900;
    font-size: 18px;
    color: #FFFFFF;
  }
`;

const Juridica = styled.p`
  color: red;
  top: -65%;
  left: 75%;
  font-size: 15px;
  font-weight: bold;
  position: relative;
`;

const Keypalavra = styled.p`
  position: absolute;
  left: 43%;
  font-size: 30px;
  top: 135px;
`;

const Validade = styled.p`
  position: absolute;
  left: 65%;
  top: 31%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledList = styled('ul')`
  list-style-type: none;
  padding: 0;
  text-align: left;
  width: 60%;
  
`;

const StyledListItem = styled('li')`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  width: 600px;
  padding: 20px;
`;

const StyledGif = styled('img')`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;
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
    const [isOpen, setIsOpen] = useState(false);


    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);


    const fetchData = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
            const idHemo = userData && userData.data.cnpj;

            const response = await api.get(`/bonus/all/${idHemo}`);
            setBonusList(response.data.bonus);
        } catch (error) {
            console.error('Erro ao buscar a lista de bônus:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [cnpj]);

    const handleEditBonus = (id_bonus) => {
        const bonusToEdit = bonusList.find((bonusRec) => bonusRec.id_bonus === id_bonus);
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

    const handleUpdateBonus = async (event) => {
        event.preventDefault();

        try {
            const updateBonusPromise = api.patch(`/bonus/update/${editBonus.id_bonus}`, {
                id_bonus: editBonus.id_bonus,
                name_establishment: editBonus.name_establishment,
                value: editBonus.value,
                word_key: editBonus.word_key,
                expiration_date: editBonus.expiration_date,
                fk_id_address: editBonus.id_address,
            });

            const updateAddressPromise = api.patch(`/address/updateAddress/${editBonus.id}`)
            // ...continuação do código

            const [updateBonusResponse, updateAddressResponse] = await Promise.all([updateBonusPromise, updateAddressPromise]);

            console.log('-->', updateBonusResponse.data);
            console.log(updateAddressResponse.data);
            fetchData();
        } catch (error) {
            console.error('->', error);
        }
    };

    const handleCancelEdit = () => {
        setEditBonus(null);
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedDate.getFullYear().toString();

        return `${day}/${month}/${year}`;
    };
    function handleViewModal(bonus) {
        // setSelectedSchedule(bonus);
        setAbreModal(true);
    }

    function handleViewModalClose() {
        setAbreModal(false);
    }

    return (
        <StyledContainer>
            <h2>Lista de Bônus Cadastrados</h2>
            {bonusList.length > 0 ? (
                <StyledList>
                    {bonusList.map((bonus) => (
                        <StyledListItem key={bonus.id_bonus}>
                            <StyledItem>
                                <BusinessIcon style={{ color: '#00092C', alignItems: 'center', fontSize: '50px', position: 'absolute', top: '-30px' }}  ></BusinessIcon>
                                <Empresa>{bonus.name_establishment}</Empresa>
                                <Juridica> {bonus.cnpj}</Juridica>
                            </StyledItem>
                            <Desconto><p> {bonus.value}% Desconto</p></Desconto>

                            <Keypalavra> {bonus.word_key}</Keypalavra>
                            <Validade> Validade: {formatDate(bonus.expiration_date)}</Validade>
                            {/* <p>Endereço: {bonus.street}, {bonus.number_address}, {bonus.district}</p>
              <p>CEP: {bonus.cep}</p>
              <p>Pontos de Referência: {bonus.point_references}</p> */}

                            <StyledButton onClick={() => handleEditBonus(bonus.id_bonus)}>Editar</StyledButton>
                            <Link
                                onClick={() => handleViewModal(bonus)}

                            >
                                Ver mais Detalhes
                                {/* <RiEyeLine size={20} style={{ marginLeft: '8px', marginTop: '15px' }} /> */}
                            </Link>
                        </StyledListItem>
                    ))}
                </StyledList>
            ) : (
                <p>Nenhum bônus cadastrado.</p>
            )}
            {editBonus && (
                <StyledModal
                    open={Boolean(editBonus)}
                    onClose={handleCancelEdit}
                    aria-labelledby="edit-modal-title"
                    aria-describedby="edit-modal-description"
                >
                    <StyledPaper>
                        <h2 id="edit-modal-title">Editar Bônus</h2>
                        <form onSubmit={handleUpdateBonus}>
                            <TextField
                                label="Nome do Estabelecimento"
                                value={editBonus.name_establishment}
                                onChange={(event) => setEditBonus({ ...editBonus, name_establishment: event.target.value })}
                            />
                            <TextField
                                label="Valor"
                                value={editBonus.value}
                                onChange={(event) => setEditBonus({ ...editBonus, value: event.target.value })}
                            />
                            <TextField
                                label="Palavra-chave"
                                value={editBonus.word_key}
                                onChange={(event) => setEditBonus({ ...editBonus, word_key: event.target.value })}
                            />
                            <TextField
                                label="Data de Validade"
                                value={editBonus.expiration_date}
                                onChange={(event) => setEditBonus({ ...editBonus, expiration_date: event.target.value })}
                            />
                            <TextField
                                label="Endereço"
                                value={editBonus.street}
                                onChange={(event) => setEditBonus({ ...editBonus, street: event.target.value })}
                            />
                            <TextField
                                label="Número"
                                value={editBonus.number_address}
                                onChange={(event) => setEditBonus({ ...editBonus, number_address: event.target.value })}
                            />
                            <TextField
                                label="Bairro"
                                value={editBonus.district}
                                onChange={(event) => setEditBonus({ ...editBonus, district: event.target.value })}
                            />
                            <TextField
                                label="CEP"
                                value={editBonus.cep}
                                onChange={(event) => setEditBonus({ ...editBonus, cep: event.target.value })}
                            />
                            <TextField
                                label="Pontos de Referência"
                                value={editBonus.point_references}
                                onChange={(event) => setEditBonus({ ...editBonus, point_references: event.target.value })}
                            />
                            <StyledButton variant="contained" color="primary" type="submit">
                                Salvar
                            </StyledButton>
                            <StyledButton variant="contained" color="secondary" onClick={handleCancelEdit}>
                                Cancelar
                            </StyledButton>
                        </form>
                    </StyledPaper>
                </StyledModal>
            )}
            {isOpen && (
                <Modal>
                    <ModalContent>
                        {bonusList.map((bonus) => (
                            <div key={bonus.id}>
                                <h3>Descrição Endereço</h3>
                                <p>Endereço: {bonus.street}</p>
                                <p>{bonus.number_address}</p>
                                <p>{bonus.district}</p>
                                <p>CEP: {bonus.cep}</p>
                                <p>Pontos de Referência: {bonus.point_references}</p>
                                <button onClick={closeModal}>Fechar</button>
                            </div>
                        ))}
                    </ModalContent>
                </Modal>
            )}


        </StyledContainer>
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