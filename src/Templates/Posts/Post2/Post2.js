import React from 'react'
import './Post2.scss'


function Post2( {primaryColor,secondaryColor,headingColor,subHeadingColor,componentImage,heading,subHeading,headingSize,subHeadingSize} ) {

     const slider1={
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





    return (
          <div className="PostFive__container">
         <div className="PostFive__containerLeft" style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >
             <div className="PostFive__leftBack" style={{backgroundColor: `${primaryColor ? primaryColor : ''}`}} >

             </div>
             <div className="PostFive__imgHolder">
             <img className="PostFive__leftImg" src={componentImage ? componentImage : 'https://i.ibb.co/ccj4HjM/laura-peruchi-TOoa-T8-Gz-6-Q-unsplash.jpg'} alt=""/>
             </div>
            
        </div> 
        <div className="PostFive__containerRight" style={{backgroundColor: `${primaryColor ? primaryColor : ''}`}} >
            <h2 className="PostFive__rightTitle" style={{color: `${headingColor ? headingColor : ''}`,fontSize: `${headingSize ? headingSize : ''}`}} >
                 
            {heading ? heading : 'Add Your Headline Here'} 
                
            </h2>
            <p className="PostFive__rightSubtitle" style={{color: `${subHeadingColor ? subHeadingColor : ''}`,fontSize: `${subHeadingSize ? subHeadingSize : ''}`}} >
             
            {subHeading ? subHeading : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'}

            </p>
            <div className="PostFive__rightStyle"  style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >
                
            </div>
        </div>  
        </div>
    )
}

export default Post2
