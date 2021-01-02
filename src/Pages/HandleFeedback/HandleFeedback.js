import { Modal, withStyles } from '@material-ui/core';
import { Call, Grade, Menu, Message, PeopleAlt, Person } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { useHistory } from 'react-router-dom';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './HandleFeedback.scss';
import FeedbackSvg from '../../icons/undraw_feedback_h2ft.svg';


function HandleFeedback({id}) {
    const [feedbacks,setFeedbacks]= useState([]);
    const [{site_settings,single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
    const history= useHistory();
    const pageId= id;
    const [open,setOpen]= useState(false);
    const [currentVideo,setCurrentVideo]= useState('');
    const manageVideo= (link) => {
     setOpen(true);
     setCurrentVideo(link);
   }

   const handleGetStarted= () => {
    db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
        feedback: true
    }).then(refreshPage);
}
   const refreshPage = ()=>{
    window.location.reload();  }
    
    
    useEffect(() => {
  
        db.collection(pageId.toUpperCase()).doc('messages').collection('messages')
        .onSnapshot(snapshot => (
            setFeedbacks(snapshot.docs.map(doc => ({
                id: doc.id,
                message: doc.data().message,
                name: doc.data().name,
                phone: doc.data().phone,
                image: doc.data().image,
                rating: doc.data().rating
            })))
        ))
       
        },[])


        const StyledRating = withStyles({
            iconFilled: {
              color: `rgba(66, 135, 245, 1)`,
            },
            iconHover: {
              color: `rgba(66, 135, 245, 1)`,
            },
          })(Rating);
          
          const customIcons = {
            1: {
              icon: <SentimentVeryDissatisfiedIcon style={{width: '25px',height: '25px'}}/>,
              label: 'Very Dissatisfied',
            },
            2: {
              icon: <SentimentDissatisfiedIcon style={{width: '25px',height: '25px'}}/>,
              label: 'Dissatisfied',
            },
            3: {
              icon: <SentimentSatisfiedIcon style={{width: '25px',height: '25px'}}/>,
              label: 'Neutral',
            },
            4: {
              icon: <SentimentSatisfiedAltIcon style={{width: '25px',height: '25px'}}/>,
              label: 'Satisfied',
            },
            5: {
              icon: <SentimentVerySatisfiedIcon style={{width: '25px',height: '25px'}}/>,
              label: 'Very Satisfied',
            },
          };
          
          function IconContainer(props) {
            const { value, ...other } = props;
            return <span {...other}>{customIcons[value].icon}</span>;
          }
          
          IconContainer.propTypes = {
            value: PropTypes.number.isRequired,
          };

        const feedbackDelete= (id) => {
            db.collection(pageId.toUpperCase()).doc('messages').collection('messages').doc(id).delete().then(alert('deleted'));
        }
    return (
        <div className='handleFeedback'>
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
       {site_preview.feedback ? (
        <>
        
            <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Feedbacks</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>Feedbacks</h1>
        </div>
         <div className='guide_toast'>
            <p>{site_settings.feedback ? 
            'To turn off Feedbacks, go to settings and disable Feedbacks' : 
            'Feedbacks is disabled, go to settings and enable Feedbacks'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push('/restro/settings')}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding Feedbacks, then see our Feedbacks guides
            </p> 
            <div onClick={() => manageVideo(single_guides.feedbacks)}>Guides</div>
           </div>
            <div className='handleFeedback__list'>
            {feedbacks.map(feedback => (
              <div className='handleFeedback__feedback'>
                  <p className='handleFeedback__feedback--item'> <Person /> {feedback.name}</p>
                     <p className='handleFeedback__feedback--item'><Call /> {feedback.phone}</p>
                   <p className='handleFeedback__feedback--item'><Message /> {feedback.message}</p>
                               
                   <p className='handleFeedback__feedback--item'>      
                      <Grade />
                        <StyledRating
                                            name="customized-icons"

                                            value={feedback.rating}
                                            
                                            getLabelText={(value) => customIcons[value].label}
                                            IconContainerComponent={IconContainer}
                                            readOnly
                                          />

                    </p>
                     <button onClick={() => feedbackDelete(feedback.id)}>delete</button>
                  </div>
          ))}
            </div>
            <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column', backgroundColor: 'white',padding: '20px'}}>
    <iframe width="560" height="315" src={currentVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   <button onClick={() => history.push('/restro/guides')}>Show All Guides</button>
    </div>
 
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
                     <h1>Manage Your Feedbacks</h1>
                     <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
               
                      <div className='site_preview--getStarted' onClick={handleGetStarted}>
                         Get Started
                      </div>
                  </div>

                  <div className='site_preview--topContainer--right'>
                       <img src={FeedbackSvg} style={{fill:"#FFFFFF"}} />
                  </div>
          </div>
       </div>
       <div className='guide__learn--more'>
           Learn More
      </div>
       <div className='site_preview--guide'>
          <div className='site_preview--guide--left'>
          <img src={FeedbackSvg} style={{fill:"#FFFFFF"}} />
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
          </div>
          <div className='site_preview--guide--right'>
            <iframe src={single_guides.feedbacks} />
          </div>
      </div>
      </div>
       )}
        </div>
    )
}

export default HandleFeedback
