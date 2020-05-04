import React, {useState, useEffect} from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';


export default function ValueTable(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [props.id])

    const fetchData = () => {
        axios
            .get(`http://192.168.1.20:8000/api/sensor-detail/${props.id}/`)
            .then((res) => {
                let tmpArray = [];
                res.data.forEach(row => {
                    tmpArray.push([row.id, row.time, row.value])
                });
                setData(tmpArray)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
        <h5 style={{textAlign: "center"}}>{props.name}</h5>
            <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Date", "Value"]}
                tableData={data}
            />
        </div>

    );

}