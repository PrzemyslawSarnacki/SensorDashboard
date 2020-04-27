import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography, 
  Marker
} from "react-simple-maps";
import axios from "axios";


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};


const markers = [
  {
    markerOffset: -30,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037]
  },
  { markerOffset: 15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 15, name: "Bogota", coordinates: [-74.0721, 4.711] },
  { markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -30, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: -30, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
  { markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: 15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
  // { markerOffset: 15, name: "Sensor", coordinates: [19.9882, 53.1692] },
  { markerOffset: 15, name: "Lima", coordinates: [-77.0428, -12.0464] }
];


export class MapChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  
  fetchMap = () => {
    axios.get("http://192.168.1.20:8000/api/sensor-list/").then(res => {
      console.log(res);
      res.data.forEach(row => {
        markers.push(
          {
            markerOffset: 15,
            name: row.name,
            coordinates: [row.sensor_location.longtitude,row.sensor_location.latitude],
            id: row.id,
          }
  
        );
      });
      console.log(markers)
      this.setState({});

  
    });
  
  }

  componentDidMount() {
    this.fetchMap();
  }

  render() {
    
    return (
      <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    this.props.setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  }}
                  onMouseLeave={() => {
                    this.props.setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#9400D3",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset, id }) => (
        <Marker key={name} coordinates={coordinates}>
          <a href="/">
          <g
            fill="#9400D3"
            stroke="#4B0082"
            strokeWidth="2"
            strokeLinecap="round"
            onMouseEnter={() => {this.props.setTooltipContent(name)}}
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" fill="#ffffff" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
            </a>
        </Marker>
      ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
      )
  }
}

export default memo(MapChart);
