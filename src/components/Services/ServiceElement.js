import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const ServicesContainer =styled.div `
height : 900px ;

padding: 20px;
display : flex ;
flex-direction : column ;
justify-content : center ;
align-items : center ;
background #010606 ;

@media screen and ( max-width: 768px){
    height : 1200px;
}

@media screen and (max-width : 480px){
    height : 1400px
}
`

export const ServicesWrapper =styled.div `
max-width : 1000px ;

margin : 0 auto ;
display : grid ;
grid-template-columns : 1fr 1fr 1fr 1fr ;
align-items : center ;
grid-gap : 30px ;
padding: 0 50px ;

@media screen and (max-width : 1000px){
    grid-template-columns :1fr 1fr ;
}

@media screen and (max-width : 768px ){
    grid-template-columns : 1fr ;
    padding : 0 20px ;
}
`
export const ServicesCard = styled.div `
background : #fff ;
display : flex ;
flex-direction : column ;
justify-content : center ;
text-align : center;
align-items : center ;
border-radius : 10px ;
max-height : 340px ;
padding : 30px;
box-shadow : 0 1px 3px rgba(0,0,0,0.2);
transition : all 0.2s ease-in-out ;

&:hover{
    transform : scale(1.02);
    transition : all 0.2s ease-in-out ;
    cursor : pointer ;
}
`
export const ServicesIcon = styled.img `
height : 160px ;
width : 160px ;
margin-bottom : 10px ;
`
export const ServicesH1 = styled.h1 `
font-size : 2.5rem ;
color : #fff ;
margin-bottom : 64px ;

@media and screen (max-width : 480px ){
    font-size : 2rem
}
`
export const ServicesH2 = styled.h2 `
font-size : 1rem ;
margin-bottom : 10px ;
`
export const ServicesP = styled.p `
font-size : 1rem ;
text-align : center ;
`
export const BtnWrap = styled.div `
display : flex ;
justify-content : flex-start ;
`;

export const NavBtn = styled.nav `
display : flex ;
align-items : center ;
padding : 20px;

@media screen and (max-width : 786px) {
    display : none ;
}
`;
export const NavBtnLink = styled(LinkR) `
border-radius : 50px ;
background : #01bf71 ;
white-space : nowrap ;
padding : 10px 22px ;
color : #010606 ;
font-size ; 16px ;
outline : none ;
border: none ;
cursor : pointer; 
transition : all 0.2s ease-in-out ;
text-decoration : none ;

&:hover {
    transition : all 0.2s ease-in-out ;
    background : #fff;
    color : #010606 ;
}
`



