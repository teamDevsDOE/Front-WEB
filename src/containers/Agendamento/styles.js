import styled from "styled-components";

export const Content = styled.div`
display: flex;
max-width: 100vw;
min-height: 100vh;
`
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
export const ContainerAgend = styled.div`
position: absolute;
width: 476;
height: 449px;
left: 554px;
top: 109px;



border-radius: 35px;

background: rgba(255, 255, 255, 0.74);
box-shadow: 13px 5px 15px 15px rgba(175, 175, 175, 0.19);
border-radius: 38px;





`
export const ItemContainer = styled.div`




`
export const Title = styled.p`

height: 94px;
padding-bottom: 145px;
position: relative;
font-family: 'Quicksand';
font-style: normal;
font-weight: 600;
font-size: 30px;
line-height: 45px;
margin-bottom: 90px;
top: -88px;

`

export const Entradaone = styled.input`

position: absolute;

width: 248px;
height: 40px;
left: 51px;
top: 88px;
padding-left: 12px;
padding-right: 12px;



background: rgba(0, 9, 44, 0.08);
border-radius: 8px;


`
export const Entradatwo = styled.input`

  
position: absolute;
width: 248px;
height: 40px;
left: 51px;
top: 198px;
padding-left: 12px;
padding-right: 12px;

background: rgba(0, 9, 44, 0.08);
border-radius: 8px;




`
export const Entradasr = styled.input`


position: absolute;
left: 27.51%;
right: 40.15%;
top: 64.36%;
bottom: 27.49%;

background: rgba(0, 9, 44, 0.08);
border-radius: 8px;
border:${props=>(props.error?'2px solid #CC1717':'none')};



`
export const Botao = styled.button`
position: absolute;
width: 187px;
height: 51px;
left:78px;
top: 320px;
cursor: pointer;

background: #00092C;
border-radius: 15px;

color: white;

&:hover{
    opacity: 0.8;
}
&:active{
    opacity:0.6
}


`
export const Entradas =styled.input`

position: absolute;
left: 61.9%;
right: 11.18%;
top: 64.36%;
bottom: 27.49%;

background: rgba(0, 9, 44, 0.08);
border-radius: 8px;


`