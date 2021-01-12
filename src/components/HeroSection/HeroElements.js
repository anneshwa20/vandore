import styled from 'styled-components'
import {MdKeyboardArrowRight ,MdArrowForward} from 'react-icons/md'
import {Link as LinkR} from 'react-router-dom'

export const HeroContainer = styled.div `
background : #0c0c0c ;
display : flex ;
justify-content : center ;
align-items : center ;
padding : 0 30px ;
height :800px ;
position : relative ;
z-index : 1
/* Add before styles */
:before{
    content: ''
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%) ;
    z-index:2

}
`;

export const Herobg = styled.div `
position : absolute ;
top : 0 ;
right : 0 ;
bottom : 0;
height : 100%;
width : 100% ;
overflow : hidden ;
`

export const Videobg =styled.video `
width : 100%;
height : 100%;
-o-object-fit : cover ;
object-fit : cover ;
background : #232a34
`;
export const HeroContent =styled.div `
z-index : 3;
max-width:1200px;
position:8px 24px;
display:flex;
flex-direction:column;
align-items:center;
`;

export const Heroh1 =styled.h1 `
color :#fff;
font-size:48px;
text-align:center;

@media screen and (max-width : 768px){
    font-size:40px;
}
@media screen and (max-width:480px){
    font-size:32px;
}
`;

export const HeroP = styled.p `
margin-top:24px;
color:#fff;
font-size:24px;
text-align:center;
max-width:600px;

@media screen and (max-width:768px){
    font-size :24px
}

@media screen and (max-width:480px){
    font-size:18px
}
`;
export const HeroBtnWrapper =styled.div `
margin-top:32px;
display:flex;
flex-direction:column;
align-items :center;
`;

export const ArrowForward =styled(MdArrowForward)`
margin-left:8px;
font-size:20px
`;

export const ArrowRight =styled(MdKeyboardArrowRight)`
margin-left:8px;
font-size:20px
`

export const NavBtn = styled.nav `
display : flex ;
align-items : center ;

/* @media screen and (max-width : 786px) {
    display : none ;
} */
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