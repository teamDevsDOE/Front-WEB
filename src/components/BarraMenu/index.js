import React from "react";
import listLinks from './menu-list'
import { Container,ItemContainer,ListLink } from "./styles"
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import Logout from "../../hooks/logout";


export function BarraMenu() {
    return (
        <Container>
            <h2 style={{marginTop:'32px', color:'#fff', marginLeft:'12px'}}>Bem vindo ao HemoTech</h2>
           <hr></hr>
           {listLinks.map(item =>(
           <ItemContainer key={item.id} isActive={true}>
            <item.icon className="icon"/>
            <ListLink to={item.link} >{item.label}</ListLink>
           </ItemContainer>
           
        ))}
        <hr></hr>
        <ItemContainer style={{position:'absolute', bottom: '30px'}} >
            <LogoutSharpIcon style={{ color: '#FFFFFF'}} />
            <ListLink to="/login" onClick={Logout}>Sair</ListLink>
        </ItemContainer>
        </Container>
    )
}


//implentar  <ListLink to="/login" onClick={logout}>Sair</ListLink> e arruam a função do logout 