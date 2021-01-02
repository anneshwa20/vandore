import { Modal, Switch } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { useStateValue } from '../../StateProvider'
import './HandleGuide.scss'
import Guide from '../../icons/undraw_youtube_tutorial_2gn3.svg';
import { db } from '../../firebase';
import Banner from '../../components/GuideHeader/Banner';
import { Menu, PlayArrow } from '@material-ui/icons';

function HandleGuide({id}) {
    const [{guides,hindi_guides,single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
    const [open,setOpen]= useState(false);
    const [currentVideo,setCurrentVideo]= useState('');
    const [hindi,setHindi]= useState(false);
    const [bannerVideo,setBannerVideo]= useState('https://www.youtube.com/embed/084LhrJ6VNY');
    const [bannerTitle,setBannerTitle]= useState('How to Handle Your Guides');
    const [bannerDescription,setBannerDescription]= useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu facilisis sed odio morbi quis commodo odio aenean sed.');
    const [bannerImage,setBannerImage]= useState('https://i.ibb.co/6WFrWKp/i-Phone-X-XS-11-Pro-9.jpg');


    const handleGetStarted= () => {
      db.collection(id.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
          guide: true
      }).then(refreshPage);
  }
  const refreshPage = ()=>{
      window.location.reload();  }


    const manageVideo= (item) => {
      setBannerTitle(item.title);
      setBannerVideo(item.youtube);
      setBannerImage(item.image2);
      setBannerDescription(item.description);
    }
    return (
        <div className='handleGuide'>
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
            {site_preview.guide ?  (
               <>
                <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Guides</h1>
        </div>
              <Banner bannerVideo={bannerVideo} bannerImage={bannerImage} bannerTitle={bannerTitle} bannerDescription={bannerDescription}/>
           <div className='handleGuide__switch'>
            <p>English</p>
           <Switch
                    checked={hindi}
                    onChange={() => setHindi(!hindi)}
                    name="language"
                  />
             <p>Hindi</p>
           </div>
          
             <div className='handleGuide__category'>
              {!hindi && guides.length !== 0 ? guides.map(guide => (
                     <div className='handleGuide__products'>
                        <p>{guide.title}</p>
                        <hr></hr>
                        <div className='handleGuide__row'>
                        {guide.items.map(item =>  (
                        
                      <div className='handleGuide__guide' style={{backgroundImage: `url(${item.image})`,backgroundSize: "contain"}} onClick={() => manageVideo(item)}>
                         
                       <PlayArrow />
                        
                      </div>
                           
                        ))}
                         </div>
                    </div>
               )) : hindi_guides.map(guide => (
                <div className='handleGuide__products'>
                   <p>{guide.title}</p>
                   <hr></hr>
                   <div className='handleGuide__row'>
                   {guide.items.map(item =>  (
                   
                   <div className='handleGuide__guide' style={{backgroundImage: `url(${item.image})`,backgroundSize: "contain"}} onClick={() => manageVideo(item)}>
                         
                   <PlayArrow style={{margin: '90px auto',padding: '5px',width: '30px',height: '30px',backgroundColor: ' rgba(66, 135, 245, 1)',borderRadius: '99px'}}/>
                  
                </div>
                      
                   ))}
                    </div>
               </div>
          ))}
              </div>

    <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
<iframe width="560" height="315" src={currentVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</Modal>
   
               </>
            ) : (
              <div className='site_preview'>
              <div className='site_preview--top'>
              <div className='preview__menu' onClick={() => {
                    dispatch({
                        type: 'UPDATE_SIDEBAR_VANDORE',
                        sidebarVandore: !sidebarVandore
                    })
                }}>
                  {sidebarVandore ? '' : (
                    <Menu style={{color: 'white'}} fontSize='large'/>
                  )}
               </div>
                 <div className='site_preview--topContainer'>
                        <div className='site_preview--topContainer--left'>
                           <h1>Guides</h1>
                           <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
                     
                            <div className='site_preview--getStarted' onClick={handleGetStarted}>
                               Get Started
                            </div>
                        </div>

                        <div className='site_preview--topContainer--right'>
                             <img src={Guide} style={{fill:"#FFFFFF"}} />
                        </div>
                </div>
             </div>
             <div className='guide__learn--more'>
                 Learn More
            </div>
             <div className='site_preview--guide'>
                <div className='site_preview--guide--left'>
                <img src={Guide} style={{fill:"#FFFFFF"}} />
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                </div>
                <div className='site_preview--guide--right'>
                  <iframe src={single_guides.guide} />
                </div>
            </div>
            </div>
            )}

        </div>
    )
}

export default HandleGuide
