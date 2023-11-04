

import styled, { css } from 'styled-components';



// const RequiredField = css`
//   border: 1px solid red;
// `;

// const RequiredInput = styled(Input)`
//   ${props => props.isRequired && RequiredField}
// `;



export const Container = styled.div`

flex-direction: column;
padding: 20px;
position: relative;
width: 1012px;
height: 582px;
margin-left: 20px;
margin-top: 70px;


`


export const Content = styled.div`
display: flex;
max-width: 100vw;
min-height: 100vh;

`

export const Input = styled.input`
position: absolute;
top: 70px;
width: 650px;
height: 50px;
left: 110px;
padding-left: 25px;
background: rgba(0, 9, 44, 0.08);
border-radius: 8px;
border:${props => (props.error ? '2px solid #CC1717' : 'none')};

`
export const Endereco = styled.input`
position: absolute;
left: 10.51%;
right: 32.91%;
top: 37.78%;
bottom: 54.07%;
padding-left: 20px;
background: rgba(0, 9, 44, 0.08);
border-radius: 8px;
border:${props => (props.error ? '2px solid #CC1717' : 'none')};

`

export const CNPJ = styled.input`
position: absolute;
top: 330px;
left: 110px;
width: 300px;
height: 50px;
padding-left: 20px;
background: rgba(0, 9, 44, 0.08);
border-radius: 8px;
border:${props => (props.error ? '2px solid #CC1717' : 'none')};

`
export const Valor = styled.input`
position: absolute;
top: 330px;
left: 450px;
width: 300px;
height: 50px;
padding-left: 20px;
padding-left: 20px;

background: rgba(0, 9, 44, 0.08);
border-radius: 8px;
border:${props => (props.error ? '2px solid #CC1717' : 'none')};

`
export const Palavra = styled.input`
position: absolute;
top: 390px;
left: 110px;
width: 300px;
height: 50px;
padding-left: 20px;

background: rgba(0, 9, 44, 0.08);
border-radius: 8px;
border:${props => (props.error ? '2px solid #CC1717' : 'none')};

`
export const Data = styled.input`
position: absolute;
top: 390px;
left: 450px;
width: 300px;
height: 50px;
padding-left: 20px;
padding-left: 20px;
padding-right: 20px;
background: rgba(0, 9, 44, 0.08);
border-radius: 8px;
border:${props => (props.error ? '2px solid #CC1717' : 'none')};

`
export const Botao = styled.button`
position: absolute;
width: 257px;
height: 41px;

margin-left: 260px;
margin-top: 450px;
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
export const Link = styled.link`
position: absolute;

`
export const Rua = styled.input`
position: absolute;
top: 130px;
width: 490px;
height: 50px;
left: 110px;
padding-left: 25px;
border: none;
background: rgba(0, 9, 44, 0.08);
border-radius: 8px;

`
export const Bairro = styled.input`
position: absolute;
top: 265px;
padding-left: 25px;
height: 50px;
width: 340px;
left: 410px;
border-radius: 8px;
background: rgba(0, 9, 44, 0.08);
border: none;

`
export const Numero = styled.input`
position: absolute;
top: 130px;
left: 610px;
height: 50px;
width: 150px;
border: none;
padding-left: 25px;

background: rgba(0, 9, 44, 0.08);
border-radius: 8px;

`
export const Cep = styled.input`
position: absolute;
top: 265px;
padding-left: 25px;
height: 50px;
width: 259px;
left: 110px;

border-radius: 8px;

background:  rgba(0, 9, 44, 0.08);
border: none;
border-radius: 8px;

`
export const Ponto = styled.input`
position: absolute;
top: 200px;
height: 50px;
width: 645px;
left: 110px;
padding-left: 25px;
background:  rgba(0, 9, 44, 0.08);
border-radius: 8px;
border: none;
border-radius: 8px;

`
