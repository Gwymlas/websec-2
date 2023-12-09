import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import PredictionForTransport from './PredictionComponent';


const InfoComponent = ({selectedStop}) => {
   const [stopInfo, setStopInfo] = useState();
   const [predictionForStop, setPredictionForStop] = useState();
   const [predictionShow, setPredictionShow] = useState(false);
   const [selectedTransport, setSelectedTransport] = useState("");


   const loadDataByID = async(stop) => {
      if (stop) {
         let ks_id = stop["KS_ID"];
         const response = await axios("http://localhost:5005/getStopById", {params: {KS_ID: ks_id}} );
         const data = await response.data;
         return data;
      }
    };

   const loadFirstArrivalToStop = async(stop) => {
      if (stop) {
         let ks_id = stop["KS_ID"];
         const response = await axios("http://localhost:5005/getFirstArrivalToStop", {params: {KS_ID: ks_id}} );
         const data = await response.data;
         return data; 
      }
   }

   useEffect(() => {
      loadDataByID(selectedStop).then(result => {setStopInfo(result)});
   }, [selectedStop]);
   
   
   useEffect(()=> {
      loadFirstArrivalToStop(selectedStop).then(result => {setPredictionForStop(result)});
   }, [selectedStop]);
   

   if (!stopInfo) return (<div>...</div>)

   return (
      <>
      
         <h2>Информация об остановке</h2>

         {stopInfo["title"] && <p>Название: {stopInfo["title"]}</p>}
         {stopInfo["adjacentStreet"] && <p>Улица: {stopInfo["adjacentStreet"]}</p>}
         {stopInfo["direction"] && <p>Направление движения: {stopInfo["direction"]}</p>}
         {stopInfo["busesMunicipal"] && <p>Муниципальные автобусы: {stopInfo["busesMunicipal"]}</p>}
         {stopInfo["busesCommercial"] && <p>Коммерческих автобусы: {stopInfo["busesCommercial"]}</p>}
         {stopInfo["busesPrigorod"] && <p>Пригородные автобусы: {stopInfo["busesPrigorod"]}</p>}
         {stopInfo["busesSeason"] && <p>Сезонные автобусы: {stopInfo["busesSeason"]}</p>}
         {stopInfo["busesSpecial"] && <p>Специальные автобусы: {stopInfo["busesSpecial"]}</p>}
         {stopInfo["busesIntercity"] && <p>Междугородные автобусы: {stopInfo["busesIntercity"]}</p>}
         {stopInfo["trams"] && <p>Трамваи: {stopInfo["trams"]}</p>}
         {stopInfo["trolleybuses"] && <p>Троллейбусы: {stopInfo["trolleybuses"]}</p>}
         {stopInfo["metros"] && <p>Линии метрополитена: {stopInfo["metros"]}</p>}
         {stopInfo["electricTrains"] && <p>Электропоезды: {stopInfo["electricTrains"]}</p>}
         {stopInfo["riverTransports"] && <p>Речные переправы: {stopInfo["riverTransports"]}</p>}
         
         <h2>Прогноз по транспорту</h2>
         {predictionForStop && predictionForStop.result.map(prediction => (
            < div key={parseInt(prediction["hullNo"])} 
                  onClick={() => {
                     setSelectedTransport(prediction["hullNo"]);
                     console.log(prediction["hullNo"]);
                     setPredictionShow(true);
                     }}>
               <p>Тип трансорта: {prediction["type"]}</p>
               <p>Номер маршрута: {prediction["number"]}</p>
               <p>Время до прибытия транспорта на остановку: {
                  parseInt(prediction["time"] / 60) > 0 ? 
                  parseInt(prediction["time"] / 60) + " ч " : "" } 
                  {parseInt(prediction["time"] % 60) + " мин"}
               </p>
            </div>
            
         ))}

         <Button variant="primary" onClick={() => {
            setPredictionShow(true);
            }}>
            Прогноз для транспорта
         </Button>

         <PredictionForTransport
            show={predictionShow}
            onHide={() => setPredictionShow(false)}
            transport_id={selectedTransport}
         />

      </>
   );
};

export default InfoComponent;