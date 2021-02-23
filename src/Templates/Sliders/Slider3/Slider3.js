import React from 'react'
import './Slider3.scss'

function SliderNine({primaryColor,secondaryColor,headingColor,subHeadingColor,componentImage,heading,subHeading,headingSize,subHeadingSize} ) {
     
    const slider1={
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
      
    return (
        <div className="SliderNine__container"  style={{backgroundColor: `${primaryColor ? primaryColor : ''}`}} >
            <div className="SliderNine__containerTop" style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >
                <img className="SliderNine__containerTopImage" alt=""  src={componentImage ? componentImage : 'https://i.ibb.co/1vrRQL7/rezha-ramadhan-s-V8-M-Lkg60-Y-unsplash.jpg'}   />
             <div className="SliderNine__containerTopDesignOne">
             <h2 className="SliderNine__containerTopHeading"  style={{color: `${headingColor ? headingColor : ''}`,fontSize: `${headingSize ? headingSize : ''}`}} >
                {heading ? heading : 'your headline here'}
             </h2>
             </div>
             <h4 className="SliderNine__containerBottomSubheading" style={{color: `${subHeadingColor ? subHeadingColor : ''}`,fontSize: `${subHeadingSize ? subHeadingSize : ''}`}} > {subHeading ? subHeading :  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'} </h4>
             
            </div>
            <div className="SliderNine__containerBottom">
            <div className="SliderNine__containerBottomDesignOne" style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >
                    
                    </div>
                
            </div>
            
        </div>
    )
}

export default SliderNine
