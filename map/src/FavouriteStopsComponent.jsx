import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FavouriteStopsComponent = ({favouriteStops, removeFavouriteStop, handleStopSelect}) => {
    const  navigate = useNavigate();

    if (favouriteStops.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <h3>
                    Список пуст
                </h3>
            </div>
        )
    }

    return (
        <ListGroup>
            {favouriteStops && favouriteStops.map(stop => {
                return (
                    <ListGroup.Item 
                        className="d-flex justify-content-center align-items-center"
                        key={stop["KS_ID"]}>
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