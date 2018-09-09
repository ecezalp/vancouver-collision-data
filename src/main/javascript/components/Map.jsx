import React from "react";
import ReactMapboxGl, {Feature, GeoJSONLayer, Layer} from "react-mapbox-gl";
import newMapHeader from "../../assets/newMapHeader.png";


import {bikeLanes, shortestPath, straightPath} from "../data/bikeLineConstants";

import {
  COLLISION_SOURCE_OPTIONS_FATALITIES,
  COLLISION_SOURCE_OPTIONS_NON_FATALITIES,
  ROUTING_START_POINT,
  ROUTING_END_POINT,
} from "../data/collisionPointConstants";

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

    const destinationLayout = {
      'text-field': '{place}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top',
      'color': 'red',
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

    const circleStartingPoint = {
      'circle-color': 'white'
    };

    const circleEndPoint = {
      'circle-color': 'blue'
    };

    const lineLayout = {
      'line-cap': 'round',
      'line-join': 'round',
    };

    const lineBikeLanePaint = {
      'line-color': '#00B3FD',
      'line-width': 5
    };

    const lineShortestRoutePaint = {
      'line-color': 'hsl(293, 100%, 50%)',
      'line-width': 10
    };

    const lineSafestRoutePaint = {
      'line-color': 'hsl(258, 100%, 80%)',
      'line-width': 10
    };

    const lineStraightRoutePaint = {
      'line-color': 'green',
      'line-width': 10
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

    const mappedStraightRoute = straightPath.reduce((acc, el) => {
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
          center={[-123.1204278, 49.280925]}
          style="mapbox://styles/mapbox/streets-v9"
          pitch={[5]}
          zoom={[16]}
          containerStyle={{
            paddingTop: "30vh",
            height: "60vh",
            width: "100%"
          }}>

          <Layer type="line" layout={lineLayout} paint={lineBikeLanePaint}>
            {mappedRoute.map((bikeRoute, index) =>
              <Feature coordinates={bikeRoute} key={`bike-route-${index}`}/>
            )}
          </Layer>

          <Layer type="line" layout={lineLayout} paint={lineShortestRoutePaint}>
            {mappedShortestRoute.map((bikeRoute, index) =>
              <Feature coordinates={bikeRoute} key={`shortest-route-${index}`}/>
            )}
          </Layer>

          <Layer type="line" layout={lineLayout} paint={lineStraightRoutePaint}>
            {mappedStraightRoute.map((bikeRoute, index) =>
              <Feature coordinates={bikeRoute} key={`shortest-route-${index}`}/>
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

          <GeoJSONLayer
            data={ROUTING_START_POINT}
            circleLayout={circleLayout}
            circlePaint={circleStartingPoint}
            circleOnClick={() => {
            }}
            symbolLayout={symbolLayout}
            symbolPaint={symbolPaint}
          />

          <GeoJSONLayer
            data={ROUTING_END_POINT}
            circleLayout={circleLayout}
            circlePaint={circleEndPoint}
            circleOnClick={() => {
            }}
            symbolLayout={destinationLayout}
            symbolPaint={symbolPaint}
          />

        </Map>
      </div>
    </div>;
  }
}