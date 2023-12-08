import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
    <div className="search-window">
      <input
        type="text"
        placeholder="Поиск остановки"
        value={input? input.title : " "}
        onChange={handleChange}
      />
      <button onClick={setSelectedStop}>
        Выбрать остановку
      </button>
      {filteredStops.length > 0 && (
        <div className="stops-list">
          {filteredStops.map((stop) => (
            <div key={stop.KS_ID} onClick={() => handleClick(stop)} style={{ border: '1px solid black'}}>
              {stop.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default SearchComponent;