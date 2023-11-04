import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styled from "styled-components";
import { BarraMenu } from '../../components/BarraMenu'
import { toast } from 'react-toastify';
import PersonIcon from '@mui/icons-material/Person';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export const Content = styled.div`
display: flex;
max-width: 100vw;
`

export const Container = styled.div`

background:#E9EFEF ;
min-height: 100vh;
display: flex;
flex-direction: column;
width: 80vw;
`

export const SituationUser = styled.div`

    position: relative;
    width: 215px;
    height: 45px;
    left: -15px;
    top: -15px;
    
    display: flex;
    justify-content: center;
    align-items: center;
 
    background: rgba(0, 9, 44, 0.94);
    border-radius: 10px 9px 20px 0px;

   

`
export const TextSituation = styled.p`
    position: relative;
    font-family: 'Quicksand';
    font-weight: 900;
    font-size: 18px;
    color: #FFFFFF;
    position: absolute;
    top: 32%;
   

`
const Title = styled.h2`

margin-left: 22px;
margin-top: 60px;
`
const IconWrapper = styled.a`
   
   position: absolute;
    top: -5px;
    left: 195px;
    cursor: pointer;
    &:hover {
    color: #F05100;
   
}
`
const ScheduleItem = styled.li`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 8px;
  width: 1000px;
  margin-bottom: 16px;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-left: 55px;
  margin-top: 55px;
  text-align: center;
align-items: center;

`;
const ScheduleNome = styled.p`

    position: relative;
    color: rgba(0, 9, 44, 0.94);
    left: 28%;
    transform: translateX(-50%);
`
const ScheduleButton = styled.button`
  border: none;
  background-color: #FF5F00;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  width: 150px;
  position: absolute;
  right: 15px; 
  

  &:hover {
    background-color: #F07F00;
  }
`;

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

// function ScheduleList() {
//     const [schedules, setSchedules] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [AbreModal, setAbreModal] = useState(false);
//     const [selectedSchedule, setSelectedSchedule] = useState({});
//     const [selectedSituation, setSelectedSituation] = useState("");
//     // const [cnpj, setCnpj] = useState('');
//     const location = useLocation();
//     // const { cnpj } = location.state;

//     // const fetchData = async () => {
//     //     try {
//     //       const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//     //       const idHemo = userData && userData.data.cnpj;

//     //       const response = await api.get(`/bonus/all/${idHemo}`);
//     //       setBonusList(response.data.bonus);
//     //     } catch (error) {
//     //       console.error('Erro ao buscar a lista de bônus:', error);
//     //     }
//     // }

//     // useEffect(() => {
//     //     fetchData();
//     // }, [cnpj]);

//     useEffect(() => {
//         async function fetchSchedules() {
//             try {
//                 const response = await api.get("/schedules/getScheduleHemo");
//                 const allSchedules = response.data.schedules;
//                 // const filteredSchedules = allSchedules.filter(
//                 //   (schedule) => schedule.cnpj === cnpj
//                 // );
//                 // console.log(allSchedules)
//                 setSchedules(allSchedules);
//             } catch (error) {
//                 console.log(error);
//             }
//         }

//         fetchSchedules();
//     }, []);

//     async function handleChangeSituation() {
//         try {
//             const response = await api.post("schedules/insertsituation", {
//                 situation: selectedSituation,
//                 id_user: selectedSchedule.cpf,
//                 id_date: selectedSchedule.id_date,
//             });
//             toast.success("Situação incluída com com sucesso!");

//             // Atualiza o estado dos agendamentos
//             setSchedules((prevSchedules) =>
//                 prevSchedules.map((schedule) => {
//                     if (schedule.id_hemo === selectedSchedule.id_hemo) {
//                         return { ...schedule, situation: selectedSituation };
//                     } else {
//                         return schedule;
//                     }
//                 })
//             );

//             // Fecha o modal
//             setShowModal(false);
//             setAbreModal(false)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     function handleOpenModal(schedule) {
//         setSelectedSchedule(schedule);
//         setShowModal(true);
//     }

