import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { BarraMenu } from '../../components/BarraMenu'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Not from "../../image/notfound.svg"

// function Finalizado() {
//     const [schedules, setSchedules] = useState([]);
//     const [bonuses, setBonuses] = useState([]);
//     const [selectedBonus, setSelectedBonus] = useState('');
//     const [selectedSchedule, setSelectedSchedule] = useState(null);

//     useEffect(() => {
//         const obterSchedules = async () => {
//             try {
//                 const response = await api.get('/schedules/getScheduleHemo');
//                 const data = response.data;

//                 const schedulesFiltrados = data.schedules.filter(schedule => schedule.situation === 4 && schedule.cpf);

//                 console.log('obterschedules:', schedulesFiltrados);
//                 setSchedules(schedulesFiltrados);
//                 console.log('situation:', schedulesFiltrados);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         obterSchedules();
//     }, []);

//     useEffect(() => {
//         const obterBonuses = async () => {
//             try {
//                 const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//                 const idHemo = userData && userData.data.cnpj;

//                 const response = await api.get(`/bonus/all/${idHemo}`);
//                 const data = response.data.bonus;

//                 console.log('-> esse é o bonus', data);
//                 setBonuses(data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         obterBonuses();
//     }, []);

//     const atribuirBonus = async () => {
//         try {
//             if (!selectedSchedule) {
//                 console.log('Nenhum usuário selecionado.');
//                 return;
//             }

//             const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//             const idHemo = userData && userData.data.cnpj;

//             const params = {
//                 id_user: selectedSchedule.cpf,
//                 id_hemo: idHemo,
//                 id_bonus: selectedBonus
//             };

//             await api.post('/assignedbonus/add', params);
//             console.log('Bônus atribuído com sucesso!');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSelectChange = event => {
//         setSelectedBonus(event.target.value);
//     };

//     const handleScheduleClick = schedule => {
//         setSelectedSchedule(schedule);
//     };

//     return (
//         <div>
//             <h1>FINALIZADOS:</h1>
//             <ul>
//                 {schedules.map(schedule => (
//                     <li key={schedule.cpf} onClick={() => handleScheduleClick(schedule)}>{schedule.name}</li>
//                 ))}
//             </ul>
//             {selectedSchedule && (
//                 <div>
//                     <p>Usuário selecionado: {selectedSchedule.name}</p>
//                     <select onChange={handleSelectChange} value={selectedBonus}>
//                         <option value="">Selecione um bônus</option>
//                         {bonuses.map((bonus, index) => (
//                             <option key={index} value={bonus.id_bonus}>Estabelecimento: {bonus.name_establishment} Valor: {bonus.value}</option>
//                         ))}
//                     </select>
//                     <button onClick={atribuirBonus}>Adicionar bônus</button>
//                 </div>
//             )}
//         </div>
//     );
// }


import styled from 'styled-components';


const Container = styled.div`
  max-width: 800px;
  margin-left: 156px;
  padding: 20px;


  h1 {
    font-size: 24px;
    margin-bottom: 56px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        box-sizing: border-box;
        text-align: center;
        width: 919px;
        height: 94px;
        left: 405px;
       
        margin-bottom: 21px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 9, 44, 0.5);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(2px);
        /* Note: backdrop-filter has minimal browser support */

        border-radius: 5px;

      &:hover {
        background-color: #E9ECEF;
      }
    }
  }

  p {
    margin-bottom: 16px;
    padding: 37px 0px 37px 0px;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;

    color: #00092C;
  }

  select {
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
  }

  button {
    padding: 8px 16px;
    margin: 0px 32px 0px 29px;
    border-radius: 4px;
    background-color: #00092C;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #00092C;
    }
  }
`
export const Content = styled.div`
    display: flex;
    max-width: 100vw;
    height: 120vh;
`
export const ButtonAbre = styled.button`
position: absolute;
width: 162px;
height: 42px;
left: 701px;
top: 27px;

background: #FF5F00  !important;
border-radius: 10px;

`
export const DivSit = styled.div`
position: absolute;
width: 226px;
height: 55px;
background: rgba(0, 9, 44, 0.94);
border-radius: 4px 9px 20px 0px;
color: #fff;
font-weight: 700;
font-size: 20px;
padding: 15px 5px 15px 5px;
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
 

background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 14px;
  p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 14px;
    /* or 70% */

    text-align: center;
    padding: 0px 0px 0px 0px;
    color: #00092C;
  }
`;

