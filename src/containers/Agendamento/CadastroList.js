import React, {useState,useEffect } from "react";

import api from '../../services/api'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

import { FaCalendar, FaClock } from 'react-icons/fa';
import { BarraMenu } from '../../components/BarraMenu'
import { format } from 'date-fns';
import { Modal, Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


//novo estilo

const StyledContainer = styled.div`
  padding: 24px;
  width: 550px;
  margin-left:50px;
  min-height: 100vh;

`;
export const Content = styled.div`
display: flex;
max-width: 100vw;
`

const Title = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const StyledList = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledListItem = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin-bottom: 8px;
`;

const ListItemText = styled(Typography)`
  flex-grow: 1;
  
`;

const StyledButton = styled(Button)`
  margin-left: 16px;
  
`;

const FormContainer = styled.div`
  margin-top: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
  },
}));
//DEUCERTO ESSE ABAIXO-só lista

// const ListaDataHora = () => {
//   const [dataHoraList, setDataHoraList] = useState([]);
//   const [cnpj, setCnpj] = useState('');

//   useEffect(() => {
//     // Função assíncrona para obter as datas e horas cadastradas
//     const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//     const idHemo = userData && userData.data.cnpj;
//     const fetchDataHoraList = async () => {
//       try {
//         const response = await api.get(`/date/getallhemo/${idHemo}`); // Faça a requisição para obter a lista de datas e horas
        
//         setDataHoraList(response.data.hours); // Armazene a lista de datas e horas no estado do componente
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchDataHoraList(); // Chame a função para buscar as datas e horas cadastradas
//   }, [cnpj]);


//   return (
//     <div>
//       <h2>Lista de Datas e Horas Cadastradas:</h2>
//       <br />
//       {dataHoraList.length > 0 ? (
//         <ul>
//           {dataHoraList.map((dataHora, index) => (
//             <li key={index}>
//               Data: {dataHora.date}, Hora: {dataHora.hour}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Não há datas e horas cadastradas.</p>
//       )}
//     </div>
//   );
// };

// export default ListaDataHora;