//     function handleCloseModal() {
//         setShowModal(false);
//     }
//     function handleViewModal(schedule) {
//         setSelectedSchedule(schedule);
//         setAbreModal(true);
//     }

//     function handleViewModalClose() {
//         setAbreModal(false);
//     }


//     return (
//         <Content>
//             <BarraMenu />
//             <Container>
//                 <Title>Acompanhar doadores</Title>
//                 <ul>
//                     {Array.isArray(schedules) && schedules.length > 0 ? (
//                         schedules.map((schedule) => (
//                             <ScheduleItem key={schedule.cpf}>
//                                 <SituationUser>
//                                     <TextSituation> {schedule.situacao_text}</TextSituation>
//                                 </SituationUser>
//                                 <ScheduleNome>
//                                     {schedule.name}
//                                     <IconWrapper onClick={() => handleViewModal(schedule)}>
//                                         <InfoIcon />
//                                     </IconWrapper>

//                                 </ScheduleNome>

//                                 {/* <SituationUser>
//                                     <p> {schedule.situacao_text}</p>
//                                 </SituationUser> */}
//                                 <ScheduleButton onClick={() => handleOpenModal(schedule)}>
//                                     Mudar situação
//                                 </ScheduleButton>
//                             </ScheduleItem>
//                         ))
//                     ) : (
//                         <p>Nenhum agendamento encontrado.</p>
//                     )}
//                 </ul>
//             </Container>

//             {showModal && (
//                 <Modal>
//                     <ModalContent>
//                         <h3>Alterar situação do agendamento</h3>
//                         <p>Nome: {selectedSchedule.name}</p>
//                         <p>CPF: {selectedSchedule.cpf}</p>
//                         <p>Situação atual: {selectedSchedule.situacao_text}</p>
//                         <p>Data e hora do agendamento: {selectedSchedule.date_hour}</p>
//                         <p>Data do agendamento: {selectedSchedule.data_agendamento}</p>
//                         <p>Hora do agendamento: {selectedSchedule.hora_agendamento}</p>
//                         <select
//                             value={selectedSituation}
//                             onChange={(e) => setSelectedSituation(e.target.value)}
//                         >
//                             <option value="">Selecione a nova situação</option>
//                             <option value="2">Agendar</option>
//                             <option value="3">Aguardar doador</option>
//                             <option value="4">Finalizar</option>
//                             <option value="5">Cancelar</option>
//                         </select>
//                         <button onClick={handleChangeSituation}>Salvar</button>
//                         <button onClick={handleCloseModal}>Cancelar</button>
//                     </ModalContent>
//                 </Modal>
//             )}
//             {/* modal secundario */}

//             {AbreModal && (
//                 <Modal>
//                     <ModalContent>
//                         <h3>Descrição agendamento</h3>
//                         <p>  {selectedSchedule.name}</p>
//                         <p>CPF: {selectedSchedule.cpf}</p>
//                         <p>Situação atual: {selectedSchedule.situacao_text}</p>
//                         <p>Data e hora {selectedSchedule.date_hour}</p>
//                         <p>Data do agendamento: {selectedSchedule.data_agendamento}</p>
//                         <p>Hora do agendamento: {selectedSchedule.hora_agendamento}</p>

//                         <button onClick={handleViewModalClose}>Fechar</button>
//                     </ModalContent>
//                 </Modal>
//             )}


