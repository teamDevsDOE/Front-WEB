import styled from "styled-components";


export const  Container = styled.div`

background:#EFEFEF ;
min-height: 100vh;


`
export const  Div = styled.div`

background:red ;
width: 300px;


`
export const  Button = styled.button`

width: 80px;
height: 35px;
margin-left: 60px;
margin-top: 10px;
background: orange;
border-radius: 5px;
cursor:pointer;
border: none;
color: rgba(0, 9, 44, 0.94);


`
export const  Menu = styled.div`

display: flex;
gap: 80px;
justify-content: center;
margin: 20px 0px;


`
export const  LinkMenu = styled.a`
color:#323D5D;
cursor: pointer;
/* vericando quando apertar ficar em negrito a situação */
font-weight: ${props=>(props.isActivesituation ? 'bold': '400')};
border-bottom: ${props=>(props.isActivesituation ? '2px solid orange': 'none')};
padding-bottom:5px;


`

export const  DivS = styled.div`




`
