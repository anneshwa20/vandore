import React from 'react'
import icon1 from '../../Images/undraw_Online_learning_re_qw08.svg'
import icon2 from '../../Images/undraw_off_road_9oae (1).svg'
import icon3 from '../../Images/undraw_Credit_card_re_blml.svg'
import icon4 from '../../Images/undraw_newspaper_k72w (3).svg'
import { ButtonC } from '../ButtonElement'
import {ServicesContainer, ServicesCard , ServicesH1 ,ServicesH2 ,ServicesIcon , ServicesP ,ServicesWrapper, NavBtn,NavBtnLink} from './ServiceElement'

function Services() {
    return (
        <ServicesContainer id="services">
            <ServicesH1>How To Start With Vandore</ServicesH1>
        <ServicesWrapper>
            <ServicesCard>
                <ServicesIcon src={icon1} />
                <ServicesH2>Sign up </ServicesH2>
                <ServicesP>At first you have to sign up to your account with Email and Password.</ServicesP>     
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={icon2} />
                <ServicesH2>Set Up</ServicesH2>
                <ServicesP>Then You have to set up your Profile by changing your Nmae , Address , Phone No. and Profile Photo</ServicesP>     
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={icon3} />
                <ServicesH2>Add Products</ServicesH2>
                <ServicesP>Add Products to your Store with suitable Categories</ServicesP>     
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={icon3} />
                <ServicesH2>Link Your Payment</ServicesH2>
                <ServicesP>Add Products to your Store with suitable Categories</ServicesP>     
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={icon3} />
                <ServicesH2>Start Your Chat Channel </ServicesH2>
                <ServicesP>Add Products to your Store with suitable Categories</ServicesP>     
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={icon3} />
                <ServicesH2>Add Content to Your Feed</ServicesH2>
                <ServicesP>Add Products to your Store with suitable Categories</ServicesP>     
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={icon3} />
                <ServicesH2>Connect Your Social Media </ServicesH2>
                <ServicesP>Add Products to your Store with suitable Categories</ServicesP>     
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={icon3} />
                <ServicesH2> Build A Graceful Gallery</ServicesH2>
                <ServicesP>Add Products to your Store with suitable Categories</ServicesP>     
            </ServicesCard>
           
            
        </ServicesWrapper> 
        <NavBtn>
                   <NavBtnLink to="/signin" > GET STARTED </NavBtnLink>

               </NavBtn>           
        </ServicesContainer >
    )
}

export default Services