//         </Content>
//     );
// }

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [AbreModal, setAbreModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState({});
    const [selectedSituation, setSelectedSituation] = useState("");
    const [selectedIdDate, setSelectedIdDate] = useState("");
    const [loading, setLoading] = useState(false);



    const location = useLocation();

    useEffect(() => {
        async function fetchSchedules() {
            try {
                const response = await api.get("/schedules/getScheduleHemo");
                const allSchedules = response.data.schedules;
                console.log('teste', allSchedules);

                // Extrair os valores de id_date
                const idDates = allSchedules.map(schedule => schedule.id_date);
                console.log('id_dates', idDates);

                setSchedules(allSchedules);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSchedules();
    }, []);


    async function handleChangeSituation() {
        setLoading(true);
        try {

            const response = await api.post("schedules/insertsituation", {
                situation: selectedSituation,
                id_user: selectedSchedule.cpf,
                id_date: selectedIdDate,
            });

            await new Promise(resolve => setTimeout(resolve, 2000));

            setLoading(false);
            window.location.reload();
            toast.success("Situação incluída com sucesso!");

            if (selectedSituation === "4") {
                await api.patch(`schedules/finished/${selectedIdDate}`, {
                    finished: 1,
                    id_user: selectedSchedule.cpf,
                });
            }

            setSchedules((prevSchedules) =>
                prevSchedules.map((schedule) => {
                    if (schedule.id_hemo === selectedSchedule.id_hemo) {
                        return { ...schedule, situation: selectedSituation };
                    } else {
                        return schedule;
                    }
                })
            );

            setShowModal(false);
            setAbreModal(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    function handleOpenModal(schedule) {
        setSelectedSchedule(schedule);
        setSelectedIdDate(schedule.id_date);
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    function handleViewModal(schedule) {
        setSelectedSchedule(schedule);
        setAbreModal(true);
    }

    function handleViewModalClose() {
        setAbreModal(false);
    }

    return (
        <Content>
            <BarraMenu />
            <Container>
                <Title>Acompanhar doadores</Title>
                <ul>
                    {Array.isArray(schedules) && schedules.length > 0 ? (
                        schedules.map((schedule) => (
                            <ScheduleItem key={schedule.cpf}>
                                <SituationUser>
                                    <TextSituation> {schedule.situacao_text}</TextSituation>
                                </SituationUser>
                                <ScheduleNome>
                                    {schedule.name}
                                    <IconWrapper onClick={() => handleViewModal(schedule)} style={{marginLeft:'25px'}}>
                                        <InfoIcon />
                                    </IconWrapper>
                                </ScheduleNome>
                                <ScheduleButton onClick={() => handleOpenModal(schedule)}>
                                    Mudar situação
                                </ScheduleButton>
                            </ScheduleItem>
                        ))
                    ) : (
                        <p>Nenhum agendamento encontrado.</p>
                    )}
                </ul>
            </Container>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <h3>Alterar situação do agendamento</h3>
                        <p>Nome: {selectedSchedule.name}</p>
                        <p>CPF: {selectedSchedule.cpf}</p>
                        <p>Situação atual: {selectedSchedule.situacao_text}</p>
                        <p>Data e hora do agendamento: {selectedSchedule.date_hour}</p>
                        <p>Data do agendamento: {selectedSchedule.data_agendamento}</p>
                        <p>Hora do agendamento: {selectedSchedule.hora_agendamento}</p>
                        <select
                            value={selectedSituation}
                            onChange={(e) => setSelectedSituation(e.target.value)}
                        >
                            <option value="">Selecione a nova situação</option>
                            <option value="2">Agendado</option>
                            <option value="3">Aguardando doador</option>
                            <option value="4">Finalizar</option>
                            <option value="5">Cancelar</option>
                        </select>
                        {loading ? (
                            <CircularProgress /> // Exibir o indicador de carregamento durante o salvamento
                        ) : (
                            <Button onClick={handleChangeSituation} variant="contained" color="primary">
                                Salvar
                            </Button>
                        )}
                        <button onClick={handleCloseModal}>Cancelar</button>
                    </ModalContent>
                </Modal>
            )}

            {AbreModal && (
                <Modal>
                    <ModalContent>
                        <h3>Descrição agendamento</h3>
                        <p>{selectedSchedule.name}</p>
                        <p>CPF: {selectedSchedule.cpf}</p>
                        <p>Situação atual: {selectedSchedule.situacao_text}</p>
                        <p>Data e hora: {selectedSchedule.date_hour}</p>
                        <p>Data do agendamento: {selectedSchedule.data_agendamento}</p>
                        <p>Hora do agendamento: {selectedSchedule.hora_agendamento}</p>
                        <button onClick={handleViewModalClose}>Fechar</button>
                    </ModalContent>
                </Modal>
            )}
        </Content>
    );
}

export default ScheduleList


