import React from 'react'
import { ButtonC } from '../ButtonElement'
import icon from '../../Images/undraw_Online_learning_re_qw08.svg'
import {InfoContainer , Infowrapper, InfoRow ,Column1 , Column2, TextWrapper , TopLine ,Heading ,Subtitle , Img ,ImgWrap , BtnWrap } from './infoElements'

function InfoSection({lightBg, id , imgStart ,topLine, headline,lightText,
description , darkText, buttonLabel, img , alt , primary, dark,dark2}) {
    return (
        <>
        <InfoContainer lightBg = {lightBg} id ={id}>
         <Infowrapper>
             <InfoRow imgStart={imgStart} >
                 <Column1>
                 <TextWrapper>
                     <TopLine>{topLine}</TopLine>
                     <Heading lightText={lightText}>{headline}</Heading>
                     <Subtitle  darkText={darkText} >{description}</Subtitle>
                     <BtnWrap>
                         <ButtonC to='home'
                         smooth={true}
                         duration={500}
                         spy={true}
                         exact='true'
                         offset={-80}
                         primary={primary ? 1 : 0}
                         dark = {dark ? 1 : 0}
                         dark2 ={dark2 ? 1 : 0}
                         > {buttonLabel} </ButtonC>
                     </BtnWrap>
                 </TextWrapper>
                 </Column1>
                 <Column2>
                 <ImgWrap>
                 <Img src={img} alt={alt} />
                 </ImgWrap>
                 </Column2>
             </InfoRow>
         </Infowrapper>
        </InfoContainer>
            
        </>
    )
}

export default InfoSection
