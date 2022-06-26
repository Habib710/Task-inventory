import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import './Add.css';


const AddNewItems = () => {

   
    const [name,setname]=useState([]);
    const [price,setprice]=useState([]);
    const [quantity,setquantity]=useState([]);
    const [pic,setimg]=useState([]);
    const [category,setcategory]=useState("heigh");
    const additems={name,price,pic,quantity,category};
 
 
    const hendlename=event=>{
        const newname=event.target.value;
        if(newname){
        setname(newname)};
        
            
        
    }
    const hendleprice=event=>{
        const newprice=event.target.value;
        if(newprice){
        setprice(newprice)}
        
    }
    const hendlequantity=event=>{
        const newquantity=event.target.value;
        
        if(newquantity){
        setquantity(newquantity)}
    }

    const hendleimage=event=>{
        const newimage=event.target.value;
        if(newimage){
        setimg(newimage)}
    }
    const hendleselect=event=>{
        const newcategory=event.target.value;
        console.log(newcategory);
        setcategory(newcategory)

    }
   

    const Onsubmit=event=>{ 
        event.preventDefault();
        
        if(!additems){
            return alert("input plz")
        }
        console.log(additems);

        const url=`https://task-inventory.herokuapp.com/items`;
        fetch(url,{

            method:'POST',
            headers:{
                
                'content-type':'application/json'
            },
            body:JSON.stringify(additems)
        })
        .then(res=>res.json())
        .then(data=>{
           
            Swal.fire({
                icon:'success',
                title: 'Item Added Sucessfuly ',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
        })

        event.target.reset();
    
      
        
    };

    
    return (
        <div className=''>
            
            <div className='container main-add-css my-5'>

            <div className=' mx-auto '>

            <form onSubmit={Onsubmit} className='form-add-css p-5 mb-5 container'>
            <h3 className='text-center my-5'>Complete the form to Add New Item</h3>

                <label htmlFor="">Item Name</label><br />
                <input onBlur={hendlename} placeholder='Item name'  type="text"required /><br /><br />
                
                <label htmlFor="">Price</label><br />
                <input onBlur={hendleprice} placeholder='price' type="number" required/><br /><br />
                <label htmlFor="">Item Quantity</label><br />
                <input onBlur={hendlequantity} placeholder='Quantity' type="number"required /><br /><br />
                <label htmlFor="">Item  Category</label><br />
                <select onBlur={hendleselect} className='w-100'>
                <option value="Heigh">Heigh</option>
                 <option value="Normal">Normal</option>
                 <option value="Low">Low</option>
                </select>
                <br /><br />
                <label htmlFor="">Item Image url</label><br />
                <input onBlur={hendleimage} placeholder='url' type="url" required/><br /><br />
               
                <br />
                <input   className='btn-add' value='Add Now' type="submit" />

            </form>
            </div>
            </div>         
        </div>
    );
};

export default AddNewItems;