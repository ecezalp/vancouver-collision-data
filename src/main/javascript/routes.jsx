import React from 'react';
import {Route} from "react-router-dom";
import withBackground from "./components/higherOrder/withBackground";
import Dashboard from "./components/Dashboard";
import BikeRoutes from "./components/BikeRoutes";
import Map from "./components/Map";

export default function Routes() {

  const dashboard = () => withBackground(Dashboard);

  const bikeRoutes = () => withBackground(BikeRoutes);

  const appMap = () => withBackground(Map);

  return <div className="app-container">
    <Route exact path="/" component={dashboard}/>
    <Route exact path="/bikeRoutes" component={bikeRoutes}/>
    <Route exact path="/map" component={appMap}/>
  </div>;
}