const CloseButton = styled.button`
    margin: 0px 32px 0px 29px;
`;


// function Finalizado() {
//     const [schedules, setSchedules] = useState([]);
//     const [bonuses, setBonuses] = useState([]);
//     const [selectedBonus, setSelectedBonus] = useState('');
//     const [selectedSchedule, setSelectedSchedule] = useState(null);

//     useEffect(() => {
//         const obterSchedules = async () => {
//             try {
//                 const response = await api.get('/schedules/getScheduleHemo');
//                 const data = response.data;

//                 const schedulesFiltrados = data.schedules.filter(
//                     (schedule) => schedule.situation === 4 && schedule.cpf
//                 );

//                 console.log('obterschedules:', schedulesFiltrados);
//                 setSchedules(schedulesFiltrados);
//                 console.log('situation:', schedulesFiltrados);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         obterSchedules();
//     }, []);

//     useEffect(() => {
//         const obterBonuses = async () => {
//             try {
//                 const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//                 const idHemo = userData && userData.data.cnpj;

//                 const response = await api.get(`/bonus/all/${idHemo}`);
//                 const data = response.data.bonus;

//                 console.log('-> esse é o bonus', data);
//                 setBonuses(data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         obterBonuses();
//     }, []);

//     const atribuirBonus = async () => {
//         try {
//             if (!selectedSchedule) {
//                 console.log('Nenhum usuário selecionado.');
//                 return;
//             }

//             const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
//             const idHemo = userData && userData.data.cnpj;

//             const params = {
//                 id_user: selectedSchedule.cpf,
//                 id_hemo: idHemo,
//                 id_bonus: selectedBonus,
//             };

//             await api.post('/assignedbonus/add', params);
//             console.log('Bônus atribuído com sucesso!');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSelectChange = (event) => {
//         setSelectedBonus(event.target.value);
//     };

//     const handleScheduleClick = (schedule) => {
//         setSelectedSchedule(schedule);
//     };

//     return (
//         <Content>
//             <BarraMenu />
//             <Container>
//                 <h1>FINALIZADOS:</h1>
//                 <ul>
//                     {schedules.map((schedule) => (
//                         <li
//                             key={schedule.cpf}
//                         >
//                             <ButtonAbre onClick={() => handleScheduleClick(schedule)}>Atribuir</ButtonAbre>
//                             <DivSit>Finalizado</DivSit>
//                            <p>{schedule.name}</p> 
//                         </li>
//                     ))}
//                 </ul>
//                 {selectedSchedule && (
//                     <div>
//                         <p>Usuário selecionado: {selectedSchedule.name}</p>
//                         <select onChange={handleSelectChange} value={selectedBonus}>
//                             <option value="">Selecione um bônus</option>
//                             {bonuses.map((bonus, index) => (
//                                 <option
//                                     key={index}
//                                     value={bonus.id_bonus}
//                                 >
//                                     Estabelecimento: {bonus.name_establishment} Valor: {bonus.value}
//                                 </option>
//                             ))}
//                         </select>
//                         <button onClick={atribuirBonus}>Adicionar bônus</button>
//                     </div>
//                 )}
//             </Container>
//         </Content >
//     );
// }



// Componente Modal
const Modal = ({ closeModal, children }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                {children}
            </div>
        </div>
    );
};

