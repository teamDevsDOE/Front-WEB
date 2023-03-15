import styled from "styled-components";

export const  Container = styled.div`

background: red;

`
export const Titulo = styled.h1`



height: 94px;
padding-left: 176px;
padding-top: 30px;
font-family: 'Quicksand';
font-style: normal;
font-weight: 600;
font-size: 36px;
line-height: 45px;

color: #00092C;


`
export const ContainerItens = styled.div`

position: absolute;
width: 759px;
height: 526px;
left: 401px;
top: 150px;

background: rgba(255, 255, 255, 0.74);
box-shadow: 15px 15px 15px 2px rgba(175, 175, 175, 0.19);
border-radius: 38px;




`
export const Error = styled.p`




margin-left: 260px;
font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;

color: #CC1717;



`
export const Input = styled.input`

display: flex;
width: 220px;
height: 30px;
margin-top: 50px;
flex-direction: column;
margin-left: 260px;
background: #F2F2F7;
border-radius: 4px;
border:${props=>(props.error?'2px solid #CC1717':'none')};



`
export const Button = styled.button`

width: 220px;
height: 35px;
margin-left: 260px;
margin-top: 40px;
background: rgba(0, 9, 44, 0.94);
border-radius: 5px;
cursor:pointer;

color: white;

&:hover{
    opacity: 0.8;
}
&:active{
    opacity:0.6
}

`
export const ContainerFundo = styled.div`





`