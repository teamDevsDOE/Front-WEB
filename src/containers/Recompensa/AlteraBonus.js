import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 495px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0;
 

  
  
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
`;

const Button = styled.button`
  background-color: #0099ff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 50%;
  align-items: center;
  margin-top: 20px;

  &:hover {
    background-color: #0077cc;
  }
`;




// function UpdateBonus(props) {
//   const [nameEstablishment, setNameEstablishment] = useState(props.nameEstablishment);
//   const [value, setValue] = useState(props.value);
//   const [wordKey, setWordKey] = useState(props.wordKey);
//   const [fkIdAddress, setFkIdAddress] = useState(props.fkIdAddress);
//   const [cnpj, setCnpj] = useState(props.cnpj);
//   const [expirationDate, setExpirationDate] = useState(props.expirationDate);
//   const [id, setId] = useState(props.id);





//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await api.patch(`/bonus/update/${id}`, {
//         name_establishment: nameEstablishment,
//         value: value,
//         word_key: wordKey,
//         fk_id_address: fkIdAddress,
//         cnpj: cnpj,
//         expiration_date: expirationDate,
//       });
//       alert("Bônus atualizado com sucesso!");
//     } catch (error) {
//       console.log(error);
//       alert("Ocorreu um erro ao atualizar o bônus. Tente novamente.");
//     }
//   };
//   useEffect(() => {
//     const loadBonus = async () => {
//       try {
//         const response = await api.get(`/bonus/${id}`);
//         const data = response.data; // Atribui a variável data para acessar os valores do bônus
//         setId(data.id);
//         setNameEstablishment(data.name_establishment);
//         setValue(data.value);
//         setWordKey(data.word_key);
//         setFkIdAddress(data.fk_id_address);
//         setCnpj(data.cnpj);
//         setExpirationDate(data.expiration_date);
//       } catch (error) {
//         console.log(error);
//         alert("Ocorreu um erro ao carregar o bônus. Tente novamente.", error);
//       }
//     };

//     loadBonus();
//   }, [id]);



//   return (
//     <div>
//       <h1>Atualizar Bônus</h1>
//       <Form onSubmit={handleSubmit}>
//         <Label>
//           ID do Bônus:
//           <Input type="text" value={id} onChange={(event) => setId(event.target.value)} />
//         </Label>
//         <Label>
//           Estabelecimento:
//           <Input type="text" value={nameEstablishment} onChange={(event) => setNameEstablishment(event.target.value)} />
//         </Label>
//         <Label>
//           Valor:
//           <Input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
//         </Label>
//         <Label>
//           Chave:
//           <Input type="text" value={wordKey} onChange={(event) => setWordKey(event.target.value)} />
//         </Label>
//         <Label>
//           ID do Endereço:
//           <Input type="text" value={fkIdAddress} onChange={(event) => setFkIdAddress(event.target.value)} />
//         </Label>

//         <Label>
//           CNPJ:
//           <input type="text" value={cnpj} onChange={(event) => setCnpj(event.target.value)} />
//         </Label>
//         <br />
//         <Label>
//           Data de Expiração:
//           <input type="date" value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} />
//         </Label>
//         <br />
//         <Button type="submit">Atualizar</Button>
//       </Form>
//     </div>
//   );
// }


function UpdateBonus({ bonus, onSave, onCancel }) {
  const [nameEstablishment, setNameEstablishment] = useState('');
  const [value, setValue] = useState(0);
  const [wordKey, setWordKey] = useState('');
  const [fkIdAddress, setFkIdAddress] = useState(0);
  const [cnpj, setCnpj] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    setNameEstablishment(bonus.name_establishment);
    setValue(bonus.value);
    setWordKey(bonus.word_key);
    setFkIdAddress(bonus.fk_id_address);
    setCnpj(bonus.cnpj);
    setExpirationDate(bonus.expiration_date);
  }, [bonus]);

  const handleNameEstablishmentChange = (event) => {
    setNameEstablishment(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleWordKeyChange = (event) => {
    setWordKey(event.target.value);
  };

  const handleFkIdAddressChange = (event) => {
    setFkIdAddress(event.target.value);
  };

  const handleCnpjChange = (event) => {
    setCnpj(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleSave = async () => {
    const data = {
      nameEstablishment,
      value,
      wordKey,
      fkIdAddress,
      cnpj,
      expirationDate,
    };
    await onSave(bonus.id, data);
  }

  return (
    <div>
      <h1>Editar Bônus</h1>
      <form>
        <div>
          <label htmlFor="nameEstablishment">Estabelecimento</label>
          <input
            type="text"
            id="nameEstablishment"
            name="nameEstablishment"
            value={nameEstablishment}
            onChange={handleNameEstablishmentChange}
          />
        </div>
        <div>
          <label htmlFor="value">Valor</label>
          <input
            type="number"
            id="value"
            name="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <div>
          <label htmlFor="wordKey">Chave</label>
          <input
            type="text"
            id="wordKey"
            name="wordKey"
            value={wordKey}
            onChange={handleWordKeyChange}
          />
        </div>
        <div>
          <label htmlFor="fkIdAddress">ID do Endereço</label>
          <input
            type="number"
            id="fkIdAddress"
            name="fkIdAddress"
            value={fkIdAddress}
            onChange={handleFkIdAddressChange}
          />
        </div>
        <div>
          <label htmlFor="cnpj">CNPJ</label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={cnpj}
            onChange={handleCnpjChange}
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Data de Expiração</label>
          <input
            type="date"
            id="expirationDate"
            name="expirationDate"
            value={expirationDate}
            onChange={handleExpirationDateChange}
          />
        </div>
        <button onClick={onSave} >Salvar</button>
      </form>
    </div>
  )
}


export default UpdateBonus
