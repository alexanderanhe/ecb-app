import React, { useState, useEffect } from 'react'
import { Button, Card, CardColumns, Spinner, Modal, Form, Image } from 'react-bootstrap';
import './App.css';

function App() {
  const [cars, setCars] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [car, setCar] = useState({
    id: '',
    name: '',
    image: ''
  })
  const [values, setValues] = useState({
    name: '',
    delivery_date: '',
    place: '',
    detail: '',
  });

  const apiUrl = 'https://ecb-api.herokuapp.com'


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${apiUrl}/cars`, {
      method: 'POST',
      body: JSON.stringify({...values, id: car.id})
    })
      .then(res => res.json())
      .then(
        (result) => {
          handleClose()
        },
        (error) => {
          handleClose()
          // setError(error);
        }
      )
  }

  const openMaintenanceModal = (car) => {
    setCar(car)
    handleShow()
  }

  useEffect(() => {
    fetch(`${apiUrl}/cars`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCars(result);
        },
        (error) => {
          setIsLoaded(true);
          // setError(error);
        }
      )
  }, [])
  
  if (!isLoaded) {
    return (
      <div className="App">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  } else {
    return (
      <div className="App">
        <CardColumns>
          {cars.map(car => (
            <Card border="secondary" key={ car.id }>
              <Card.Img variant="top" src={ car.image } />
              <Card.Body>
                <Card.Title>{ car.make }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ car.model }</Card.Subtitle>
                <Card.Text>
                  { car.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">km { car.km } | date: { car.estimatedate }</small>
              </Card.Footer>
              <Card.Body>
                <Card.Link href="#" onClick={() => openMaintenanceModal(car)}>Maintenance</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Set Maintenance { car.make }</Modal.Title>
          </Modal.Header>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ car.image } />
          </Card>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Person</Form.Label>
                <Form.Control onChange={handleChange('name')} type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Deliver Date</Form.Label>
                <Form.Control onChange={handleChange('delivery_date')} type="date" placeholder="" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Place</Form.Label>
                <Form.Control onChange={handleChange('place')} as="select">
                <option values="AZ">Phoenix</option>
                <option values="AZ">Tucson</option>
                <option values="CA">Los Ángeles</option>
                <option values="CA">Oakland</option>
                <option values="CA">San Diego</option>
                <option values="CA">San Francisco</option>
                <option values="CA">San José</option>
                <option values="CO">Denver</option>
                <option values="FL">Miami</option>
                <option values="IL">Chicago</option>
                <option values="MS">Boston</option>
                <option values="NE">Omaha</option>
                <option values="NV">Las Vegas</option>
                <option values="NJ">Newark</option>
                <option values="NY">New York City</option>
                <option values="TX">Austin</option>
                <option values="TX">Dallas</option>
                <option values="TX">San Antonio</option>
                <option values="TX">Houston</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Detail</Form.Label>
                <Form.Control as="textarea" onChange={handleChange('detail')} rows={3} placeholder="Descripción del mantenimiento" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }

}

export default App;
