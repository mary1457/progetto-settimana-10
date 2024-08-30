import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const MeteoDetails = () => {
    const [city, setCity] = useState(null);
    const [cityFour, setCityFour] = useState(null);
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchMeteo();
    }, []);

    const fetchMeteo = () => {
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
                fetchFour(data.coord.lon, data.coord.lat);
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
                    const groupedData = groupByTimeOfDay(data.list);
                    setCityFour(groupedData);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('ERRORE!', error);
                    setIsLoading(false);
                    setIsError(true);
                });
        };
    };

    
    const groupByTimeOfDay = (list) => {
        return list.reduce((acc, current) => {
            const date = current.dt_txt.split(' ')[0]; 
            const time = current.dt_txt.split(' ')[1]; 
            const hour = parseInt(time.split(':')[0], 10); 

            let period = '';
            if (hour >= 6 && hour < 12) {
                period = 'Mattina';
            } else if (hour >= 12 && hour < 18) {
                period = 'Pomeriggio';
            } else {
                period = 'Notte';
            }

            if (!acc[date]) {
                acc[date] = {
                    Mattina: null,
                    Pomeriggio: null,
                    Notte: null,
                };
            }

           
            if (!acc[date][period]) {
                acc[date][period] = current;
            }

            return acc;
        }, {});
    };


    const formatDateItalian=(dateStr)=> {
      
        const date = new Date(dateStr);
    
       
        const giorniSettimana = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    
      
        const giornoSettimana = giorniSettimana[date.getDay()];
    
      
        const giorno = date.getDate().toString().padStart(2, '0');
        const mese = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const anno = date.getFullYear();
    
      
        return `${giornoSettimana} ${giorno}/${mese}/${anno}`;
    }
    

    return (
        <Container className="h-100">
            <Row className="justify-content-center m-3">
                <Col xs={12} sm={12} md={12} lg={6} className="text-center">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Errore nel caricamento dei dati meteo</p>
                    ) : city ? (
                        <Card className='cdblu'>
                            <Card.Body className='text-white'>
                                <Card.Title>{city.name}</Card.Title>
                                <Card.Img
                                    variant="top"
                                    src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                    className="w-25"
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
            </Row>

            {cityFour && (
                <Row className="justify-content-center m-3 g-2">
                    {Object.keys(cityFour).map((date) => (
                        <Col key={date} xs={12} >
                            <Card className='cdblu'>
                                <Card.Body className='text-white'>
                                    <Card.Title>{formatDateItalian(date)}</Card.Title>
                                    <Row className='d-flex  '>
                                        
                                        {['Mattina', 'Pomeriggio', 'Notte'].map((period) => (
                                        <Col key={period} className='text-center p-3'>
                                            <Card.Subtitle className="mb-2 ">
                                                {period}
                                            </Card.Subtitle>
                                            {cityFour[date][period] ? (
                                                <div>
                                                    <Card.Img
                                                        variant="top"
                                                        src={`https://openweathermap.org/img/wn/${cityFour[date][period].weather[0].icon}@2x.png`}
                                                        className="w-25"
                                                    />
                                                    <Card.Text>
                                                        {cityFour[date][period].weather[0].description}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Temp: {cityFour[date][period].main.temp}&#176;C
                                                    </Card.Text>
                                                </div>
                                            ) : (
                                                <Card.Text>Nessun dato disponibile</Card.Text>
                                            )}
                                        </Col>
                                    ))}
                                       
                                    </Row>
                                   
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MeteoDetails;
