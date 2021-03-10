import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import {FooterContainer, FooterLink, FooterLinkItems ,FooterLinkTitle ,
    FooterLinksContainer, FooterLinksWrapper, FooterWrap ,SocialIconLink, 
    SocialIcons, SocialLogo ,SocialMedia ,SocialMediaWrap ,WebsiteRight } from './FooterElements'
function Footer() {
    const hrefggleHome = () =>{
        scroll.scrollhrefhrefp()
    }
    return (
        <FooterContainer>
         <FooterWrap>
             <FooterLinksContainer>
                 <FooterLinksWrapper>
                   <FooterLinkItems>
                        <FooterLinkTitle> About Us  </FooterLinkTitle>
                        <FooterLink href="/aboutVandore">About Us </FooterLink>
                        <FooterLink href="/privacy">Privacy Policy</FooterLink>
                        <FooterLink href="/pricing">Pricing</FooterLink>
                        <FooterLink href="/TermsServices">Terms of Services</FooterLink>
                        <FooterLink href="/contact">Contact Us</FooterLink>
                        <FooterLink href="/refund">Refund Policy</FooterLink>
                     </FooterLinkItems>
 
                    {/*  <FooterLinkItems>
                         <FooterLinkTitle> Contact Us  </FooterLinkTitle>
                         <FooterLink href="/">Contact </FooterLink>
                        <FooterLink href="/">Support</FooterLink>
                        <FooterLink href="/">Destinations</FooterLink>
                        <FooterLink href="/">Sponsorships</FooterLink>
                     </FooterLinkItems> */}
                 </FooterLinksWrapper>

                 <FooterLinksWrapper>
                     {/* <FooterLinkItems>
                        <FooterLinkTitle> Videos  </FooterLinkTitle>
                        <FooterLink href="/">Submit Videos </FooterLink>
                        <FooterLink href="/">Ambassadors</FooterLink>
                        <FooterLink href="/">Agency</FooterLink>
                        <FooterLink href="/">Influencers</FooterLink>
                     </FooterLinkItems> */}

                     <FooterLinkItems>
                         <FooterLinkTitle>Social Media</FooterLinkTitle>
                         <FooterLink href="https://www.instagram.com/vandoreofficial/">Instagram </FooterLink>
                        <FooterLink href="https://www.facebook.com/vandoreofficial">Facebook</FooterLink>
                        <FooterLink href="http://www.youtube.com/channel/UCS6adkxv_QM7QDXc5CYpewg">Youtube</FooterLink>
                        <FooterLink href="https://twitter.com/vandoreofficial">Twitter</FooterLink>
                     </FooterLinkItems>
                 </FooterLinksWrapper>
             </FooterLinksContainer>
             <SocialMedia > 
                 < SocialMediaWrap>
                 <SocialLogo href="/" onClick={hrefggleHome} > VANDORE </SocialLogo>
                 <WebsiteRight>vandore 2020 All rights are reserved</WebsiteRight>
                 <SocialIcons>
                     <SocialIconLink href="https://www.facebook.com/vandoreofficial" target="_blank" aria-label="Facebook">
                          <FaFacebook />
                     </SocialIconLink>
                     <SocialIconLink href="https://www.instagram.com/vandoreofficial/" target="_blank" aria-label="Instagram">
                          <FaInstagram />
                     </SocialIconLink>
                     <SocialIconLink href="http://www.youtube.com/channel/UCS6adkxv_QM7QDXc5CYpewg" target="_blank" aria-label="Youtube">
                          <FaYoutube />
                     </SocialIconLink>
                     <SocialIconLink href="https://twitter.com/vandoreofficial" target="_blank" aria-label="Twitter">
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
