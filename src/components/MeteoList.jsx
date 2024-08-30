import { useState, useEffect } from 'react';
import SingleMeteo from './SingleMeteo';
import { Col, Container, Form, Row } from 'react-bootstrap';

const MeteoList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [arrayMeteo, setArrayMeteo] = useState([]);
  
  useEffect(() => {
    console.log('SONO IN useEffect');
    const cities = ["Torino", "Milano", "Bologna", "Firenze", "Roma", "Napoli"];
    fetchAllMeteo(cities);
  }, []); 

  const fetchAllMeteo = async (cities) => {
    const API_KEY = '69ca7ca347f4f6d5442d175465b92a61';
    try {
      const responses = await Promise.all(cities.map(citta =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citta},IT&appid=${API_KEY}&units=metric&lang=it`)
      ));

      const meteoData = await Promise.all(responses.map(res => res.json()));

      setArrayMeteo(meteoData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error('ERRORE!', error);
    }
  };

  return (
    <>
    <Container>
      <Row className="justify-content-center m-3">
        <Col xs={12} md={8} lg={6} className="text-center">
          <Form.Group>
            <Form.Control
              type="search"
              placeholder="Cerca una città"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2 mb-3 ">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Errore nel caricamento dei dati meteo</p>
        ) : (
          arrayMeteo.map((meteo) => (
            <Col xs={12} sm={12} md={6}   lg={6} xl={4}

             key={meteo.id}>
              <SingleMeteo meteo={meteo} />
            </Col>
          ))
        )}
      </Row>
      </Container>
    </>
  );
};

export default MeteoList;
