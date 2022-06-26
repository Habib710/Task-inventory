import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Update.css'

const Update = () => {
  const { id } = useParams()
  const [Item, setitem] = useState([])

  const [name, setnewname] = useState([])
  const [price, setnewprice] = useState([])
  const [quantity, setnewquantity] = useState([])
  const updated = {name, price, quantity };
 
  useEffect(() => {
    fetch(`http://localhost:5000/items/${id}`)
      .then((res) => res.json())
      .then((data) => setitem(data))
  }, [id,Item])

  const hendlename = (event) => {
    const name = event.target.value
    if (name) {
      setnewname(name)
    }
  }
  const hendleprice = (event) => {
    const price = event.target.value
    if (price) {
      setnewprice(price)
    }
  }
  const hendlequantity = (event) => {
    const quantity = event.target.value
    if (quantity) {
      setnewquantity(quantity)
    }
  }
  const onsubmit=event=>{
    event.preventDefault();
    const newupdate={updated}
    fetch(`http://localhost:5000/items/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'


            },body: JSON.stringify(newupdate)
        })
        .then(res=>res.json())
        .then(data=>{
            setitem(data);
          
        });
        Swal.fire({
            icon:'success',
            title: 'Item Updated Sucessfuly ',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })

          event.target.reset();
  

  }


  return (
    <div>
      <h1 className="text-center my-5">Update This items</h1>
      <h3 className="text-center my-3">Name : {Item.name} </h3>
      <h4 className="text-center">
        price : $ {Item.price} & Quantity : {Item.quantity}
      </h4>
      <div className="text-center  my-5">
        <form onSubmit={onsubmit} className="div-css m-auto">
          <label>Update Name : </label> <br />
          <input onBlur={hendlename} type="text" /> <br /> <br />
          <label>Update Price : </label> <br />
          <input onBlur={hendleprice} type="number" /> <br /> <br />
          <label>Update Quantity : </label> <br />
          <input onBlur={hendlequantity} className="my-3" type="number" />
          <input  className="btn-update-css" type="submit" value="Update Now" />
        </form>
      </div>
    </div>
  )
}

export default Update
