import React from 'react'
import ScrollToTop from '../components/ScrollToTop'
import SignIn from '../components/Signin'

function SigninPage() {
    return (
       <div className='landingCss'>
        <ScrollToTop />
          <SignIn /> 
        </div>
    )
}

export default SigninPage
