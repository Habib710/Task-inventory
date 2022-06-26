// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzDzPx6x-Oh2HMJlWK8G0W5KFMC8Hx2rw",
  authDomain: "task-inventroy.firebaseapp.com",
  projectId: "task-inventroy",
  storageBucket: "task-inventroy.appspot.com",
  messagingSenderId: "636512393186",
  appId: "1:636512393186:web:b8144afd729975fbc10bbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

 export default auth ;