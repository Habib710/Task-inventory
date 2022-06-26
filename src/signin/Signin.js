import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';


const SingUp = () => {
    const [email,setemail]=useState([]);
    const [displayName,setdisplayName]=useState([]);
    const [password,setpassword]=useState([]);
    const [conpass,setconpass]=useState([]);
    const [errors,seterrors]=useState([]);
    const [photoURL,setphotoURL]=useState('vvuut.gifyf');

    let location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const navigate=useNavigate();

    const [updateProfile] = useUpdateProfile(auth)

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});

      const [signInWithGoogle,user1] = useSignInWithGoogle(auth);


    const NameHendle =event=>{

      setdisplayName(event.target.value);
    }
    const emailhendle=event=>{
        if(event.target.value <5){
             return seterrors("Please Input Email ")
        }
        setemail(event.target.value);
        

    }
    const passwordhendle=event=>{
       setpassword(event.target.value);
       
    }
    const conpasshendle=event=>{
        setconpass(event.target.value);
    }
    const  onsubmit=  (event)=>{
        event.preventDefault()
       

        if(password !==conpass){
            return seterrors("Your two password didn't match")
        }
        if(password<6){
            return seterrors('Password must be more then 6 number/letter')
        }

        createUserWithEmailAndPassword(email, password);

       

        


    }
    if(loading){
        return <Loading></Loading>
    }
    if(user || user1){

        
        navigate(from, { replace: true });
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
          if(user){

            updateProfile({ displayName, photoURL })
         }
    }
    return (
        <div className='py-5 px-2 d-lg-flex  align-items-center  singup-custom-div'>
        
            <div className=' container singup-custom  form-custom-css '>
            
            <Form onSubmit={onsubmit} className='form-input-css'>
            <h3>Register</h3>
                <div className='input-css'>
                <span className='d-flex align-items-center   '><FontAwesomeIcon className='mt-4 me-2' icon={faUser} /> 
                 <input onBlur={NameHendle} type="text" placeholder=' Your Name'/></span>

                <span className='d-flex align-items-center  '><FontAwesomeIcon className='mt-4 me-2' icon={faEnvelope} /> 
                 <input onBlur={emailhendle} type="email"  placeholder=' Your Email'/></span>

                 <span className='d-flex align-items-center  nt '><FontAwesomeIcon className='mt-4 me-2' icon={faLock} /> 
               <input onBlur={passwordhendle} type="password"   placeholder=' Your Password'/></span>
               

                 <span className='d-flex align-items-center   '><FontAwesomeIcon className='mt-4 me-2' icon={faLock} /> 
               <input onBlur={conpasshendle} type="conpassword"  placeholder='Confrim Your Password'/></span>
               </div><br />
               <h6 className='text-danger'>{
                   errors?errors:''
                   }
                   {
                       error?error:''
                   }
                
                   </h6>
               
               
               <input className='submit-css w-50' type="submit" value='Register' />
               <br />
               <br />
               <p>Have an account ? <Link className='link-css' to='/login'>Login Now </Link></p>
            
              
               OR
              
               <br />
               <button onClick={()=>signInWithGoogle()} className='submit-css w-50'>Google Sing in</button>
               
           </Form>
        </div>
            
        </div>
    );
};

export default SingUp;