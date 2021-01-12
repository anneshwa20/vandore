import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import {FooterContainer, FooterLink, FooterLinkItems ,FooterLinkTitle ,
    FooterLinksContainer, FooterLinksWrapper, FooterWrap ,SocialIconLink, 
    SocialIcons, SocialLogo ,SocialMedia ,SocialMediaWrap ,WebsiteRight } from './FooterElements'
function Footer() {
    const toggleHome = () =>{
        scroll.scrollToTop()
    }
    return (
        <FooterContainer>
         <FooterWrap>
             <FooterLinksContainer>
                 <FooterLinksWrapper>
                    {/*  <FooterLinkItems>
                        <FooterLinkTitle> About Us  </FooterLinkTitle>
                        <FooterLink to="/">How It Works </FooterLink>
                        <FooterLink to="/">Testimonials</FooterLink>
                        <FooterLink to="/">Careers</FooterLink>
                        <FooterLink to="/">Investers</FooterLink>
                        <FooterLink to="/">Terms of Services</FooterLink>
                     </FooterLinkItems>
 */}
                    {/*  <FooterLinkItems>
                         <FooterLinkTitle> Contact Us  </FooterLinkTitle>
                         <FooterLink to="/">Contact </FooterLink>
                        <FooterLink to="/">Support</FooterLink>
                        <FooterLink to="/">Destinations</FooterLink>
                        <FooterLink to="/">Sponsorships</FooterLink>
                     </FooterLinkItems> */}
                 </FooterLinksWrapper>

                 <FooterLinksWrapper>
                     {/* <FooterLinkItems>
                        <FooterLinkTitle> Videos  </FooterLinkTitle>
                        <FooterLink to="/">Submit Videos </FooterLink>
                        <FooterLink to="/">Ambassadors</FooterLink>
                        <FooterLink to="/">Agency</FooterLink>
                        <FooterLink to="/">Influencers</FooterLink>
                     </FooterLinkItems> */}

                     <FooterLinkItems>
                         <FooterLinkTitle>Social Media</FooterLinkTitle>
                         <FooterLink to="/">Instagram </FooterLink>
                        <FooterLink to="/">Facebook</FooterLink>
                        <FooterLink to="/">Youtube</FooterLink>
                        <FooterLink to="/">Twitter</FooterLink>
                     </FooterLinkItems>
                 </FooterLinksWrapper>
             </FooterLinksContainer>
             <SocialMedia > 
                 < SocialMediaWrap>
                 <SocialLogo to="/" onClick={toggleHome} > VANDORE </SocialLogo>
                 <WebsiteRight>vandore 2020 All rights are reserved</WebsiteRight>
                 <SocialIcons>
                     <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                          <FaFacebook />
                     </SocialIconLink>
                     <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                          <FaInstagram />
                     </SocialIconLink>
                     <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                          <FaYoutube />
                     </SocialIconLink>
                     <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                          <FaTwitter/>
                     </SocialIconLink>
                 </SocialIcons>
                 </SocialMediaWrap>
             </SocialMedia>
         </FooterWrap>
            
        </FooterContainer>

    )
}

export default Footer
