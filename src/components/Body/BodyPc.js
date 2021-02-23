import React, {useState, useEffect} from 'react';
import './BodyPc.scss';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import DiscountRow from '../DiscountRow/DiscountRow';
import { db } from '../../firebase';
import Post from '../Post/Post';
import { useStateValue } from '../../StateProvider';


function BodyPc({pageId}) {
    const [images,setImages]= useState([]);
    const [posts,setPosts]= useState([]);
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    const [{site_settings,site_info,brand},dispatch]= useStateValue();


    useEffect(() => {
  
        db.collection(pageId).doc('slider').collection('slider')
        .onSnapshot(snapshot => (
            setImages(snapshot.docs.map(doc => doc.data().image))
        ))
       
        },[])

    
    useEffect(() => {
        db.collection(pageId).doc('posts').collection('posts')
        .orderBy("timestamp","desc")
        .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id,data:doc.data()})))
        });
    },[]);
    return (
        <div className='bodyPc'>
           {site_settings.slider || site_settings.cover ? (
                <div className='slide'>
               {site_settings.cover ? (
                  <img src={site_info.siteCover} style={{width: '900px',height: '400px'}}/>
               ) : (
                   <>
                <div className='slide1'>
                <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={3000}
                animation='cubeAnimation'
              >
                     {images.map((image,key) => (
                         <>
                         {/* <div key={key} className='slideImage' style={{backgroundImage: `url(${image})`}} >
                          
                             </div> */}
                         
                        

                         <img src={image}  className='slideImageTag'/>
                        
                       
                        </>
                     ))}
              </AutoplaySlider> 
            </div>
              <div className='slide2'>
              <AutoplaySlider
              play={true}
              cancelOnInteraction={false} // should stop playing on user interaction
              interval={3000}
              animation='cubeAnimation'
            >
                   {images.map((image,key) => (
                       
                       <div key={key}  style={{backgroundImage: `url(${image})`}} >
                        
                           </div> 
                      
                   ))}
            </AutoplaySlider> 
          </div>
          </>
               )}
                </div>
           ) : ''}
        {site_settings.store && site_settings.discount && brand.plan !== 'lite' ? (
                <div className='item__preview'>
                <DiscountRow />
                </div>
        ) : ''}
         
     <div className='body__post--list'>
            {posts.map((post) => (
                <Post
                pageId={pageId}
                id={post.id} 
                 key={post.id}
                 fclicks={post.data.fclicks}
                 wclicks={post.data.wclicks}
                 visits={post.data.visits}
                 profilePic={post.data.profilePic}
                 message={post.data.message}
                 timestamp={post.data.timestamp}
                 username={post.data.username}
                 link={post.data.link}
                 type={post.data.type}
                />
            ))
        }
    </div>
        </div>
    )
}

export default BodyPc
