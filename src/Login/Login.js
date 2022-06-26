import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { faEnvelope, faLock,   } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';


const Login = () => {
    let location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const navigate=useNavigate();

    const [email,setemail]=useState([]);
    const [password,setpassword]=useState([]);
   
   

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const [signInWithGoogle,user1] = useSignInWithGoogle(auth);

      const [sendPasswordResetEmail] = useSendPasswordResetEmail(
        auth
      );
     

    const emailhendle=event=>{
        setemail(event.target.value);
        

    }
    const passwordhendle=event=>{
       setpassword(event.target.value);
       
    }
    const login=event=>{
        event.preventDefault()
        signInWithEmailAndPassword(email, password)
    }
    if(loading){
        return <Loading></Loading>
    }
    

    if(user ||user1){
  
      navigate(from, { replace: true });
// ok messeage
        Swal.fire({
            icon:'success',
            title: 'Login Success  ',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })

          
        
        
    }

    return (
        <div className='login-main-div py-5 px-2'>
            <div className=' container  form-custom-css'>
            
            <Form onSubmit={login} className='form-input-css'>
            <h3>Login</h3>
                <div className='input-css'>


                <span className='d-flex align-items-center  justify-content '><FontAwesomeIcon className='mt-4 me-2' icon={faEnvelope} /> 
                 <input onBlur={emailhendle} type="email"  placeholder=' Your Email'/></span>


                 <span className='d-flex align-items-center  justify-content '><FontAwesomeIcon className='mt-4 me-2' icon={faLock} /> 
               <input onBlur={passwordhendle} type="password"   placeholder=' Your Password' required/></span>


               </div>
               
               {
                   error?  <p className='text-danger'>Not found Or Invalid email or Password</p>:''
               }
               
               <br /><br />
               <input className='submit-css' type="submit" value='Login' />
               </Form>

               <p>New To Inventory ? <Link className='link-css'to='/signin'>Register Now </Link></p>
               <p>Forget password ? 
                <button onClick={async () => {
                   if(email.length<3){
                       return (Swal.fire({
                        
                        title: 'Valid Email Must be Needed',
                        
                    
                      }))
                   }
          await sendPasswordResetEmail(email);
          Swal.fire({
                        
            title: 'Email send',
            text:' Please Check your inbox or spam '
        
          })

          }}

           className='btn text-primary'> Reset password</button> </p>
         
              
               OR
               <br />
              
               <button  onClick={()=>signInWithGoogle()} className='submit-css
                  mb-4'>Sing in With Google</button>
               
           
        </div>
            
        </div>
    );
};

export default Login;