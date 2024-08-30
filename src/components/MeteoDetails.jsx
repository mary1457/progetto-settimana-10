import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Spinner, Alert, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const MeteoDetails = () => {
  const [city, setCity] = useState(null);
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMeteo();
  }, []); 

  const fetchMeteo = () => {
    console.log(params)
    const API_KEY = '69ca7ca347f4f6d5442d175465b92a61';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${params.cityId},IT&appid=${API_KEY}&units=metric&lang=it`;
    
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Errore nella chiamata, response non OK');
        }
      })
      .then((data) => {
        setCity(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('ERRORE!', error);
        setIsLoading(false);
        setIsError(true);
      });
  }

  return (
    <Container className=" h-100">
    <Row className="justify-content-center  h-100 m-3">
      <Col xs={12} sm={12} md={12}   lg={6}  className="text-center">
        {isLoading ? (
            <p>Loading...</p>
        ) : isError ? (
            <p>Errore nel caricamento dei dati meteo</p>
        ) : city ? (
          <Card>
            <Card.Body>
              <Card.Title>{city.name}</Card.Title>
              <Card.Text>
                {city.weather[0].description}
              </Card.Text>
              <Card.Text>
                {city.main.temp_max}&#176;C
              </Card.Text>
              <Card.Text>
                {city.main.temp_min}&#176;C
              </Card.Text>
              <Card.Text>
                {city.main.humidity}
              </Card.Text>
         
            </Card.Body>
          </Card>
        ) : (
          <p>Nessun dato meteo disponibile</p>
        )}
      </Col>
    </Row>
    </Container>
  )
}

export default MeteoDetails;
