import React from "react";
import ReactMapboxGl, {Feature, GeoJSONLayer, Layer} from "react-mapbox-gl";
import newMapHeader from "../../assets/newMapHeader.png";


import {bikeLanes, shortestPath} from "../data/bikeLineConstants";

import {
  COLLISION_SOURCE_OPTIONS_FATALITIES,
  COLLISION_SOURCE_OPTIONS_NON_FATALITIES} from "../data/collisionPointConstants";

export default class Map extends React.Component {

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiZWNlemFscCIsImEiOiJjamx0cGFrYmQwZDNvM3BwZXdjb25vd2dhIn0.lGBGP9iwGbRSJ5oduZwZcw"
    });

    const symbolLayout = {
      'text-field': '{place}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top'
    };
    const symbolPaint = {
      'text-color': 'white'
    };

    const circleLayout = {visibility: 'visible'};

    const circlePointFatalities = {
      'circle-color': 'red'
    };

    const circlePointNonFatalities = {
      'circle-color': 'orange'
    };

    const lineLayout = {
      'line-cap': 'round',
      'line-join': 'round',
    };

    const lineBikeLanePaint = {
      'line-color': 'green',
      'line-width': 3
    };

    const lineShortestRoutePaint = {
      'line-color': 'purple',
      'line-width': 10
    };

    const lineSafestRoutePaint = {
      'line-color': 'hsl(258, 100%, 80%)',
      'line-width': 2
    };

    const lineStraightRoutePaint = {
      'line-color': 'hsl(258, 100%, 50%)',
      'line-width': 2
    };

    const mappedRoute = bikeLanes.reduce((acc, el, index) => {
      acc["routeLength"] === el.routeLength ?
        acc["routes"][acc["routes"].length - 1].push([el.longitude, el.latitude]) :
        acc["routes"].push([[el.longitude, el.latitude]]);
      acc["routeLength"] = el.routeLength;
      return acc;
    }, {routeLength: "", routes: []}).routes;

    const mappedShortestRoute = shortestPath.reduce((acc, el) => {
      acc["routeLength"] === el.routeLength ?
        acc["routes"][acc["routes"].length - 1].push([el.longitude, el.latitude]) :
        acc["routes"].push([[el.longitude, el.latitude]]);
      acc["routeLength"] = el.routeLength;
      return acc;
    }, {routeLength: "", routes: []}).routes;

    return <div className="map">
      <img className="new-map" src={newMapHeader}/>
      <div id="text-map">
        <Map
          center={[-123.1204778, 49.280925]}
          style="mapbox://styles/mapbox/streets-v9"
          pitch={[5]}
          zoom={[16]}
          containerStyle={{
            paddingTop: "30vh",
            height: "60vh",
            width: "100vw"
          }}>

          <Layer type="line" layout={lineLayout} paint={lineBikeLanePaint}>
            {mappedRoute.map(bikeRoute =>
              <Feature coordinates={bikeRoute}/>
            )}
          </Layer>

          <Layer type="line" layout={lineLayout} paint={lineShortestRoutePaint}>
            {mappedShortestRoute.map(bikeRoute =>
              <Feature coordinates={bikeRoute}/>
            )}
          </Layer>

          <GeoJSONLayer
            data={COLLISION_SOURCE_OPTIONS_NON_FATALITIES}
            circleLayout={circleLayout}
            circlePaint={circlePointNonFatalities}
            circleOnClick={() => {
            }}
            symbolLayout={symbolLayout}
            symbolPaint={symbolPaint}
          />

          <GeoJSONLayer
            data={COLLISION_SOURCE_OPTIONS_FATALITIES}
            circleLayout={circleLayout}
            circlePaint={circlePointFatalities}
            circleOnClick={() => {
            }}
            symbolLayout={symbolLayout}
            symbolPaint={symbolPaint}
          />

        </Map>
      </div>
    </div>;
  }
}