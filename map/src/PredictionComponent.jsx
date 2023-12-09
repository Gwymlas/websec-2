import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const PredictionForTransport = ({onHide, show, transport_id}) => {

    const [predictions, setPredictions] = useState([]);

    const loadPredictionForTransport = async(hullNo) => {
        if (hullNo) {
           axios("http://localhost:5005/getTransportPosition", {params: {hullNo: hullNo}} ).then(response => {
              setPredictions(response.data["nextStops"]);
           }); 
        }
    }

    useEffect(() => {
        loadPredictionForTransport(transport_id);
        console.log("loaded" + predictions);
    }, [transport_id]);


    return (
      <Modal
        onHide={onHide}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Прогноз для выбранного транспорта
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {predictions && predictions.map(prediction => {
            return (
            <div key={parseInt(prediction["KS_ID"])}>
                <p>Название остановки: {prediction["title"]} </p>
                <p>Время до прибытия: 
                {parseInt(prediction["time"]) / 60 > 0 ? parseInt(prediction["time"] / 60) + " мин " : ""}
                {parseInt(prediction["time"] % 60) + " сек" }</p>
            </div>
            )
          })}
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default PredictionForTransport;