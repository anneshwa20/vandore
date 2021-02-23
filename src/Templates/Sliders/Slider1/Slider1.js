import React from 'react'
import './Slider1.scss'

function Slider({primaryColor,secondaryColor,headingColor,subHeadingColor,componentImage,heading,subHeading,headingSize,subHeadingSize}) {
	// font-link
	// component object  {headingSize=25px,subHeadingSize=12px}
	 //Components And Default Values
	 const slider1={
		headingSize:'25px', // for mobile only6
		subHeadingSize:'18px', //for mobile only
		primaryColor: '#df7c2b',
		secondaryColor: '#a82a14',
		headingColor: '#ac2f09',
		subHeadingColor: 'white',
		componentImage: 'https://i.ibb.co/5vKspJ5/bundo-kim-Pb9b-Uz-H1n-D8-unsplash.jpg',
		heading: 'Add Your Headline Here',
		subHeading: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',
 
	}
	return (
		
			<div className="slider1" style={{backgroundColor: `${primaryColor ? primaryColor : ''}`}}>

			<div className='slider1--left'>
					<img className="slider1__image" src={componentImage ? componentImage : 'https://i.ibb.co/5vKspJ5/bundo-kim-Pb9b-Uz-H1n-D8-unsplash.jpg'} />
					<img className="slider1__imageTwo" src={componentImage ? componentImage : 'https://i.ibb.co/5vKspJ5/bundo-kim-Pb9b-Uz-H1n-D8-unsplash.jpg'} />
			</div>
			
            <div className='slider1--right'>
			<h2 style={{color: `${headingColor ? headingColor : ''}`,fontSize: `${headingSize ? headingSize : ''}`}}>{heading ? heading : 'Add Your Headline Here'}</h2>
			<p style={{color: `${subHeadingColor ? subHeadingColor : ''}`,fontSize: `${subHeadingSize ? subHeadingSize : ''}`}}>{subHeading ? subHeading : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'}</p>
			</div>
			
           
		   
		   
		    
			
			
				</div>
			
	
	)
}

export default Slider
