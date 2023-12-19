import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskInServer } from '../slices/taskSlice';

const UpdateTask = (props) => {
    const  {selectedTask} = useSelector((state)=>state.tasks);
    const [inputs, setInputs] = useState({
        id:" ",
        title: " ",
        price: " ",
        description:" ",
        image:" ",
        category:" "
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if(Object.keys(selectedTask).length !== 0) {
            setInputs({
                id: selectedTask.id,
                title:selectedTask.title,
                price:selectedTask.price,
                description:selectedTask.description,
                image:selectedTask.image,
                category:selectedTask.category
            })
        }
      
    },[selectedTask])
 const updateItem = () => {
    props.onHide();
    dispatch(updateTaskInServer({
        id:inputs.id,
        title:inputs.title,
        price:inputs.price,
        description:inputs.description,
        image:inputs.image,
        category:inputs.category
    }
       
    ))
 }

    return (
        <>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
    
     
    </Form>
      </Modal.Body>
      <Modal.Footer>
      <div className='text-end'>
        <Button variant="primary" type="submit" onClick={(e)=>updateItem(e)}>
            Update
        </Button>
      </div>
      </Modal.Footer>
    </Modal>
        </>
    )
}

export default UpdateTask;