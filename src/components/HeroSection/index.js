import React , {useState} from 'react'
import  video from'../../Videos/video.mp4'
import {ButtonC} from '../ButtonElement'
import {HeroContainer, Herobg ,Videobg , HeroContent ,Heroh1 ,HeroP, HeroBtnWrapper,NavBtn, NavBtnLink, ArrowForward ,ArrowRight} from './HeroElements'

function HeroSection() {
    const [hover, setHover] =useState(false)

    const onHover =()=>{
        setHover(!hover)
    }
    return (
        <HeroContainer id="home"  >
            <Herobg>
                <Videobg autoPlay loop muted src={video} type='video/mp4'/>
            </Herobg>
            <HeroContent>
                <Heroh1>LET'S DRIVE THE MARKET</Heroh1>
                <HeroP>Start your own e-commerce website accompanied by resourceful tools that help you make sales, manage marketing and engage with customers.</HeroP>
                    <HeroBtnWrapper >
                    <NavBtn>
                   <NavBtnLink to="/signup" > Start Free Trial {hover ? <ArrowForward /> : <ArrowRight />}  </NavBtnLink>

               </NavBtn> 
                    </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer >
    )
}

export default HeroSection
