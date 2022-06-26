import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [items,setitems]=useState([]);

    useEffect(()=>{
        fetch('https://task-inventory.herokuapp.com/items')
        .then(res=>res.json())
        .then(data=>setitems(data))

    },[]);
    const selected=e=>{
        e.preventDefault();
    
       let mychoose=e.target.value;
       console.log(mychoose);

       fetch('https://task-inventory.herokuapp.com/items')
        .then(res=>res.json())
        .then(data=>{
            if(mychoose === 'all'){
              return  setitems(data);

            }

            const rem= data.filter(item=> item.category === mychoose)
            setitems(rem);
           
           
              
          });


    }

    const hendeleDelet=id=>{
      
        Swal.fire({
            title: 'Are you sure to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                const url=`https://task-inventory.herokuapp.com/items/${id}`;
                fetch(url,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                  const remain= items.filter(item=> item._id !== id)
                  setitems(remain);
                      
                });

              Swal.fire(
                'Deleted!',
                'Ihis Item has been deleted.',
                'success'
              )
            }
          })
    
    }

    return (
        <div>
            <section className='banner-css text-white '>
                <div className='w-75 text-center'>
                <h1 className='text-center css-banner-title'>Welcome  to <br /> Inventory Management System</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, quia ducimus nisi at dolore corrupti labore culpa est animi enim nobis repellat commodi impedit reprehenderit tenetur facere ex perferendis perspiciatis.
               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, quia ducimus nisi at dolore corrupti labore culpa est animi enim nobis repellat commodi impedit reprehenderit tenetur facere ex perferendis perspiciatis.</p>
               <button className='siginout-css'>Learn More</button>
                </div>

            </section>
            <section className='my-5'>
                <h1 className='text-center'>Inventory Items</h1>

                <h4 className='text-center my-5'>Total Items : {items.length} <br /> <br />
                <Link  to='/add'><button className='btn-add-css'><FontAwesomeIcon icon={faAdd}/> Add More Inventoty</button></Link>
                
                </h4>
                <h4 className='container mb-5'> Category wise sort : 
                      <select onClick={selected} className='p-1 custom-sort-css'>
                        <option value='all'>All</option>
                        <option value='Heigh'>Heigh</option>
                        <option value='Normal'>Normal</option>
                        <option value='Low'>Low</option>
                        </select></h4>
                
                <div>
                    {
                        items.map(item =>
                            
                            <div className='menagediv mx-3'>
                                <div className=''>
                                    <img width='200px' src={item.pic} alt="" />

                                </div>
                                <div>
                                <h3> Name: {item.name}</h3>
                                <h5>Price : $ {item.price} /unit</h5>
                                <h6>Quantity : {item.quantity} </h6>
                                <h6>{item.category}</h6>

                                </div>
                                <div>
                                  <Link to={'/update/'+item._id}> <button className='btn-update'>Update</button></Link> 
                                    <button onClick={()=>hendeleDelet(item._id)} className='btn-delete'><FontAwesomeIcon icon={faTrash}/> Delete</button>
                                </div>
                               

                            </div>

                        )
                    }

                </div>

            </section>
            

            
        </div>
    );
};

export default Home;