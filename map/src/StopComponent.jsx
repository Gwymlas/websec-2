import React from "react";
import { useNavigate } from 'react-router-dom';

// import InfoComponent from "./InfoComponent";

import { Marker, Popup } from 'react-leaflet';


function StopComponent({stop, handleStopSelect, addFavouriteStop}) {

  const  navigate = useNavigate();
    
  return (
      <Marker key={stop.KS_ID} position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}>
        <Popup>
        <div>
          
          <div  onClick={() => console.log(stop.title)}>
            {stop.title}
          </div>
          <button onClick={() => {
            handleStopSelect(stop);
            navigate("/info");
            }}>
              Подробнее
          </button>
          <button onClick={()=> addFavouriteStop(stop)}>
            Добавить в избранное
          </button>
        </div>
        </Popup>

      </Marker>

      
  );
}

export default StopComponent