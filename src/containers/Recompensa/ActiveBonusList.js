import React, { useState, useEffect } from "react";
import api from "../../services/api"; import styled from 'styled-components';
import { Typography, Button } from '@mui/material';


const BonusListContainer = styled.div`
  margin-top: 20px;
`;

const BonusListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BonusItem = styled.li`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 0 0 45%; /* Ocupa 45% da largura do contêiner, para exibir dois itens por linha */

  @media (max-width: 768px) {
    flex: 0 0 100%; /* Em telas menores, ocupa 100% da largura para exibir um item por linha */
  }
`;

const BonusTitle = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BonusLabel = styled(Typography)`
  font-weight: bold;
`;

const BonusValue = styled(Typography)`
  margin-bottom: 5px;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: #d32f2f;
  }
`;

function ActiveBonusList() {
    const [bonusList, setBonusList] = useState([]);
    useEffect(() => {
        api.get("/bonus/all")
            .then((response) => {
                setBonusList(response.data.bonus);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    async function handleDelete(id) {
        try {
            await api.delete(`/bonus/delete/${id}`);
            setBonusList(bonusList.filter((bonus) => bonus.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <BonusListContainer>
            <BonusTitle variant="h4">Bônus Ativos:</BonusTitle>
            {bonusList && bonusList.length > 0 ? (
                <ul>
                    {bonusList.map((bonus) => (
                        <BonusItem key={bonus.id}>
                            <BonusLabel>Estabelecimento:</BonusLabel>
                            <BonusValue>{bonus.name_establishment}</BonusValue>
                            <BonusLabel>Valor:</BonusLabel>
                            <BonusValue>R$ {bonus.value}</BonusValue>
                            <BonusLabel>Chave:</BonusLabel>
                            <BonusValue>{bonus.word_key}</BonusValue>
                            <BonusLabel>CNPJ:</BonusLabel>
                            <BonusValue>{bonus.cnpj}</BonusValue>
                            <BonusLabel>Data de Expiração:</BonusLabel>
                            <BonusValue>{bonus.expiration_date}</BonusValue>
                            <DeleteButton onClick={() => handleDelete(bonus.id)}>Excluir</DeleteButton>
                        </BonusItem>
                    ))}
                </ul>
            ) : (
                <Typography variant="body1">Não há bônus ativos no momento.</Typography>
            )}
        </BonusListContainer>
    );
}

export default ActiveBonusList;
