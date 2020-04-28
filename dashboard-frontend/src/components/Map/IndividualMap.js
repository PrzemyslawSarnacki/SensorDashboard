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


const markers = [];


export class IndividualMap extends React.Component {
  constructor(props) {
      super(props)
  
      this.state = {
        arrayLength: "",
      }
  }
  

  fetchMap = () => {
    axios.get(`http://192.168.1.20:8000/api/sensor-location/${1}/`).then(res => {
    //   console.log(res);
      res.data.forEach(row => {
        //   console.log(markers.length)
        
        if (markers.length < 1) {
            markers.push(
              {
                name: row.name,
                coordinates: [row.sensor_location.longtitude,row.sensor_location.latitude],
                id: row.id,
            }
            
            );
        }
        else if (markers[this.state.arrayLength-1].coordinates[0] !== row.sensor_location.longtitude) {
            // console.log(markers[this.state.arrayLength-1].coordinates[0])
            markers.push(
                {
                    name: row.name,
                    coordinates: [row.sensor_location.longtitude,row.sensor_location.latitude],
                    id: row.id,
              }
      
            );
        }
        
      });
      console.log(markers.length)
      console.log(markers)
      this.setState({arrayLength: markers.length});
    });
  
  }

  componentDidMount() {
    this.fetchMap();
    this.interval = setInterval(() => this.fetchMap(), 3000);
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

          {markers.map(({coordinates,id,name}, i) => 
        (
            
            (this.state.arrayLength === i + 1 ? 
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
                :
            
            <Marker key={name} coordinates={coordinates}>
                <circle r={5} fill="#9400D3" stroke="#4B0082" strokeWidth={1} />
              </Marker>
            )
        )
        
      )}
        </ZoomableGroup>
      </ComposableMap>
    </>
      )
  }
}

export default memo(IndividualMap);
