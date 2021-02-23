import React from 'react'
import './Slider2.scss'

function Slider2( {primaryColor,secondaryColor,headingColor,subHeadingColor,componentImage,heading,subHeading,headingSize,subHeadingSize} ) {

    
	 const slider1={
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

    return (
        <div>
            <div className="containerTwo" style={{backgroundColor: `${primaryColor ? primaryColor : ''}`}} >
                <div className="imageHolder" style={{backgroundColor: `${secondaryColor ? secondaryColor : ''}`}} >
         
                </div>
                <div className="imageHolderTwo">
                <img className="imageOne" src={componentImage ? componentImage : 'https://i.ibb.co/nwyyFmt/wesual-click-y7s-Wby3woo-unsplash.jpg'}  />
                </div>
                <h2 style={{color: `${headingColor ? headingColor : ''}`,fontSize: `${headingSize ? headingSize : ''}`}} >  {heading ? heading : 'Add Your Headline Here'}   </h2>
			<p  style={{color: `${subHeadingColor ? subHeadingColor : ''}`,fontSize: `${subHeadingSize ? subHeadingSize : ''}`}} >   {subHeading ? subHeading : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'}</p>
               

            </div>
        </div>
    )
}

export default Slider2
