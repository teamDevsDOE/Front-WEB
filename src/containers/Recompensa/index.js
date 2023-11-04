import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import {
  Container, Ponto, Content, Input, Endereco, CNPJ, Valor, Palavra, Data, Botao, Rua, Bairro, Numero, Cep
} from './styles'
import { RiEyeLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { BarraMenu } from '../../components/BarraMenu'

function BonusForm() {
  const [requiredFields, setRequiredFields] = useState([]);

  const validateForm = () => {
    const requiredFieldsList = [
      'name_establishment',
      'value',
      'word_key',
      'cnpj',
      'expiration_date',
      'street',
      'district',
      'number_address',
      'cep'
    ];

    const missingFields = requiredFieldsList.filter(
      field => !formData[field]
    );

    setRequiredFields(missingFields);

    return missingFields.length === 0;
  };

  const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
  const idHemo = userData && userData.data.cnpj;


  // const handleSubmit = async event => {
  //   event.preventDefault();

  //   if (validateForm()) {
  //     try {
  //       const addressResponse = await api.post('/address/insert', {
  //         street: formData.street,
  //         district: formData.district,
  //         number_address: formData.number_address,
  //         cep: formData.cep,
  //         point_references: formData.point_references,
  //       });

  //       const bonusFormData = {
  //         name_establishment: formData.name_establishment,
  //         value: formData.value,
  //         word_key: formData.word_key,
  //         fk_id_address: addressResponse.data.idAddress,
  //         cnpj: formData.cnpj,
  //         expiration_date: formData.expiration_date,
  //         fk_hemocentro: idHemo,
  //       };

  //       await api.post('/bonus/add', bonusFormData);

  //       toast.success('Bônus cadastrado com sucesso!');
  //     } catch (error) {
  //       console.error(error);
  //       toast.error('Ocorreu um erro ao cadastrar o bônus');
  //     }
  //   } else {
  //     toast.error('Preencha todos os campos');
  //   }
  // };

  const handleSubmit = async event => {
    event.preventDefault();

    // Conversão da data ISO 8601 para apenas a parte da data
    const formattedExpirationDate = new Date(formData.expiration_date).toISOString().split('T')[0];

    if (validateForm()) {
      try {
        const addressResponse = await api.post('/address/insert', {
          street: formData.street,
          district: formData.district,
          number_address: formData.number_address,
          cep: formData.cep,
          point_references: formData.point_references,
        });

        const bonusFormData = {
          name_establishment: formData.name_establishment,
          value: formData.value,
          word_key: formData.word_key,
          fk_id_address: addressResponse.data.idAddress,
          cnpj: formData.cnpj,
          expiration_date: formattedExpirationDate,
          fk_hemocentro: idHemo,
        };

        await api.post('/bonus/add', bonusFormData);

        toast.success('Bônus cadastrado com sucesso!');
      } catch (error) {
        console.error(error);
        toast.error('Ocorreu um erro ao cadastrar o bônus');
      }
    } else {
      toast.error('Preencha todos os campos');
    }
    console.log(formattedExpirationDate)

  };

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [formData, setFormData] = useState({
    name_establishment: '',
    value: '',
    word_key: '',
    cnpj: '',
    expiration_date: '',
    street: '',
    district: '',
    number_address: '',
    cep: '',
    point_references: '',
  });


  return (
    <Content>
      <BarraMenu />
      <Container>
        <form onSubmit={handleSubmit}>
          <Input
            className="BonusForm-input"
            type="text"
            name="name_establishment"
            value={formData.name_establishment}
            onChange={handleChange}
            placeholder="Nome do estabelecimento:"
            isRequired={requiredFields.includes('name_establishment')}
          />

          <Valor
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="Valor:"
            isRequired={requiredFields.includes('value')}
          />

          <Palavra
            type="text"
            name="word_key"
            value={formData.word_key}
            onChange={handleChange}
            placeholder="Palavra Chave:"
            isRequired={requiredFields.includes('word_key')}
          />

          <CNPJ
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="CNPJ"
            isRequired={requiredFields.includes('cnpj')}
          />

          <Data
            type="date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            placeholder="Data de expiração:"
            isRequired={requiredFields.includes('expiration_date')}
          />

          <Rua
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Rua:"
            isRequired={requiredFields.includes('street')}
          />

          <Bairro
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Bairro:"
            isRequired={requiredFields.includes('district')}
          />

          <Numero
            type="text"
            name="number_address"
            value={formData.number_address}
            onChange={handleChange}
            placeholder="Número:"
            isRequired={requiredFields.includes('number_address')}
          />

          <Cep
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            placeholder="CEP:"
            isRequired={requiredFields.includes('cep')}
          />

          <Ponto
            type="text"
            name="point_references"
            value={formData.point_references}
            onChange={handleChange}
            placeholder="Ponto de referência:"
            isRequired={requiredFields.includes('point_references')}
          />

          <Botao type="submit">Cadastrar bônus</Botao>
        </form>

        <Link
          to="/bonus"
          style={{
            position: 'absolute',
            top: '20px',
            left: '800px',
            textDecoration: 'none',
          }}
        >
          Ver todos os bônus
          <RiEyeLine size={20} style={{ marginLeft: '8px', marginTop: '15px' }} />
        </Link>
      </Container>
    </Content>
  );
}

export default BonusForm