function Finalizado() {
    const [schedules, setSchedules] = useState([]);
    const [bonuses, setBonuses] = useState([]);
    const [selectedBonus, setSelectedBonus] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const obterSchedules = async () => {
            try {
                const response = await api.get('/schedules/getScheduleHemo');
                const data = response.data;

                const schedulesFiltrados = data.schedules.filter(
                    (schedule) => schedule.situation === 4 && schedule.cpf
                );

                setSchedules(schedulesFiltrados);
            } catch (error) {
                console.error(error);
            }
        };

        obterSchedules();
    }, []);

    useEffect(() => {
        const obterBonuses = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
                const idHemo = userData && userData.data.cnpj;

                const response = await api.get(`/bonus/all/${idHemo}`);
                const data = response.data.bonus;

                setBonuses(data);
            } catch (error) {
                console.error(error);
            }
        };

        obterBonuses();
    }, []);

    const atribuirBonus = async () => {
        try {
            if (!selectedSchedule) {
                console.log('Nenhum usuário selecionado.');
                return;
            }

            const userData = JSON.parse(localStorage.getItem('hemocentro:userData'));
            const idHemo = userData && userData.data.cnpj;

            const params = {
                id_user: selectedSchedule.cpf,
                id_hemo: idHemo,
                id_bonus: selectedBonus,
            };

            await api.post('/assignedbonus/add', params);
            console.log('Bônus atribuído com sucesso!');
            toast.success('Bônus atribuido!', { position: toast.POSITION.TOP_RIGHT });
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectChange = (event) => {
        setSelectedBonus(event.target.value);
    };

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // return (
    //     <Content>
    //         <BarraMenu />
    //         <Container>
    //             <h1>Atribuir Bonus:</h1>

    //             <ul>
    //                 {schedules.map((schedule) => (
    //                     <li key={schedule.cpf}>
    //                         <ButtonAbre onClick={() => handleScheduleClick(schedule)}>Atribuir</ButtonAbre>
    //                         <DivSit>Finalizado</DivSit>
    //                         <p>{schedule.name}</p>
    //                     </li>
    //                 ))}
    //             </ul>
    //             {selectedSchedule && isModalOpen && (
    //                 <ModalWrapper >
    //                     <ModalContent>
    //                         <p>USUÁRIO SELECIONADO :</p> 
    //                         <p>{selectedSchedule.name}</p>
    //                         <select onChange={handleSelectChange} value={selectedBonus}>
    //                             <option value="">Selecione um bônus</option>
    //                             {bonuses.map((bonus, index) => (
    //                                 <option key={index} value={bonus.id_bonus}>
    //                                     Estabelecimento: {bonus.name_establishment} Valor: {bonus.value}
    //                                 </option>

    //                             ))}
    //                         </select>
    //                         <CloseButton onClick={closeModal}>Fechar</CloseButton>
    //                         <button onClick={atribuirBonus}>Adicionar bônus</button>


    //                     </ModalContent>

    //                 </ModalWrapper>
    //             )}
    //         </Container>
    //     </Content>
    // );

    return (
        <Content>
            <BarraMenu />
            <Container>
                <h1>Atribuir Bônus</h1>
                {schedules.length === 0 ? (
                    <div>
                        <p style={{animation: 'shake 0.3s alternate infinite',color:'purple',position:'relative',top:'-50px'}}>Nenhum agendamento encontrado 🫤</p>
                        <img style={{width:'560px', marginTop:'10px'}} src={Not} alt="Mulher de Negócios" />
                        
                    </div>
                ) : (
                    <ul>
                        {schedules.map((schedule) => (
                            <li key={schedule.cpf}>
                                <ButtonAbre onClick={() => handleScheduleClick(schedule)}>Atribuir</ButtonAbre>
                                <DivSit>Finalizado</DivSit>
                                <p>{schedule.name}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {selectedSchedule && isModalOpen && (
                    <ModalWrapper>
                        <ModalContent>
                            <p>USUÁRIO SELECIONADO:</p>
                            <p>{selectedSchedule.name}</p>
                            <select onChange={handleSelectChange} value={selectedBonus}>
                                <option value="">Selecione um bônus</option>
                                {bonuses.map((bonus, index) => (
                                    <option key={index} value={bonus.id_bonus}>
                                        Estabelecimento: {bonus.name_establishment} Valor: {bonus.value}
                                    </option>
                                ))}
                            </select>
                            <CloseButton onClick={closeModal}>Fechar</CloseButton>
                            <button onClick={atribuirBonus}>Adicionar bônus</button>
                        </ModalContent>
                    </ModalWrapper>
                )}
            </Container>
        </Content>
    );

}

export default Finalizado;



