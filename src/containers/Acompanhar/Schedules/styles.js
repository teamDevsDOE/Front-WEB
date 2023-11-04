import styled from "styled-components";


export const Content = styled.div`
display: flex;
max-width: 100vw;
`

export const  Container = styled.div`

background:#EFEFEF ;
min-height: 100vh;
display: flex;
flex-direction: column;
width: 80vw;



`

export const  Button = styled.button`

width: 80px;
height: 35px;
margin-left: 60px;
margin-top: 10px;
background: #FF5F00;
border-radius: 5px;
cursor:pointer;
border: none;
color:white;


`
export const  Menu = styled.div`

display: flex;
gap: 100px;
justify-content: center;
margin: 20px 0px;


`
export const  LinkMenu = styled.a`
color:#323D5D;
cursor: pointer;
/* vericando quando apertar ficar em negrito a situação */
font-weight: ${props=>(props.isActivesituation ? 'bold': '400')};
border-bottom: ${props=>(props.isActivesituation ? '2px solid orange': 'none')};
padding-bottom:6px;


`


