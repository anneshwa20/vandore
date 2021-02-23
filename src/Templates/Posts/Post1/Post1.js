import React from 'react'
import './Post1.scss'

function PostSeven({primaryColor,secondaryColor,headingColor,subHeadingColor,componentImage,heading,subHeading,headingSize,subHeadingSize} ) {
    const slider1={
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

    return (
        <div className="PostSeven__container">
            <div className="PostSeven__containerTop" style={{backgroundImage: componentImage ? `url(${componentImage})` : `url(https://i.ibb.co/Mnm92gj/adrien-olichon-Zg-REXhl8-ER0-unsplash-1.jpg)`}}>
               <img className="PostSeven__containerTopImage"  alt="" src={componentImage ? componentImage : 'https://i.ibb.co/Mnm92gj/adrien-olichon-Zg-REXhl8-ER0-unsplash-1.jpg'}  /> 
               <h2 className="PostSeven__containerBottomHeading"  style={{color: `${headingColor ? headingColor : ''}`,fontSize: `${headingSize ? headingSize : ''}`}} > {heading ? heading : 'your headline here'}</h2>
                
            </div>
            <div className="PostSeven__containerBottom" style={{backgroundColor: `${primaryColor ? primaryColor : ''}`}} >
                
                <h4 className="PostSeven__containerBottomSubheading" style={{color: `${subHeadingColor ? subHeadingColor : ''}`,fontSize: `${subHeadingSize ? subHeadingSize : ''}`}} >{subHeading ? subHeading : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' } </h4>
                <div className="PostSeven__containerBottomDesignOne"  style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >

                </div>
                <div className="PostSeven__containerBottomDesignTwo"  style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >
                    
                    </div>
                
            </div>
            
        </div>
    )
}

export default PostSeven
