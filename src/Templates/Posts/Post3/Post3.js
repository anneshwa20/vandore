import React from 'react'
import './Post3.scss'

function Post3( {primaryColor,secondaryColor,headingColor,subHeadingColor,componentImage,heading,subHeading,headingSize,subHeadingSize} ) {

           
        const slider1={
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

    return (
        <div className="PostSix__container"  >
           <div className="PostSix__containerRight" style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >

           </div>
           <div className="PostSix__containerLeft">

           </div>
           <div className="PostSix__middleContainer" >
             <div className="PostSix__middleLeft"  style={{backgroundColor: `${primaryColor ? primaryColor : ''}`}} >
             <h2 className="PostSix__middleTitle" style={{color: `${headingColor ? headingColor : ''}`,fontSize: `${headingSize ? headingSize : ''}`}} >
                  
             {heading ? heading : 'Add Your Headline Here'}

            </h2>
            <p className="PostSix__middleSubtitle" style={{color: `${subHeadingColor ? subHeadingColor : ''}`,fontSize: `${subHeadingSize ? subHeadingSize : ''}`}} > 
           
            {subHeading ? subHeading : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'}

            </p>
             </div> 
             <div className="PostSix__middleRight">
                 <img className="PostSix__middleImage"  src={componentImage ? componentImage : 'https://i.ibb.co/dMTZ8ZS/stories-v1r-Uvn-VMMk-M-unsplash.jpg'}  alt=""/>
            </div> 
           </div>
        </div>
    )
}

export default Post3
