import React from "react";
// import InfoComponent from "./InfoComponent";

import {Marker, Popup, useMap } from 'react-leaflet';


function StopComponent({stop, handleShowInfo, handleStopSelect}) {

    const map = useMap();
    
    return (
        <Marker key={stop.KS_ID} position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}>
          <Popup>
          <div>
            {/* <p>{stop.title}</p> */}
            <div  onClick={() => console.log(stop.title)}>
              {stop.title}
            </div>
            <button onClick={() => {
              handleShowInfo(true);
              handleStopSelect(stop);
              }}>
                Подробнее
            </button>
          </div>
          </Popup>

        </Marker>

        
    );
}

export default StopComponent