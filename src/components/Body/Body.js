import React, {useState, useEffect} from 'react';
import './Body.scss';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import DiscountRow from '../DiscountRow/DiscountRow';
import { db } from '../../firebase';
import Post from '../Post/Post';
import { useStateValue } from '../../StateProvider';
import { Chat, Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Search, Store } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';


function Body({pageId}) {
    const [images,setImages]= useState([]);
    const [posts,setPosts]= useState([]);
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    const [{site_settings,site_info,site_colors,user,user_details,brand},dispatch]= useStateValue();
    const [youtubeLink,setYoutubeLink]= useState('');
    const history= useHistory();
    const [search,setSearch]= useState('');
    const [products,setProducts]= useState([]);

    useEffect(() => {
  
        db.collection(pageId).doc('products').collection('products')
        .onSnapshot(snapshot => (
            setProducts(snapshot.docs.map(doc => doc.data()))
        ))
       
        },[])

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

    useEffect(() => {
        
        db.collection(pageId).doc('social').collection("social").doc('social_links')
        .get()
        .then(function(doc) {
          if (doc.exists) {
             
               setYoutubeLink(doc.data().youtubeLink);
               
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    
     },[])

     let filteredProducts= [];

  if(search){
     filteredProducts= products?.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase())); 
  }
    return (
        <div className='body'>
                {/*   <div className='shortNav' >
             <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/home`)}>
            <Home style={{color: `${site_colors.icons}`}}/>
            <p>Home</p>
            </div>
            {site_settings.photoGallery ? (
            <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/gallery`)}>
            <PhotoAlbum style={{color: `${site_colors.icons}`}}/>
            <p>Gallery</p>
            </div>
            ) : ''}
           
            {user && site_settings.userAuth? (
                <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/orders`)}>
                <Fastfood style={{color: `${site_colors.icons}`}}/>
                <p>Orders</p>
            </div>
            )
             : ''}
            
          {site_settings.store ? (
            <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/store`)}>
            <Store style={{color: `${site_colors.icons}`}}/>
            <p>Store</p>
            </div>
          ) : ''}

           {site_settings.userAuth && user ? (
        <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/user`)}>
        <Avatar src={user_details.image}  style={{width: '40px',height: '40px',alignSelf:'center',margin: '5px'}}/>
        <p>Your Profile</p>
        </div>
           ) : (
            <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/login`)}>
            <PeopleAltOutlined style={{color: `${site_colors.icons}`}}/>
            <p>Login</p>
            </div>
           )}
           

        </div> */}
        {site_settings.slider ? (
              <div className='slide' style={{margin: '10px auto'}}>
              <div className='slide1Slider'>
              <AutoplaySlider
                       play={true}
                       cancelOnInteraction={false} // should stop playing on user interaction
                       interval={3000}
                       animation='cubeAnimation'
                   >
                            {images.map((image,key) => (
                              <div key={key} style={{backgroundImage: `url(${image})`,backgroundSize: 'contain'}}>
                                 
                              </div>
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
                              <div key={key} style={{backgroundImage: `url(${image})`,backgroundSize: '900px 400px'}}>
                                 
                              </div>
                           ))}
           </AutoplaySlider> 
           </div>
           
           </div>
        ) : ''}
      
      <div className="menu__input2">
                 <Search fontSize="large"/>
        
                  <input placeholder={`Search Products in ${pageId.toLowerCase()} Store`} value={search} onChange={e => setSearch(e.target.value)} type="text" />
              </div>
              {filteredProducts.length > 0 ? (
              <div className='search__results'>
                 {filteredProducts.map(fproduct => (
                   <div className='search__results--result' onClick={() => history.push(`/products/${pageId.toUpperCase()}/${fproduct.id}`)}>
                     <img src={fproduct.image} />
                     <p>{fproduct.name}</p>
                     
                   </div>
                 ))}
              </div>
            ) : (
             <>




             </>
            )}
       
       {site_settings.store && site_settings.discount && brand.plan !== 'lite' ? (
                <div className='item__preview'>
                <DiscountRow />
                </div>
        ) : ''}
         
  {youtubeLink != '' ?  <iframe  className='youtubePost' src={youtubeLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : ''}
   

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

export default Body
