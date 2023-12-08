import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import MapComponent from "./MapComponent"
import SearchComponent from "./SearchComponent";
import InfoComponent from "./InfoComponent";

import axios from 'axios';

function App() {

  const [loading, setLoading] = useState(true);
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => { async function loadData() {
    const response = await axios("http://localhost:5005/getStopsCoord");
    const data = await response.data;
    setStops(data.stops);
    setLoading(false);
  }   
  loadData();
  }, []);

  const handleStopSelect = (stop) => { setSelectedStop(stop);};

  const handleShowInfo = (value) => { setShowInfo(value); };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Link to="/map">Map</Link>
        <Link to="/search">Search</Link>
      </div>
       

      <Routes>
        <Route path="/map" element= { < MapComponent stops={stops}
                                                  showInfo={showInfo}
                                                  handleShowInfo = {handleShowInfo} 
                                                  handleStopSelect={handleStopSelect}
                                                  selectedStop={selectedStop} />} />
        <Route path="/search" element= {  <SearchComponent stops={stops} 
                                                          handleStopSelect={handleStopSelect}/>}/>
        <Route path="/info" element= { <InfoComponent selectedStop={selectedStop} 
                                                        show={showInfo}
                                                        onHide={() => handleShowInfo(false)}/>}/>
    
      </Routes>
    </>
  );
}

export default App;
