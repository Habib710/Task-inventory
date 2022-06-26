import React, { useState } from 'react'
import {
  useAuthState,
  useUpdatePassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth'
import Swal from 'sweetalert2'
import auth from '../firebase.init'
import './Profile.css';
import 'animate.css'

const Profile = () => {
  const [user] = useAuthState(auth)
  const [password, setPassword] = useState('')
  const [updatePassword, updating, error] = useUpdatePassword(auth)

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [updateProfile] = useUpdateProfile(auth)
  console.log(user);
  return (
    <div>
      <div className="text-center m-lg-5 myplate">
        <img  width='150px'  className="p-3 " src={user.photoURL} alt="img" />
        <h2 className="p-2"> Name : {user.displayName}</h2>
        <h4>Email Address : {user.email}</h4>
      </div>
      <div className="customprofile-css my-5 p-5">
        <div className=''>
          <h4 className="py-3">Update </h4>
          <label>Name</label> : <br />
          <input
            className="uptade-pro-input"
            type="displayName"
            value={displayName}
            placeholder="Update your name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <br /> <br />
          <label>Photo URL</label> : <br />
          <input
            className="uptade-pro-input"
            type="url"
            value={photoURL}
            placeholder="URL"
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <br /> <br />
          <button
            className="btn-grad"
            onClick={async () => {
              await updateProfile({ displayName, photoURL })
              Swal.fire({
                title: 'Profile updated  ',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }}
          >
            Update profile
          </button>
        </div>

        <div>
          <h4 className='my-5'>Change password</h4>
          <input className='uptade-pro-input'
          placeholder='Update Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <br /> <br />
          <button
            className="btn-grad"
            onClick={async () => {
              await updatePassword(user.email)
              Swal.fire({
                title: 'Password updated  ',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }}
          >
            Update password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
