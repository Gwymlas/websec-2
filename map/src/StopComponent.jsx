import React from "react";
import { useNavigate } from 'react-router-dom';

import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';


const myIcon = new Icon({
  iconUrl: require('./stop_icon.png'),
  iconSize: [40, 40], 
});


function StopComponent({stop, handleStopSelect, addFavouriteStop}) {

  const  navigate = useNavigate();
    
  return (
      <Marker key={stop.KS_ID} 
              position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}
              icon={myIcon}>
        <Popup>

        <Stack gap={3}>
        
              <h5>
                {stop.title}
              </h5>

              <Button size="sm"
                        onClick={() => {
                          handleStopSelect(stop);
                          navigate("/info");
                        }}>
                  Подробнее
              </Button>

              <Button size="sm"
                        onClick={()=> addFavouriteStop(stop)}>
                Добавить в избранное
              </Button>
        </Stack>

          {/* <Container>
            <Row>
              <h5>
                {stop.title}
              </h5>
            </Row>
            <Row>
              <Col className="my-auto">
                <Button size="sm"
                        onClick={() => {
                          handleStopSelect(stop);
                          navigate("/info");
                        }}>
                    Подробнее
                </Button>
              </Col>
              <Col className="my-auto">        
                <Button size="sm"
                        onClick={()=> addFavouriteStop(stop)}>
                  Добавить в избранное
                </Button>
              </Col>
            </Row>
          </Container> */}


        {/* <div>
          
          <div  onClick={() => console.log(stop.title)}>
            {stop.title}
          </div>
          <Button 
            size="sm"
            onClick={() => {
              handleStopSelect(stop);
              navigate("/info");
            }}>
              Подробнее
          </Button>
          <Button size="sm"
                  onClick={()=> addFavouriteStop(stop)}>
            Добавить в избранное
          </Button>
        </div> */}
        </Popup>

      </Marker>

      
  );
}

export default StopComponent