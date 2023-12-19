import React, {useEffect, useState} from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import UpdateTask from './UpdateTask';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTask, removeFromList, delTaskFromServer } from '../slices/taskSlice';
import { getTasksfromServer } from '../slices/taskSlice';

const TasksLists = () => {
    const {tasksList} = useSelector(store=>store.tasks);
   
    const dispatch = useDispatch();

    useEffect(()=>{
     
        dispatch(getTasksfromServer())
    },[dispatch]);

    const [modalShow, setModalShow] = useState(false);

    const updateTask = (task) => {
        setModalShow(true);
        dispatch(setSelectedTask(task))
    }
    const deleteTask = (task) => {
        console.log('task deleted');
        dispatch(delTaskFromServer(task))
        .unwrap()
        .then(()=>{
            dispatch(removeFromList(task))
        }
        )
    }

    return (
        <>
            <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>#</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            tasksList && tasksList.map((task, index)=> {
                return (
                    <tr className='text-center' key={task.id}>
                        <td>{index + 1}</td>
                        <td width="20%">{task.title}</td>
                        <td>{task.price}</td>
                        <td width="20%">{task.description}</td>
                        <td width="10%"><Image src={task.image} thumbnail /></td>
                        <td>{task.category}</td>
                        <td>
                            <Button variant="primary" className='mx-3' onClick={()=>updateTask(task)}><i class="bi bi-pencil-square"></i></Button>
                            <Button variant="primary" onClick={()=>deleteTask(task)}><i class="bi bi-trash"></i></Button>
                        </td>
                    </tr>
                )
            })
        }
        
        
       
      </tbody>
    </Table>

    <UpdateTask
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        </>
    )
}
export default TasksLists;