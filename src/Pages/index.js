import React , {useState} from 'react'
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import {  homeObjFour, homeObjOne, homeObjThree, homeObjTwo, homeObjFive ,homeObjSix, homeObjSeven } from '../components/InfoSection/data';
import Navbar from '../components/Navbar/Index'
import Services from '../components/Services';
import Sidebar from '../components/SidebarLanding/Index'



function Home() {
const [isOpen , setIsOpen ] = useState(false)


const toggle = () =>{
    setIsOpen(!isOpen);
};


    return (
        <div className='landingCss'>
        <div className='desktopLanding'>
       <Sidebar isOpen={isOpen} toggle= {toggle} />
        <Navbar toggle={toggle} />
        <HeroSection  />
        <InfoSection {...homeObjSeven} />
        <InfoSection {...homeObjOne} />
        <InfoSection {...homeObjTwo} />
        <InfoSection {...homeObjThree} />
        <InfoSection {...homeObjFour} />
        <InfoSection {...homeObjFive}/>
        <InfoSection {...homeObjSix} />
       
      

        <Footer /> 
        </div>
  




     
        </div>
    )
}

export default Home
