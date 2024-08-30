import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const SingleMeteo = ({meteo}) => {
    const navigate = useNavigate()
  return (
   
<Card >

<Card.Body>
  <Card.Title>{meteo.name}</Card.Title>
  <Card.Text>
  {meteo.weather[0].description}
  </Card.Text>
  <Card.Text>
  {meteo.main.temp}&#176;
  </Card.Text>
  
  <Button variant="primary"
   onClick={() => {
    navigate('/city-details/'+meteo.name) 
  }}
  >Vai ai dettagli</Button>
</Card.Body>
</Card>
  );
}

export default SingleMeteo;

