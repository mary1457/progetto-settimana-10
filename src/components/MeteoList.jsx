import { useState, useEffect } from 'react';
import SingleMeteo from './SingleMeteo';
import { Col, Container, Form, Row ,Button} from 'react-bootstrap';

const MeteoList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cardMeteo, setCardMeteo] = useState({});
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

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    if (searchQuery.trim() === '') {
      return;
    }

   
    
    
      const API_KEY = '69ca7ca347f4f6d5442d175465b92a61';
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery},IT&appid=${API_KEY}&units=metric&lang=it`;
      
      fetch(URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Errore nella chiamata, response non OK');
          }
        })
        .then((data) => {
        setCardMeteo(data)
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('ERRORE!', error);
          setIsLoading(false);
          setIsError(true);
        });


    // Reset dell'input dopo l'invio
    setSearchQuery('');
  };


  return (
    <>
    <Container>
    <Row className="justify-content-center m-3">
  <Col xs={12} md={8} lg={6} className="text-center">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formInput" className="d-flex">
        <Form.Control
          type="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Cerca una città"
          className="me-2" 
        />
        <Button variant="primary" type="submit">
          Cerca
        </Button>
      </Form.Group>
    </Form>
  </Col>
</Row>

      <Row>
    <Col>
    {Object.keys(cardMeteo).length>0 ?(  <SingleMeteo meteo={cardMeteo}> </SingleMeteo>)
    :( <Row className="g-2 mb-3 ">

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
      </Row>)}
  
    </Col>
</Row>
     




      </Container>
    </>
  );
};

export default MeteoList;

