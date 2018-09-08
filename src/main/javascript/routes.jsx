import React from 'react';
import {Route} from "react-router-dom";
import HomeContainer from "./components/containers/HomeContainer";
import MapContainer from "./components/containers/MapContainer";
import InfographicsContainer from "./components/containers/InfographicsContainer";

export default function Routes() {

  const home = () => <HomeContainer/>;

  const map = () => <MapContainer/>;

  const infographics = () => <InfographicsContainer/>;

  return <div className="app-container">
    <Route exact path="/" component={home}/>
    <Route path="/map" component={map}/>
    <Route path="/infographics" component={infographics}/>
  </div>;
}