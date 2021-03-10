import React, { useEffect, useState } from 'react'
import './MobileAppHome.scss'
import QrReader from 'react-qr-scanner';
import { useStateValue } from '../../StateProvider';
import { Avatar, Modal } from '@material-ui/core';
import { authMain, db, dbMain, firebaseAppMain } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CoolTabs from 'react-cool-tabs';
import { useHistory } from 'react-router-dom';
import { Add, ArrowRight, Close, ExitToApp, Money, OpenInNew, Report, Search } from '@material-ui/icons';
import MapStore from './MapStore';
import firebase from 'firebase';
import PostVandore from '../../components/Post/PostVandore';
import Post from '../../components/Post/Post';



function MobileAppHome() {
    const[{user,user_details},dispatch]= useStateValue();
    const [accounts,setAccounts]= useState([]);
    const [phone,setPhone]= useState('');
    const [name,setName]= useState('');
    const [address,setAddress]= useState('');
    const [image,setImage]= useState('');
    const [open,setOpen]= useState(false);
    const [openImage,setOpenImage]= useState(false);
    const [allBrands,setAllBrands]= useState([]);
    const [userBrands,setUserBrands]= useState([{brand: {image: 'https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png', name: 'Vandore'}}]);
    const [brandList,setBrandList]= useState([]);
    const [allPosts,setAllPosts]= useState([]);
    const history= useHistory();


   if(user){
     if(user_details){
      if(user_details.business){
        history.push(`/restro/dashboard/${user_details.business.toUpperCase()}`)
       }
     }  
   }
 

     useEffect(() => {
    
      if(user){
        dbMain.collection('users').doc(user.uid).collection('brands')
        .onSnapshot(snapshot => (
            setUserBrands(snapshot.docs.map(doc => ({
                id: doc.id,
                brand: doc.data()
            })))
        ))
      }
      
     
      },[user])

      useEffect(() => {
    let allPosts= [];
        if(brandList){
          for(let i=0; i < brandList.length; i++){
            db.collection(brandList[i]).doc('posts').collection('posts')
            .limit(5)
            .orderBy('timestamp')
            .onSnapshot(snapshot => (
              snapshot.docs.map(doc => allPosts.push(doc.data()))
              
            ))
          }
      setAllPosts(allPosts);
        }
        },[brandList])
        function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;
        
          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
        
          return array;
        }
        
        console.log(allPosts);

      useEffect(() => {
        if(user){
          dbMain.collection('users').doc(user.uid).collection('brands')
          .onSnapshot(snapshot => (
              setBrandList(snapshot.docs.map(doc => doc.id))
          ))
        }
       
        },[user])


        

      useEffect(() => {
  
        dbMain.collection('brands')
        .onSnapshot(snapshot => (
            setAllBrands(snapshot.docs.map(doc => ({
                id: doc.id,
                business: doc.data()
            })))
        ))
       
        },[])
  

        useEffect(() => {
           if(user_details){
             if(user_details.affiliation){
              dbMain.collection('affiliation').doc(user_details.affiliation).collection('affiliation')
              .onSnapshot(snapshot => (
                  setAccounts(snapshot.docs.map(doc => ({
                      id:doc.id,
                      data: doc.data()
                  })))
              ))
             }
            
           }
          },[user_details])
         
          
   

    
   const Brands= () => {
    const [search,setSearch]= useState('');
    const [profile,setProfile]= useState(null);
    const [profilePosts,setProfilePosts]= useState([]);
     const [brand,setBrand]= useState(null);
     const [siteInfo,setSiteInfo]= useState(null);
     const [gallery,setGallery]= useState([]);
     const [users,setUsers]= useState([]);

      let filteredBrands= [];

     if(search){
     filteredBrands= allBrands?.filter(brand => 
      brand.business.name.toLowerCase().includes(search.toLowerCase())); 
     }
   
     const addBrand = () => {
       dbMain.collection('users').doc(user.uid).collection('brands').doc(profile.name.toUpperCase()).set({
         name: profile.name.toUpperCase(),
         image: profile.image,
         notification: true,
         report: false
       });
     }

     const removeBrand= () => {
      dbMain.collection('users').doc(user.uid).collection('brands').doc(profile.name.toUpperCase()).delete();
     }
    

     useEffect(() => {
      if(profile){
        db.collection(profile.name.toUpperCase()).doc('posts').collection('posts')
        .onSnapshot(snapshot => (
            setProfilePosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        ))
      }
     },[profile])

     useEffect(() => {
      if(profile){
        db.collection(profile.name.toUpperCase()).doc('gallery').collection('gallery')
        .onSnapshot(snapshot => (
            setGallery(snapshot.docs.map(doc => ({
                id: doc.id,
                photo: doc.data()
            })))
        ))
      }
     },[profile])

     useEffect(() => {
      if(profile){
        db.collection(profile.name.toUpperCase()).doc('userList').collection('userList')
        .onSnapshot(snapshot => (
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                user: doc.data()
            })))
        ))
      }
     },[profile])

     useEffect(() => {
      if(profile){
        dbMain.collection('brands').doc(profile.name.toUpperCase())
        .onSnapshot(function(doc) {
          setBrand(doc.data());
        });
      }
     },[profile])

     useEffect(() => {
      if(profile){
        db.collection(profile.name.toUpperCase()).doc('site').collection('site').doc('site_info')
        .onSnapshot(function(doc) {
          setSiteInfo(doc.data());
        });
      }
     },[profile])

     const mapStyles = {
      width: '100%',
      height: '100%'
    };




     return (
    <div className='vandore__brands'>

      {profile ? (
        <div className='vandore__profile'>
          <div className='vandore__profile--close' onClick={() => {setProfile(null); setSearch('')}}>
            <Close fontSize='large' />
            </div>

            <div className='vandore__profile--container'>
                <div className='vandore__profile--container--image'>
                <Avatar src={profile.image} style={{width: '120px',height: '120px'}}/>
                </div>
                <div className='vandore__profile--container--name'>
                {profile.name}
                </div>
                <div className='vandore__profile--container--bio'>
               {siteInfo?.siteDescription}
                </div>
                <div className='vandore__profile--container--buttons'>
                    
                    <div className='vandore__profile--container--buttons--button' onClick={() => history.push(`/${profile.name}`)}>
                       Open  <OpenInNew style={{marginLeft: '3px'}}/>
                    </div>
            
               {brandList.includes(profile.name.toUpperCase()) ? (
          <div className='vandore__profile--container--buttons--button' onClick={removeBrand} style={{backgroundColor: 'red'}}>
             Remove Brand      <Close style={{marginLeft: '3px'}}/>
            </div>
               ) : (
                <div className='vandore__profile--container--buttons--button' onClick={addBrand} style={{backgroundColor: 'green'}}>
                Add this brand       <Add style={{marginLeft: '3px'}}/>
             </div>
               )}
                   

                   {/*  <div className='vandore__profile--container--buttons--button'>
                       Report       <Report style={{marginLeft: '3px'}}/>
                    </div>  */} 

                 </div>
            </div>

            <div className='vandore__profile--stats'>
                <div className='vandore__profile--stats--stat' style={{borderRight: '1px solid white'}}>
                   <div className='profile__stat--heading'>
                    Photos
                   </div>
                   <div className='profile__stat--value'>
                   {gallery.length}
                   </div>
                </div>

                <div className='vandore__profile--stats--stat' style={{borderRight: '1px solid white'}}>
                <div className='profile__stat--heading'>
                  Posts
               </div>
              <div className='profile__stat--value'>
                 {profilePosts.length}
              </div>
                </div>

                <div className='vandore__profile--stats--stat'>
                <div className='profile__stat--heading'>
                 People
                  </div>
                <div className='profile__stat--value'>
                {users.length}
                </div>
                </div>
                
            </div>

            <div className='vandore__profile--photos'>
            {profilePosts.map(post => (
            <>
               {post.post.type === 'image' ? (
                 <div className='vandore__photos'>
                 <img src={post.post.link}  />
                </div>
               ) : ''}
              </>
            ))}
            </div>

            <div className='vandore__profile--location'>

            {/* <MapStore /> */}
           
            </div>

            
         

            

        </div>
      ) : (
       <>
       <div className='vandore__brands--search'>
      
       <div className="vandore__input">
       <Avatar src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png' style={{width: '30px',height: '30px'}} />
         
                   <input placeholder={`Search Brands`} value={search} onChange={e => setSearch(e.target.value)} type="text" />
               </div>
       </div>
 
     {filteredBrands.length > 0 ? (
        <div className='vsearch__results'>
        {filteredBrands.map(fbrand => (
          <div className='vsearch__results--result' onClick={() => setProfile(fbrand.business)}>
            <Avatar src={fbrand.business.image} style={{width: '40px', height: '40px'}} />
            <p>{fbrand.business.name}</p>
            
          </div>
        ))}
     </div>
     ) 
     : (
       <div className='vandore__brands--user'>
      <h2>Your Brands</h2>
            <div className='vandore__brands--user--top'>
              {userBrands.map(userBrand => (
                <div className='user__brand' onClick={() => setProfile(userBrand.brand)}>
                  <Avatar src={userBrand.brand.image} style={{width: '35px',height: '35px'}}/>
                  <p>{userBrand.brand.name}</p>
                </div>
              ))}
            </div>
       <h2>Referrals And Business Accounts</h2>
            <div className='vandore__brands--user--bottom'> 
               <div className='vandore__sidebar--youtube'>
               <iframe  src={'https://www.youtube.com/embed/2h_7ZHa4DRE'} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
               </div>

             
               
              
               {/* <div className='vandore__sidebar--button'>
                 Switch To Business Account
               </div> */}
            </div>
        </div>
     )}
 
 
        

       </>
      )}
          
     


    </div>
     );
   }

   const Referals= () => {


    const calculateDue=() => {
      let totalPrice= 0;
 
       for(let i=0; i < accounts.length; i++){
            if(accounts[i].data.paid){
              if(accounts[i].data.plan==='gold'){
                totalPrice= totalPrice + 2000;
              }
              else if(accounts[i].data.plan==='lite'){
                totalPrice= totalPrice + 1000;
              }
            }
       } 
       
       return totalPrice - (user_details.amountPaid*1);

    }

    const handlePayment= () => {
      if(calculateDue()===0){
        alert('No Payment Due!');
        return;
      }
      dbMain.collection('users').doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
        paymentRequest: true,
        requestDate: firebase.firestore.FieldValue.serverTimestamp()
      });
      dbMain.collection('user_payments').add({
        user: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        due: calculateDue(),
        paid: user_details.amountPaid,
        referal: user_details.affiliation
      })
    }

    return (
   <div className='vandore__referals'>
          <div className='vandore__referals--top'>
               <h2>Your Referral Code</h2>
               <div className='vandore__referals--code'>
                {user_details ? user_details.affiliation : ''}
               </div>
               <div className='vandore__referals--top--desc'>
              Share This With Interested Businesses And Get 2000 Rs Commision On Pro Plus Plan And 1000Rs On Vandore Plus plan.
               </div>
               
               {user_details.paymentRequest ? (
                 <>
            <div className='vandore__referals--request' style={{backgroundColor: 'green'}}>
            Requested Payment <ArrowRight />
            </div>
            <div className='vandore__referals--requestMessage' style={{width: '80%',textAlign: 'center', color: 'rgb(161, 163, 166)',fontSize: 'small'}}>
      {user_details ?  `You Have Requested Payment On ${new Date(user_details.requestDate?.toDate()).toUTCString()}. It Usually Takes 24hr-48hr to transfer funds to your Google Pay/Paytm Accounts.` : '' }
            </div>
            </>
               ) : (
                <div className='vandore__referals--request' onClick={handlePayment}>
                Request Payment <Add />
              </div>
               )}
              
          </div>
          <div className='vandore__referals--stat'>
            <div className='vandore__referals--stat--block'>
               <div className='vandore__referals--stat--blockTop'>
                    Paid
               </div>
               <div className='vandore__referals--stat--blockBottom'>
                {user_details.amountPaid}
               </div>
            </div>

            <div className='vandore__referals--stat--block'>
               <div className='vandore__referals--stat--blockTop'>
                    Due
               </div>
               <div className='vandore__referals--stat--blockBottom'>
                   {calculateDue()}
               </div>
            </div>

            <div className='vandore__referals--stat--block'>
               <div className='vandore__referals--stat--blockTop'>
                    Joined
               </div>
               <div className='vandore__referals--stat--blockBottom'>
                  {accounts.length}
               </div>
            </div>

           


          </div>

             <div className='vandore__referals--join'>
               <div className='vandore__referals--joinHeading'>
                 Joined Business <Add style={{marginLeft: '3px'}}/>
               </div>
               <div className='vandore__referals--joinContainer'>
                    {accounts.map(account => (
                      <div className='vandore__referals--account'>
                        <div className='vandore__referals--accountLeft'>
                        <Avatar src={account.data.image} style={{width: '30px',height: '30px',padding: '5px',marginRight: '5px'}} />
                         {account.data.name}
                         </div>
                     
                      </div>
                    ))}
               </div>
             </div>

             
             <div className='vandore__referals--join'>
               <div className='vandore__referals--joinHeading'>
                 Paid Clients  <Money style={{marginLeft: '3px'}}/>
               </div>
               <div className='vandore__referals--joinContainer'>
                    {accounts.map(account => (
                      <>
                      {account.data.paid ? (
                        <div className='vandore__referals--account'>
                        <div className='vandore__referals--accountLeft'>
                        <Avatar src={account.data.image} style={{width: '30px',height: '30px',padding: '5px',marginRight: '5px'}} />
                         {account.data.name}
                         </div>

                         <div className='vandore__referals--accountRight'>
                           <div className='vandore__referals--accountRightPrice'>
                         {account.data.plan === 'gold' ? '2000 Rs' : ''}
                         {account.data.plan === 'lite' ? '1000 Rs' : ''}
                           </div>

                           <div className='vandore__referals--accountRightPlan'>
                           {account.data.plan === 'gold' ? 'Pro Plus +' : ''}
                           {account.data.plan === 'lite' ? 'Plus +' : ''}
                           </div>

                         </div>
                     
                      </div>
                      ) :''}
                         </>
                    ))} 
                   
               </div>
             </div>

   </div>
    );
  }

        const handleScan = data => {
        if (data) {
     
        
        window.location.href= data;
        
        }
      }
     const  handleError = err => {
        console.error(err)
      }

      useEffect(() => {
        if(user){
          dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                   setPhone(doc.data().phone);
                   setName(doc.data().name);
                   setAddress(doc.data().address);
                   setImage(doc.data().image);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        }else{
           console.log('ERROR')
        }
         },[user])
    
    
      const previewStyle = {
        height: 200,
        width: 220,
        alignSelf: 'center',
        borderRadius: '10px',
        border: '1px solid green',
       marginTop: '10px',
       marginBottom: '10px',
       justifySelf: 'center'
      }

      const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
       firebaseAppMain.storage().ref('users').child(filename).getDownloadURL()
       .then(url => setImage(url)).then(() =>setOpenImage(false));
 };

 const handleSubmit= (e) => {
  e.preventDefault();

 

dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
    name: name,
    image: image,
    address: address,
    phone: phone
});

