import React, { useEffect, useState } from 'react'
import SidebarRestro from '../../components/SidebarRestro/SidebarRestro'
import './HandleSliderTemplate.scss'
import FileUploader from 'react-firebase-file-uploader'
import { db, firebaseApp, firebaseAppMain } from '../../firebase'

import {  Menu } from '@material-ui/icons'

import { Modal } from '@material-ui/core'
import { useStateValue } from '../../StateProvider'

import Slider1 from '../../Templates/Sliders/Slider1/Slider1';
import { ChromePicker } from 'react-color'
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image'
import Slider2 from '../../Templates/Sliders/Slider2/Slider2'
import Slider3 from '../../Templates/Sliders/Slider3/Slider3'
import Post1 from '../../Templates/Posts/Post1/Post1'
import Post2 from '../../Templates/Posts/Post2/Post2'
import Post3 from '../../Templates/Posts/Post3/Post3'


function HandleSliderTemplate(props) {
  const [openAlert,setOpenAlert]= useState(false);
  const [openImage,setOpenImage]= useState(false);
  const [{sidebarVandore},dispatch]= useStateValue();
  const [openColor,setOpenColor]= useState(false);
  const [currentColor,setCurrentColor]= useState('');
  const componentRef = React.createRef();
  const componentMobileRef= React.createRef();

  //Components And Default Values
   const slider1={
       primaryColor: '#df7c2b',
       secondaryColor: '#a82a14',
       headingColor: '#ac2f09',
       subHeadingColor: 'white',
       componentImage: 'https://i.ibb.co/5vKspJ5/bundo-kim-Pb9b-Uz-H1n-D8-unsplash.jpg',
       heading: 'Add Your Headline Here',
       subHeading: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',

   }
   const slider2={
		headingSize:'41px', // for mobile only6
		subHeadingSize:'18px', //for mobile only
		primaryColor: '#462104ef',
		secondaryColor: '#be6a25 ',
		headingColor: '#e69e18',
		subHeadingColor: 'wheat',
		componentImage: 'https://i.ibb.co/nwyyFmt/wesual-click-y7s-Wby3woo-unsplash.jpg',
		heading: 'Add Your Headline Here',
		subHeading: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',
 
  }
  
  const slider3={
		headingSize:'45px', // for mobile only6
		subHeadingSize:'22px', //for mobile only
		primaryColor: '#FFE77AFF',
		secondaryColor: '#2C5F2DFF',
		headingColor: '#2C5F2DFF',
		subHeadingColor: '#063138',
		componentImage: 'https://i.ibb.co/1vrRQL7/rezha-ramadhan-s-V8-M-Lkg60-Y-unsplash.jpg',
		heading: ' your headline here',
		subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
 
	} 

  const post1={
		headingSize:'57px', // for mobile only6
		subHeadingSize:'20px', //for mobile only
		primaryColor: '#e9ca87',
		secondaryColor: ' #632222',
		headingColor: ' #e69d54',
		subHeadingColor: '#632222',
		componentImage: 'https://i.ibb.co/Mnm92gj/adrien-olichon-Zg-REXhl8-ER0-unsplash-1.jpg',
		heading: ' your headline here',
		subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
 
	}
  const post2={
		headingSize:'31px', // for mobile only6
		subHeadingSize:'17px', //for mobile only
		primaryColor: 'white',
		secondaryColor: ' #833821',
		headingColor: ' #471616',
		subHeadingColor: 'brown',
		componentImage: 'https://i.ibb.co/ccj4HjM/laura-peruchi-TOoa-T8-Gz-6-Q-unsplash.jpg',
		heading: ' Add your heading here',
		subHeading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore .',
 
	}
  
  const post3={
		headingSize:'30px', // for mobile only6
		subHeadingSize:'18px', //for mobile only
		primaryColor: '#a0421d',
		secondaryColor: ' #802020',
		headingColor: ' #f7e1e1',
		subHeadingColor: '#fdab68',
		componentImage: 'https://i.ibb.co/dMTZ8ZS/stories-v1r-Uvn-VMMk-M-unsplash.jpg',
		heading: ' Add your heading here',
		subHeading: 'unt ut labore .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
 
	} 

  //editing values
   const [primaryColor,setPrimaryColor]= useState('');
   const [secondaryColor,setSecondaryColor]= useState('');
   const [headingColor,setHeadingColor]= useState('');
   const [subHeadingColor,setSubHeadingColor]= useState('');
   const [componentImage,setComponentImage]= useState('');
   const [heading,setHeading]= useState('');
   const [subHeading,setSubHeading]= useState(''); 


  // --------------------------------


  // Handling Color Modals

  const handleColorModal=(color) => {
    if(color==='primary'){
      setCurrentColor('primary');
      setOpenColor(true);
    }
    else if(color==='secondary') {
      setCurrentColor('secondary');
      setOpenColor(true);
    }
    else if(color === 'heading'){
      setCurrentColor('heading');
      setOpenColor(true);
    }
    else if(color === 'subHeading'){
        setCurrentColor('subHeading');
        setOpenColor(true);
      }
  }

 const handleChangePrimaryColor=(color) => {
     setPrimaryColor(color.hex);
 }
 const handleChangeSecondaryColor=(color) => {
  setSecondaryColor(color.hex);
 }
const handleChangeHeadingColor=(color) => {
  setHeadingColor(color.hex);
 }
 const handleChangeSubHeadingColor=(color) => {
    setSubHeadingColor(color.hex);
   }
  //------------------




  const pageId= props.match.params.id;
  const componentId= props.match.params.component;


  
  const handleUploadStart= () => {
    setOpenImage(true);
}

const handleUploadSuccess= (filename) =>{
  

   firebaseApp.storage().ref('templates').child(filename).getDownloadURL()
   .then(url => setComponentImage(url)).then(() =>setOpenImage(false));
                 
    
   
 };

 

    return (

        <div className='handleCategory'>

       <div className='categoryMobile'>
         {sidebarVandore ? <SidebarRestro id={pageId} active='store' /> : (
 <div className='handleCategory__body'>
   <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
     <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Edit Template</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>EDIT TEMPLATE</h1>
        </div>
   
        {componentId==='slider1' ? (
             <>
            
              {() => {
                   setPrimaryColor(slider1.primaryColor);
                   setSecondaryColor(slider1.secondaryColor);
                   setHeadingColor(slider1.headingColor);
                   setSubHeadingColor(slider1.subHeadingColor);
                   setComponentImage(slider1.componentImage);
                   setHeading(slider1.heading);
                   setSubHeading(slider1.subHeading);
              }}
             <div className='templateEditor'>
                <div className='componentHolderMobile' ref={componentMobileRef}>
                         <Slider1 
                         headingSize='25px'
                         subHeadingSize='12px'
                         primaryColor={primaryColor} 
                         secondaryColor={secondaryColor} 
                         headingColor={headingColor} 
                         subHeadingColor={subHeadingColor} 
                         componentImage={componentImage}
                         heading={heading}
                         subHeading={subHeading}
                         />
                </div>   


                <div className='handleStore__add' style={{justifyContent:'center'}}>
           <label style={{backgroundColor: `green`, color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
                     Select Your Photo
                     <FileUploader
                       hidden
                       accept="image/*"
                       randomizeFilename
                       name="image"
                       storageRef={firebaseApp.storage().ref("templates")}
                       onUploadStart={handleUploadStart}
                       onUploadSuccess={handleUploadSuccess}
                      />
                      </label>
           </div>

             <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Heading' value={heading} onChange={e => setHeading(e.target.value)} />
            </div>
            <div className='color__options--color' style={{backgroundColor: `${headingColor ? headingColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('heading')}>

           </div>
           </div>
           <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Sub Heading' value={subHeading} onChange={e => setSubHeading(e.target.value)} />
            </div>
            <div className='color__options--color' style={{backgroundColor: `${subHeadingColor ? subHeadingColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('subHeading')}>

           </div>
           </div>

          


           <div className='handleStore__add'>
            <h3 style={{color: 'white',marginRight: '15px'}}>Choose Primary Color:</h3>
            <div className='color__options--color' style={{backgroundColor: `${primaryColor ? primaryColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('primary')}>

           </div>
           </div>

           <div className='handleStore__add' style={{alignItems: 'center'}}>
            <h3 style={{color: 'white',marginRight: '15px'}}>Choose Secondary Color:</h3>
            <div className='color__options--color' style={{backgroundColor: `${secondaryColor ? secondaryColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('secondary')}>

           </div>
           <div className='template__download' onClick={() => exportComponentAsJPEG(componentMobileRef)}>
               Download Your Photo
           </div>
           </div>

 

           

                       
            </div>
            </>
         ) : ''}    
    
 </div>
         )}
       </div>

       <div className='categoryPc'>
    <div className='category__body'>
    <SidebarRestro active='store' id={pageId} />
       <div className='handleCategory__body'>
       <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>edit template</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>EDIT TEMPLATE</h1>
        </div>


         {componentId ? (
             <>
            
              {() => {
                   setPrimaryColor(componentId.primaryColor);
                   setSecondaryColor(componentId.secondaryColor);
                   setHeadingColor(componentId.headingColor);
                   setSubHeadingColor(componentId.subHeadingColor);
                   setComponentImage(componentId.componentImage);
                   setHeading(componentId.heading);
                   setSubHeading(componentId.subHeading);
              }}
             <div className='templateEditor'>
                <div className={componentId.startsWith('sli') ? `componentHolder` : `postComponentHolder`} ref={componentRef}>
                   {componentId === 'slider1' ? (
                    <Slider1 primaryColor={primaryColor} 
                         secondaryColor={secondaryColor} 
                         headingColor={headingColor} 
                         subHeadingColor={subHeadingColor} 
                         componentImage={componentImage}
                         heading={heading}
                         subHeading={subHeading}
                         />
                   ) : ''}
                   {componentId === 'slider2' ? (
                    <Slider2 primaryColor={primaryColor} 
                         secondaryColor={secondaryColor} 
                         headingColor={headingColor} 
                         subHeadingColor={subHeadingColor} 
                         componentImage={componentImage}
                         heading={heading}
                         subHeading={subHeading}
                         />
                   ) : ''}
                    {componentId === 'slider3' ? (
                    <Slider3 primaryColor={primaryColor} 
                         secondaryColor={secondaryColor} 
                         headingColor={headingColor} 
                         subHeadingColor={subHeadingColor} 
                         componentImage={componentImage}
                         heading={heading}
                         subHeading={subHeading}
                         />
                   ) : ''}

              {componentId === 'post1' ? (
                    <Post1 primaryColor={primaryColor} 
                         secondaryColor={secondaryColor} 
                         headingColor={headingColor} 
                         subHeadingColor={subHeadingColor} 
                         componentImage={componentImage}
                         heading={heading}
                         subHeading={subHeading}
                         />
                   ) : ''}

              {componentId === 'post2' ? (
                    <Post2 primaryColor={primaryColor} 
                         secondaryColor={secondaryColor} 
                         headingColor={headingColor} 
                         subHeadingColor={subHeadingColor} 
                         componentImage={componentImage}
                         heading={heading}
                         subHeading={subHeading}
                         />
                   ) : ''}

          {componentId === 'post3' ? (
                    <Post3 primaryColor={primaryColor} 
                         secondaryColor={secondaryColor} 
                         headingColor={headingColor} 
                         subHeadingColor={subHeadingColor} 
                         componentImage={componentImage}
                         heading={heading}
                         subHeading={subHeading}
                         />
                   ) : ''}
                         
                </div>   


                <div className='handleStore__add' style={{justifyContent:'center'}}>
           <label style={{backgroundColor: `green`, color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
                     Select Your Photo
                     <FileUploader
                       hidden
                       accept="image/*"
                       randomizeFilename
                       name="image"
                       storageRef={firebaseApp.storage().ref("templates")}
                       onUploadStart={handleUploadStart}
                       onUploadSuccess={handleUploadSuccess}
                      />
                      </label>
           </div>

             <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Heading' value={heading} onChange={e => setHeading(e.target.value)} />
            </div>
            <div className='color__options--color' style={{backgroundColor: `${headingColor ? headingColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('heading')}>

           </div>
           </div>
           <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Sub Heading' value={subHeading} onChange={e => setSubHeading(e.target.value)} />
            </div>
            <div className='color__options--color' style={{backgroundColor: `${subHeadingColor ? subHeadingColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('subHeading')}>

           </div>
           </div>

          


           <div className='handleStore__add'>
            <h3 style={{color: 'white',marginRight: '15px'}}>Choose Primary Color:</h3>
            <div className='color__options--color' style={{backgroundColor: `${primaryColor ? primaryColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('primary')}>

           </div>
           </div>

           <div className='handleStore__add' style={{alignItems: 'center'}}>
            <h3 style={{color: 'white',marginRight: '15px'}}>Choose Secondary Color:</h3>
            <div className='color__options--color' style={{backgroundColor: `${secondaryColor ? secondaryColor : 'white'}`,alignSelf: 'center'}} onClick={() => handleColorModal('secondary')}>

           </div>
           <div className='template__download' onClick={() => exportComponentAsJPEG(componentRef)}>
               Download Your Photo
           </div>
           </div>

 

           

                       
            </div>
            </>
         ) : ''}    
          
       
              
           </div>
    </div>
       </div>


       <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}
  open={openColor}

  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
   <>
       {currentColor === 'primary' ? (
           <>
            <ChromePicker 
            color={primaryColor}
            onChangeComplete={handleChangePrimaryColor}
            />
            <div className='modal__button' style={{margin: '10px', backgroundColor: 'white',color: 'black',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> setOpenColor(false)}>
            Save Colour
            </div>
           </>
       ) : ''}
        {currentColor === 'secondary' ? (
           <>
            <ChromePicker 
            color={secondaryColor}
            onChangeComplete={handleChangeSecondaryColor}
            />
            <div className='modal__button' style={{margin: '10px', backgroundColor: 'white',color: 'black',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> setOpenColor(false)}>
            Save Colour
            </div>
           </>
       ) : ''}
        {currentColor === 'heading' ? (
           <>
            <ChromePicker 
            color={headingColor}
            onChangeComplete={handleChangeHeadingColor}
            />
            <div className='modal__button' style={{margin: '10px', backgroundColor: 'white',color: 'black',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> setOpenColor(false)}>
            Save Colour
            </div>
           </>
       ) : ''}

      {currentColor === 'subHeading' ? (
           <>
            <ChromePicker 
            color={subHeadingColor}
            onChangeComplete={handleChangeSubHeadingColor}
            />
            <div className='modal__button' style={{margin: '10px', backgroundColor: 'white',color: 'black',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> setOpenColor(false)}>
            Save Colour
            </div>
           </>
       ) : ''}
   
  </>
</Modal>

       <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={openAlert}
  onClose={() => setOpenAlert(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
          Your data was upated
        </div>
        <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> setOpenAlert(false)}>
          Ok
        </div>
    </div>
 
</Modal>

<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={openImage}
  
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
         Please wait your photo is uploading
        </div>
        
        <div className='modal__button' style={{margin: '10px auto',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}}>
          <img src='https://i.ibb.co/HqghKW6/2.gif' />
        </div>
    </div>
 
</Modal>

         
          
          
        </div>
    )
}

export default HandleSliderTemplate
