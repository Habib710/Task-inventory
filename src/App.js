import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import Add from './Additems/Add'
import Header from './Header/Header'
import Home from './Home/Home'
import Login from './Login/Login'
import Profile from './Profile/Profile'
import Signin from './signin/Signin'
import Requeir from './Requeir/Requeir'
import Update from './Update/Update'
import Footer from './Footer/Footer'

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Requeir><Home></Home></Requeir>}></Route>
        <Route path="/home" element={<Requeir><Home></Home></Requeir>}></Route>
        <Route
          path="/add"
          element={
            <Requeir>
              <Add></Add>
            </Requeir>
          }
        ></Route>
        <Route path="/update/:id" element={<Update></Update>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route
          path="/profile"
          element={
            <Requeir>
              <Profile></Profile>
            </Requeir>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
