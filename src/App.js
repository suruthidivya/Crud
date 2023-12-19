
import './App.css';
import AddTask from './components/AddTask';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import TasksLists from './components/TasksLists';


function App() {
  return (
    <>
    <Container>
      <Navbar/>
      <Row className='justify-content-center'>
        <Col lg="5">
        <AddTask/>
        </Col>
        <TasksLists/>
      </Row>
       
        
        
    
    </Container>
    </>
  );
}

export default App;
