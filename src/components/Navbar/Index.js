import React , {useState , useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {animateScroll as scroll} from 'react-scroll'
import {Nav , NavbarContainer , NavbarLogo , MobileIcon,NavMenu, NavItems, NavLink , NavBtn , NavBtnLink ,NavBtnLinkSignUp  } from './NavbarElements'

function Navbar({toggle}) {
    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = () => {
        if(window.scrollY >= 80){
            setScrollNav(true)
        }else{
            setScrollNav(false)
        }
    }

    useEffect(()=>{
      window.addEventListener('scroll', changeNav)
    },[])
    const toggleHome = () =>{
        scroll.scrollToTop()
    }
    return (
       <>
       <Nav scrollNav={setScrollNav}>
           <NavbarContainer>
               <NavbarLogo to= "/" onClick={toggleHome}>
                   VANDORE 
               </NavbarLogo>
               <MobileIcon onClick={toggle}>
                   <FaBars />
               </MobileIcon>
               <NavMenu >
                   <NavItems>
                       <NavLink to="about"
                       smooth={true}
                       duration={500}
                       spy={true}
                       exact='true'
                       offset={-80}
                       > About </NavLink>
                   </NavItems>
                   <NavItems>
                       <NavLink to="discover" 
                       smooth={true}
                       duration={500}
                       spy={true}
                       exact='true'
                       offset={-80}> Discover </NavLink>
                   </NavItems>
                   
                   <NavItems>
                   <NavBtnLinkSignUp to="/signup" > Sign Up </NavBtnLinkSignUp>
                   </NavItems> 
               </NavMenu>
               <NavBtn>
                   <NavBtnLink to="/signin" > Sign In </NavBtnLink>

               </NavBtn>
           </NavbarContainer>
       </Nav>
       </>
    )
}

export default Navbar
