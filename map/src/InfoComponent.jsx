import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfoComponent = ({selectedStop, show, onHide}) => {
   const [info, setInfo] = useState();


   const loadDataByID = async(stop) => {
      if (stop) {
         let ks_id = stop["KS_ID"];
         const response = await axios("http://localhost:5005/getStopById", {params: {KS_ID: ks_id}} );
         const data = await response.data;
         return data;
      }
    }

   useEffect(() => {
    loadDataByID(selectedStop).then(result => {setInfo(result); console.log("loadDatabyID " + result);});
    }, [selectedStop]);
 

   if (!info) return (<div>...</div>)

   return (
      <div className="value-window">
      
         <p>Название: {info["title"]}</p>
         <p>Улица: {info["adjacentStreet"]}</p>
         <p>Направление движения: {info["direction"]}</p>
         <p>Муниципальные автобусы: {info["busesMunicipal"]}</p>
      </div>
   );
};

export default InfoComponent;