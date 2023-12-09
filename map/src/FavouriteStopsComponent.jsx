import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FavouriteStopsComponent = ({favouriteStops, removeFavouriteStop, handleStopSelect}) => {
    const  navigate = useNavigate();


    return (
        <ListGroup>
            {favouriteStops && favouriteStops.map(stop => {
                return (
                    <ListGroup.Item key={stop["KS_ID"]}>
                        {stop["title"]}

                        <Button 
                            variant="primary"
                            size="sm"
                            onClick={() => {
                                handleStopSelect(stop);
                                navigate("/map");
                            }}
                            style={{ marginLeft: '10px' }}
                        >
                            Перейти
                        </Button>

                        <Button 
                            variant="danger"
                            size="sm"
                            onClick={() => removeFavouriteStop(stop)}
                            style={{ marginLeft: '10px' }}
                        >
                            Удалить
                        </Button>
                    </ListGroup.Item>
                )         
            })}
            
        </ListGroup>
     );
}

export default FavouriteStopsComponent