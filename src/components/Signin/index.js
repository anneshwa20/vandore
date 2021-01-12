import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authMain, dbMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon , Text } from './signElements'

function SignIn() {
    const  [{user,site_colors,sidebar,site_info,user_details},dispatch]= useStateValue();
    const history= useHistory();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');

    if(user) {
      
        
        if(user_details.business){
            history.push(`/restro/dashboard/${user_details.business}`);
        }
     
      
  }
   

    const signIn = (e)=> {
       e.preventDefault();

       authMain.signInWithEmailAndPassword(email,password)
           .then(auth => {
               

              
                dbMain.collection('userList').doc(auth.user.uid)
                .onSnapshot(function(doc) {
                    if(doc.data().business){
                        history.push(`/restro/dashboard/${doc.data().business}`);
                    }
                    else {
                        history.push(`/`);
                    }
                
                });
            
           }).catch(error => alert(error.message));
    }
   
    return (
        <>
          <Container>
              <FormWrap>
                  <Icon to='/'> VANDORE </Icon>
                  <FormContent>
                      <Form onSubmit={signIn}>
                          <FormH1>Sign in to your account </FormH1>
                          <FormLabel htmlFor='for' >Email</FormLabel>
                          <FormInput type='email' required value={email} onChange={e => setEmail(e.target.value)}/>
                          <FormLabel htmlFor='for' >Password</FormLabel>
                          <FormInput type='password' required value={password} onChange={e => setPassword(e.target.value)}/>
                          <FormButton type='submit' >Continue</FormButton>
                       
                     </Form>
                  </FormContent>
              </FormWrap>
          </Container>  
        </>
    )
}

export default SignIn
