import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const MeteoDetails = () => {
    const [city, setCity] = useState(null);
    const [cityFour, setCityFour] = useState(null);
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchMeteo();

    }, []);

    const fetchMeteo = () => {
        console.log(params)
        const API_KEY = '4581ed4a75ffef0475104ebe50dad4bb';
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
                fetchFour(data.coord.lon, data.coord.lat)
            })
            .catch((error) => {
                console.error('ERRORE!', error);
                setIsLoading(false);
                setIsError(true);
            });


        const fetchFour = (lon, lat) => {

            const API_KEY = '4581ed4a75ffef0475104ebe50dad4bb';
            const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`;

            fetch(URL)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Errore nella chiamata, response non OK');
                    }
                })
                .then((data) => {
                    setCityFour(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('ERRORE!', error);
                    setIsLoading(false);
                    setIsError(true);
                });
        }
    }

    return (
        <Container className=" h-100">
            <Row className="justify-content-center m-3">
                <Col xs={12} sm={12} md={12} lg={6} className="text-center">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Errore nel caricamento dei dati meteo</p>
                    ) : city ? (
                        <Card>
                            <Card.Body>
                                <Card.Title>{city.name}</Card.Title>
                                <Card.Img
        variant="top"
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
      className='w-25'
      />
                                <Card.Text>
                                    {city.weather[0].description}
                                </Card.Text>
                                <Card.Text>
                                   max: {city.main.temp_max}&#176;C
                                </Card.Text>
                                <Card.Text>
                                   min: {city.main.temp_min}&#176;C
                                </Card.Text>
                                <Card.Text>
                                   umidità: {city.main.humidity}%
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    ) : (
                        <p>Nessun dato meteo disponibile</p>
                    )}
                </Col>

            </Row >
            {cityFour && (<Row className="justify-content-center m-3 g-2">

                {cityFour.list.map((meteo) => (
                    <Col key={meteo.dt} xs={6} sm={6} md={4}   lg={3} xl={2}>
                        <Card>
                            <Card.Body>
                            <Card.Img
        variant="top"
        src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
      className='w-25'
      />
                                <Card.Title>{meteo.dt_txt}</Card.Title>
                                <Card.Text>
                                    {meteo.weather[0].description}
                                </Card.Text>
                                <Card.Text>
                                    max: {meteo.main.temp_max}&#176;C
                                </Card.Text>
                                <Card.Text>
                                   min: {meteo.main.temp_min}&#176;C
                                </Card.Text>
                                <Card.Text>
                                    umidità: {meteo.main.humidity}%
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>))}
            </Row>)}

        </Container>
    )
}

export default MeteoDetails;

