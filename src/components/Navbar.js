import React from 'react';
import { useSelector } from 'react-redux';


const Navbar = () => {
   const {error} = useSelector((state)=>state.tasks);
 return (
   <>
    <h1 className='text-center my-4 text-primary'>CRUD OPERATIONS</h1>
    {
      (error !== '') ? <h5 className='text-center' style={{color:'red'}}>{error}</h5> : null
    }
    </>
 )
}
export default Navbar;