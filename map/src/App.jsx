import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import MapComponent from "./MapComponent"
import SearchComponent from "./SearchComponent";
import InfoComponent from "./InfoComponent";
import FavouriteStopsComponent from "./FavouriteStopsComponent";

import axios from 'axios';


function App() {

  const [loading, setLoading] = useState(true);
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  
  const [favouriteStops, setFavouriteStops] = useState(() => {
    const saved = localStorage.getItem("favouriteStops");
    const initialValue = JSON.parse(saved);
    console.log("initialValue" + initialValue);
    return initialValue || [];
  });

  // useEffect(() => {
  //   localStorage.setItem("favouriteStops", JSON.stringify(favouriteStops));
  // }, [favouriteStops]);

  useEffect(() => { async function loadData() {
    const response = await axios("http://localhost:5005/getStopsCoord");
    const data = await response.data;
    setStops(data.stops);
    setLoading(false);
  }   
  loadData();
  }, []);


  const handleStopSelect = (stop) => { setSelectedStop(stop)};

  
  const addFavouriteStop = (stop) => { 
    let current = favouriteStops;
    current.push(stop);
    setFavouriteStops(current);
    console.log(favouriteStops);
    localStorage.setItem("favouriteStops", JSON.stringify(favouriteStops));
  }

  const removeFavouriteStop = (stop) => {
    let filtered = favouriteStops.filter(favStop => favStop["KS_ID"] !== stop["KS_ID"]);
    // console.log("filtered", filtered);
    setFavouriteStops(filtered);
    // console.log(favouriteStops);
    localStorage.setItem("favouriteStops", JSON.stringify(filtered));
    // console.log(favouriteStops);
};


  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Link to="/map"> Карта </Link>
        <Link to="/search"> Поиск </Link>
        <Link to="/favourite"> Избранное </Link>
      </div>
       

      <Routes>
        <Route path="/map" element= { < MapComponent stops={stops}
                                                  favouriteStops={favouriteStops}
                                                  handleStopSelect={handleStopSelect}
                                                  addFavouriteStop={addFavouriteStop}
                                                  selectedStop={selectedStop}/>} />
        
        <Route path="/search" element= {  <SearchComponent stops={stops} 
                                                          favouriteStops={favouriteStops}
                                                          handleStopSelect={handleStopSelect}/>}/>
        
        <Route path="/info" element= { <InfoComponent selectedStop={selectedStop}/>}/>
        
        <Route path="/favourite" element = {< FavouriteStopsComponent favouriteStops={favouriteStops}
                                                                      removeFavouriteStop={removeFavouriteStop}
                                                                      handleStopSelect={handleStopSelect}/>}/>
        
      </Routes>
    </>
  );
}

export default App;