//teste-lista e
const ListaDataHora = () => {
  const [dataHoraList, setDataHoraList] = useState([]);
  const [editDataHora, setEditDataHora] = useState(null);
  const [cnpj, setCnpj] = useState('');

 

  const classes = useStyles();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
    const idHemo = userData && userData.data.cnpj;
    const fetchDataHoraList = async () => {
      try {
        const response = await api.get(`/date/getallhemo/${idHemo}`);
        setDataHoraList(response.data.hours);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataHoraList();
  }, [cnpj]);

  const handleCancelEdit = () => {
    setEditDataHora(null);
  }

  // const handleDelete = async (id) => {
  //   try {
  //     await api.patch(`/date/deletedate/${id}`);
  //     setDataHoraList(dataHoraList.filter((dataHora) => dataHora.id !== id));
  //     toast.success("Data excluída com sucesso!");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Ocorreu um erro ao excluir a data.");
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await api.patch(`/date/deletedate/${id}`);
      setDataHoraList(dataHoraList.filter((dataHora) => dataHora.id !== id));
      toast.success("Data excluída com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao excluir a data.");
    }
  };
  
  const handleEditDataHora = (id) => {
    const dataHoraToEdit = dataHoraList.find(dataHora => dataHora.id === id);
    setEditDataHora({
      id: dataHoraToEdit.id,
      date: dataHoraToEdit.date,
      hour: dataHoraToEdit.hour
    });
  };
  

  const handleUpdateDataHora = async (event) => {
    event.preventDefault();
  
    try {
      const response = await api.patch('/date/update', {
        id: editDataHora.id,
        date: editDataHora.date,
        hour: editDataHora.hour
      });
      toast.success('Alteração feita com sucesso!', { position: toast.POSITION.TOP_RIGHT });
  
      console.log(response.data);
  
      const updatedDataHoraList = dataHoraList.map(dataHora => {
        if (dataHora.id === editDataHora.id) {
          return { ...dataHora, date: editDataHora.date, hour: editDataHora.hour };
        }
        return dataHora;
      });
  
      setDataHoraList(updatedDataHoraList);
      setEditDataHora(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Antes de mapear a lista, ordene-a com base na data e hora (do mais recente para o mais antigo)
  const sortedDataHoraList = [...dataHoraList].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.hour}`);
    const dateB = new Date(`${b.date} ${b.hour}`);
    return dateB - dateA;
  });
  
  return (
    <Content>
      <BarraMenu />
      <StyledContainer>
        <Title>Lista de Datas e Horas Cadastradas:</Title>
        <br />
        {sortedDataHoraList.length > 0 ? (
          <StyledList>
          {sortedDataHoraList.map((dataHora, index) => (
            <StyledListItem key={index}>
              <ListItemText>
                <FaCalendar /> {dataHora.date} <FaClock /> {dataHora.hour}
              </ListItemText>
              <StyledButton onClick={() => handleEditDataHora(dataHora.id)} style={{ color: '#00092C', alignItems: 'center' }}>Editar</StyledButton>
              <StyledButton onClick={() => handleDelete(dataHora.id)}> <DeleteIcon /></StyledButton>
            </StyledListItem>
          ))}
        </StyledList>
        ) : (
          <Typography variant="body1">Não há datas e horas cadastradas.</Typography>
        )}
    
        {/* {editDataHora && (
          <FormContainer>
            <Form onSubmit={handleUpdateDataHora}>
              <Label>
                Data:
                <StyledTextField
                  label="Data"
                  type="date"
                  value={editDataHora.date}
                  onChange={(event) => setEditDataHora({ ...editDataHora, date: event.target.value })}
                />
              </Label>
              <br />
              <Label>
                Hora:
                <StyledTextField
                  label="Hora"
                  type="time"
                  value={editDataHora.hour}
                  onChange={(event) => setEditDataHora({ ...editDataHora, hour: event.target.value })}
                />
              </Label>
              <br />
              <Button variant="contained" color="primary" type="submit">
                Salvar
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            </Form>
          </FormContainer>
        )} */}
         {editDataHora && (
        <Modal
          open={Boolean(editDataHora)}
          onClose={handleCancelEdit}
          className={classes.modal}
          aria-labelledby="edit-modal-title"
          aria-describedby="edit-modal-description"
        >
          <Paper className={classes.paper}>
            <Typography variant="h6" id="edit-modal-title">
              Editar Data e Hora
            </Typography>
            <form onSubmit={handleUpdateDataHora}>
              <TextField
                label="Data"
                type="date"
                value={editDataHora.date}
                onChange={(event) => setEditDataHora({ ...editDataHora, date: event.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Hora"
                type="time"
                value={editDataHora.hour}
                onChange={(event) => setEditDataHora({ ...editDataHora, hour: event.target.value })}
                fullWidth
                margin="normal"
              />
              <Button style={{background:'#00092C'}} variant="contained" color="primary" type="submit">
                Salvar
              </Button>
              <Button style={{background: '#FF5F00', marginLeft:'12px'}} variant="contained" color="secondary" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            </form>
          </Paper>
        </Modal>
      )}
      </StyledContainer>
    </Content>
  );
  
};


    // <Container>
    //   <Title>Lista de Datas e Horas Cadastradas:</Title>
    //   <br />
    //   {dataHoraList.length > 0 ? (
    //     <List>
    //       {dataHoraList.map((dataHora, index) => (
    //         <ListItem key={index}>
    //           Data: {dataHora.date}, Hora: {dataHora.hour}
    //           <Button onClick={() => handleEditDataHora(dataHora.id)}>Editar</Button>

    //           <StyledButton onClick={() => handleDelete(dataHora.id)}>Excluir</StyledButton>
    //         </ListItem>
    //       ))}
    //     </List>
    //   ) : (
    //     <p>Não há datas e horas cadastradas.</p>
    //   )}

    //   {editDataHora && (
    //     <Form onSubmit={handleUpdateDataHora}>
    //       <Label>
    //         Data:
    //         <Input
    //           type="date"
    //           value={editDataHora.date}
    //           onChange={(event) => setEditDataHora({ ...editDataHora, date: event.target.value })}
    //         />
    //       </Label>
    //       <br />
    //       <Label>
    //         Hora:
    //         <Input
    //           type="time"
    //           value={editDataHora.hour}
    //           onChange={(event) => setEditDataHora({ ...editDataHora, hour: event.target.value })}
    //         />
    //       </Label>
    //       <br />
    //       <Button type="submit">Salvar</Button>
    //       <Button onClick={handleCancelEdit}>Cancelar</Button>
    //     </Form>
    //   )}
    // </Container>
  //);
//};

export default ListaDataHora;



// const ListaDatas = () => {
//   const [idHemo, setIdHemocentro] = useState("");
//   const [datas, setDatas] = useState([]);
//   const [dates, setDates] = useState([]);
//   const [editDate, setEditDate] = useState(null); // Adiciona o estado para o editDate
//   const [editedDate, setEditedDate] = useState("");
//   const [editedHour, setEditedHour] = useState("");

//   const handleSearch = async () => {
//     try {
//       const response = await api.get('/date/getallhemo', {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
//         }
//       });
      
//       console.log(response.data);
//       setDates(response.data.hours);
//       // console.log(response.data.hours)// armazena o array de horas em "dates"
//     } catch (error) {
//       console.error(error);
//       toast.error("Ocorreu um erro ao buscar os dados.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.patch(`/date/deletedate/${id}`);
//       setDates(dates.filter((date) => date.id !== id));
//       toast.success("Data excluída com sucesso!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Ocorreu um erro ao excluir a data.");
//     }
//   }

//   const handleEdit = async () => {
//     try {
//       await api.patch('/date/update', {
//         id: editDate,
//         date: editedDate,
//         hour: editedHour
//       });
//       setEditDate(null);
//       setEditedDate("");
//       setEditedHour("");
//       toast.success("Data editada com sucesso!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Ocorreu um erro ao editar a data.");
//     }
//   }

//   return (
//     <div>
//       {/* <input type="text" value={idHemo} onChange={(e) => setIdHemocentro(e.target.value)} /> */}
      
//       <button onClick={handleSearch}>Pesquisar</button>
//       <ul>
//         {dates.filter((item) => item.filed === 0).map((item) => (
//           <li key={item.id}>
//             {editDate === item.id ? (
//               <div>
//                 <p>data</p>
//                 <input
//                   type="time"
//                   value={editedDate}
//                   onChange={(e) => setEditedDate(e.target.value)}
//                 />
//                 <p>hora</p>
//                 <input
//                   type="date"
//                   value={editedHour}
//                   onChange={(e) => setEditedHour(e.target.value)}
//                 />
//                 <button onClick={handleEdit}>Salvar</button>
//                 <button onClick={() => setEditDate(null)}>Cancelar</button>
//               </div>
//             ) : (
//               <div>
//                 <p>Data: {item.date}</p>
//                 <p>Hora: {item.hour}</p>
//                 <p>ID do Hemocentro: {item.idHemo}</p>
//                 <p>Filed: {item.filed}</p>
//                 <button onClick={() => setEditDate(item.id)}>Editar</button>
//                 <button onClick={() => handleDelete(item.id)}>Excluir</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListaDatas;
