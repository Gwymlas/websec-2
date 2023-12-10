import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';


const SearchComponent = ({stops, handleStopSelect}) => {
  const [input, setInput] = useState();
  const [filteredStops, setFilteredStops] = useState([]);
  const  navigate = useNavigate();

  const handleChange = (e) => {
    setInput(e.target.value);
    setFilteredStops(
      stops.filter((stop) =>
        stop.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleClick = (stop) => {
    setInput(stop);
    setFilteredStops([]);
  };

  const setSelectedStop = () => {
    console.log("search "+input);
    // if (input && input?.KS_ID) {
    //    handleStopSelect(input);
    // }
    if (input) {
      if (typeof(input) === 'string' && filteredStops.length > 0) {
        handleStopSelect(filteredStops[0]);
      }
      else if (typeof(input) === 'object') {
        handleStopSelect(input);
      }
   }
    setInput();
    setFilteredStops([]);
    navigate("/map");
   
  }

  return (

    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Название остановки"
          type="text"
          value={input? input.title : " "}
          onChange={handleChange}
          aria-describedby="basic-addon2"
        />
        <Button onClick={setSelectedStop} variant="outline-secondary" id="button-addon2">
          Выбрать остановку
        </Button>
      </InputGroup>

      
       {filteredStops.length > 0 && (
        <ListGroup>  
          {filteredStops.map((stop) => (
             < ListGroup.Item className="d-flex justify-content-center align-items-center" 
                              action 
                              key={stop.KS_ID} 
                              onClick={() => handleClick(stop)}>
                {stop.title + " (" + stop.direction + ") "}
              </ListGroup.Item>
           ))}
        </ListGroup>
       )}
      </>



    // <div className="search-window">
    //   <input
    //     type="text"
    //     placeholder="Поиск остановки"
    //     value={input? input.title : " "}
    //     onChange={handleChange}
    //   />
    //   <button onClick={setSelectedStop}>
    //     Выбрать остановку
    //   </button>
    //   {filteredStops.length > 0 && (
    //     <div className="stops-list">
    //       {filteredStops.map((stop) => (
    //         <div key={stop.KS_ID} onClick={() => handleClick(stop)} style={{ border: '1px solid black'}}>
    //           {stop.title}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );

};

export default SearchComponent;