dbMain.collection("userList").doc(user.uid).update({
    name: name,
    image: image,
    address: address,
    phone: phone
}).then(() => setOpen(true));


 dispatch({
     type: 'UPDATE_USER',
     user_details: {
         active: true,
         address: address,
         name: name,
         image: image,
         phone: phone
     }
 });

 

}

const handleAuthentication= () => {
  if(user){
      authMain.signOut();
      history.push('/');
  }
}

     
    return (
        <div className='mobileAppHome'>
          <div className='home__left'>
          <div className='vandore__header'>
          <div className='QRComponentBottom--logo'>
                <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                <h2 style={{color: 'white'}}>ANDORE</h2>
            </div>
            <div style={{marginRight: '10px'}} onClick={handleAuthentication}>
            <ExitToApp style={{color: 'white'}}/>
            </div>
            
            </div>
            <div className='left__container'>
                 <div className='home__left--left'>
                 <CoolTabs
	       tabKey={'1'}
	       style={{ width:  '100%', height:  '100%', background:  'rgb(67, 71, 77)' }}
         tabsHeaderStyle={{height: '80px'}}
	       activeTabStyle={{ background:  'rgb(67, 71, 77)', color:  'white' }}
	       unActiveTabStyle={{ background:  'rgb(67, 71, 77)', color:  'rgb(235, 237, 240)' }}
	       activeLeftTabBorderBottomStyle={{ background:  'green', height:  4 }}
	       activeRightTabBorderBottomStyle={{ background:  'green', height:  4 }}
	       tabsBorderBottomStyle={{ background:  'rgb(67, 71, 77)', height:  4 }}
	       leftContentStyle={{ background:  'lightgreen' }}
	       rightContentStyle={{ background:  'lightblue' }}
	       leftTabTitle={'Brands'}
	       rightTabTitle={'Referals'}
	       leftContent={<Brands  />}
	       rightContent={<Referals/>}
	       contentTransitionStyle={'transform 0.6s ease-in'}
	       borderTransitionStyle={'all 0.6s ease-in'}/>
                 </div>
                 <div className='home__left--right'>
                   <div className='vandore__feed--header'>
                   <div className='QRComponentBottom--logo'>
                <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                <h2 style={{color: 'white'}}>ANDORE</h2>
                  </div>
                  <div className='vandore__feed--feed'>
                    Feed
                  </div>
                   </div>
                   
                    <div className='vandore__post--list'>
            {shuffle(allPosts).map((post) => (
                <PostVandore
                pageId={post.username.toUpperCase()}
                id={post.id} 
                 key={post.id}
                 fclicks={post.fclicks}
                 wclicks={post.wclicks}
                 visits={post.visits}
                 profilePic={post.profilePic}
                 message={post.message}
                 timestamp={post.timestamp}
                 username={post.username}
                 link={post.link}
                 type={post.type}
                />
            ))
        }
    </div>
                 
                 
                   </div>
           
          </div>
          </div>
          <div className='home__right'>
             <h2 className='account__header' style={{margin: '0px'}}>Account Details</h2>
            <div className='home__rightTop'>
            <Avatar src={image} style={{width: '150px',height: '150px'}}/>
             <label style={{backgroundColor: `green`, color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',margin: '10px'}}>
                     Select Your Photo
                     <FileUploader
                       hidden
                       accept="image/*"
                       randomizeFilename
                       name="image"
                       storageRef={firebaseAppMain.storage().ref("users")}
                       onUploadStart={handleUploadStart}
                       onUploadSuccess={handleUploadSuccess}
                      />
             </label>
            </div>
            
             <h2> Personal Details</h2>
                   <form>
                           <div className='user__input'>
                               <p>Enter Your Name</p>
                               <div className='user__input--style' style={{borderColor: ``}}>
                                   <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                               </div>
                           </div>
       
                           <div className='user__input'>
                               <p>Enter Your Phone</p>
                               <div className='user__input--style' style={{borderColor: ``}}>
                                   <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                               </div>
                           </div>
       
                           <div className='user__input'>
                               <p>Enter Your Address</p>
                               <div className='user__input--style' style={{borderColor: ``}}>
                                   <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                               </div>
                           </div>
       
                           <button style={{backgroundColor: `green`,color: 'white'}} onClick={handleSubmit}>Save</button>
                          
                   </form>
                   <h2> Scan Vandore QR</h2>
                   <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        /> 
          </div>
         

         
          <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: '#f0c14b'}}>
          Your data was upated
        </div>
        <div className='modal__button' style={{margin: '10px auto', backgroundColor: '#3E67D0',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpen(false)}>
          Okay
        </div>
    </div>
 
</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={openImage}
  
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: '#f0c14b'}}>
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

export default MobileAppHome
