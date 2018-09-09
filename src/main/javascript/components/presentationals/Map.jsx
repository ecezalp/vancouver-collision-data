import React from "react";
import ReactMapboxGl, {Feature, GeoJSONLayer, Layer} from "react-mapbox-gl";


import {bikeLanes} from "./bikeLaneLineConstants";

import {
  COLLISION_SOURCE_OPTIONS_FATALITIES,
  COLLISION_SOURCE_OPTIONS_NON_FATALITIES} from "./collisionPointConstants";

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

    const linePaint = {
      'line-color': 'green',
      'line-width': 3
    };

    const mappedRoute = bikeLanes.reduce((acc, el, index) => {
      acc["routeLength"] === el.routeLength ?
        acc["routes"][acc["routes"].length - 1].push([el.longitude, el.latitude]) :
        acc["routes"].push([[el.longitude, el.latitude]]);
      acc["routeLength"] = el.routeLength;
      return acc;
    }, {routeLength: "", routes: []}).routes;

    return <div className="map">
      <div id="text-map">
        <Map
          center={[-123.1323, 49.2769]}
          style="mapbox://styles/mapbox/streets-v9"
          pitch={[5]}
          zoom={[13]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>

          <Layer type="line" layout={lineLayout} paint={linePaint}>
            {mappedRoute.map(bikeRoute =>
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


{/*// export default class Map extends React.Component {*/
}
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewport: {
//         width: 900,
//         height: 1400,
//         latitude: 49.27697067443789,
//         longitude: -123.13236912635006,
//         zoom: 16,
//       }
//     };
//   }
//
//   componentDidMount() {
//
//     setTimeout(() => {
//       var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
//
//       mapboxgl.accessToken = '';
//
//       var map = new mapboxgl.Map({
//         container: 'text-map',
//         style: 'mapbox://styles/mapbox/streets-v9',
//         center: [-123.0266, 49.2683],
//         zoom: 12,
//       });
//
//       map.addControl(new mapboxgl.NavigationControl());
//
//       setTimeout(() => {
//         debugger;
//         map.addLayer({
//           "id": "points",
//           "type": "symbol",
//           "source": {
//             "type": "geojson",
//             "data": {
//               "type": "FeatureCollection",
//               "features": [
//                 {
//                   "type": "Feature",
//                   "properties": {},
//                   "geometry": {
//                     "coordinates": [
//                       [
//                         -123.136505,
//                         49.290819
//                       ],
//                       [
//                         -123.127431,
//                         49.284874
//                       ]
//                     ],
//                     "type": "LineString"
//                   },
//                   "id": "07544b1ecb63f4327fb952de36801e62"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Douglas Park",
//                     "description": "A large park near in Chicago's North Lawndale neighborhood"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.699329,
//                       41.860092
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "224ce897914861ca99293e32917a9942"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Columbus Park",
//                     "description": "A large park in Chicago's Austin neighborhood"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.769775,
//                       41.873683
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "254ac8b7df59f2b24b6b3d83aa125bcc"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {},
//                   "geometry": {
//                     "coordinates": [
//                       [
//                         -123.137288,
//                         49.29406
//                       ],
//                       [
//                         -123.125941,
//                         49.28671
//                       ]
//                     ],
//                     "type": "LineString"
//                   },
//                   "id": "5f80f490fb24b54f2ba77fbc16b40844"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Lincoln Park",
//                     "description": "A northside park that is home to the Lincoln Park Zoo"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.637596,
//                       41.940403
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "5fe3a55b7a214f86876a8882556fcd2b"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Millennium Park",
//                     "description": "A downtown park known for its art installations and unique architecture"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.622554,
//                       41.882534
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "8dd551a9622f0af005bf80315f41b0f1"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Calumet Park",
//                     "description": "A park on the Illinois-Indiana border featuring a historic fieldhouse"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.530221,
//                       41.715515
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "92cd55c5a3037279f81fb5dc5f8bf9b4"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {},
//                   "geometry": {
//                     "coordinates": [
//                       [
//                         -123.130558,
//                         49.290589
//                       ],
//                       [
//                         -123.11843,
//                         49.28694
//                       ]
//                     ],
//                     "type": "LineString"
//                   },
//                   "id": "9a59a53c784168faa8c7770898fa5cf2"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Grant Park",
//                     "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.619185,
//                       41.876367
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "c201185e0f05054fa4554f6193cb51b9"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Burnham Park",
//                     "description": "A lakefront park on Chicago's south side"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.603735,
//                       41.829985
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "e44f114f7c4edd205110ef0efd74c955"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Jackson Park",
//                     "description": "A lakeside park that was the site of the 1893 World's Fair"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.580389,
//                       41.783185
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "e70cee37d1b41310b5595a8feb77ecdf"
//                 },
//                 {
//                   "type": "Feature",
//                   "properties": {
//                     "title": "Humboldt Park",
//                     "description": "A large park on Chicago's northwest side"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                       -87.70199,
//                       41.905423
//                     ],
//                     "type": "Point"
//                   },
//                   "id": "e8c085d17fa09f170a8c7605a2f6fb36"
//                 }
//               ]
//             }
//           },
//           "layout": {
//             "icon-image": "{icon}-15",
//             "text-field": "{title}",
//             "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//             "text-offset": [0, 0.6],
//             "text-anchor": "top"
//           }
//         });
//       }, 1000)
//     }, 200);
//   }
//
//   render() {
//     let newProps = {...this.props};
//
//     return <div className="map">
//       <h1>MAP</h1>
//       <br/>
//
//       <div id="text-map"/>
//
//       <br/>
//
//       <a href={"/"}>HOME</a>
//       <br/>
//       <a href={"/infographics"}>INFOGRAPHICS</a>
//     </div>
//   }
// }