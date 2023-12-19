import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addTaskToServer } from '../slices/taskSlice';



const AddTask = () => {
    const dispatch = useDispatch();
   
    const [inputs, setInputs] = useState({
        title: " ",
        price: " ",
        description:" ",
        image:" ",
        category:" "
    });

    const addTask = (e) => {
        e.preventDefault();
      
        dispatch(addTaskToServer({
            title:inputs.title,
            price:inputs.price,
            description:inputs.description,
            image:inputs.image,
            category:inputs.category
        }));
       
       setInputs({
        title: " ",
        price: " ",
        description:" ",
        image:" ",
        category:" "
       })

    }

  return (
    <>
    <section className='my-5'>
        <Form>
        <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" value={inputs.title} onChange={(e)=>setInputs({...inputs,title:e.target.value})}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" value={inputs.price} onChange={(e)=>setInputs({...inputs,price:e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" value={inputs.description} onChange={(e)=>setInputs({...inputs,description:e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Image">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Enter Image" value={inputs.image} onChange={(e)=>setInputs({...inputs,image:e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter Category"  value={inputs.category} onChange={(e)=>setInputs({...inputs,category:e.target.value})}/>
      </Form.Group>
      <div className='text-end'>
        <Button variant="primary" type="submit" onClick={(e)=>addTask(e)}>
            Submit
        </Button>
      </div>
     
    </Form>
    </section>
    </>
  )
}
export default AddTask;