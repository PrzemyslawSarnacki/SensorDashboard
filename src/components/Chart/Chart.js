import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "axios";

import {Line} from 'react-chartjs-2';


export default function Char(props){

    const [dataLabels, setDataLabels] = useState([]);
    const [dataValues, setDataValues] = useState([]);
    const [loading, setLoading] = useState(false);
  

    useEffect(() => {
        fetchData();
      }, []);
    
    useEffect(() => {
        fetchData();
      }, [props.id]);
    

    const data = {
        labels: dataLabels,
        datasets: [
          {
            label: props.name,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataValues
          }
        ]
      };
    
    const fetchData = () => {
      setLoading(true);
      axios
          .get(`https://sensor-dashboards.herokuapp.com/api/sensor-detail/${props.id}/`)
          .then((res) => {
            let tmpLabels = [];
            let tmpValues = [];
            res.data.forEach(row => {
              tmpLabels.push(row.time)
              tmpValues.push(row.value)
            });
            setDataLabels(tmpLabels)
            setDataValues(tmpValues)
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
return(
  <div>

  {loading ? (
    <div style={{textAlign: "center"}}>
    <CircularProgress />
    </div>

) :

(
  
  
  <div>
        <h5 style={{textAlign: "center"}}>{props.name}</h5>
        <Line data={data} />
    </div>
    )
  }
  </div>
);
}
