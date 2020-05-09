import React, { useState, useEffect } from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { CSVLink } from "react-csv";


export default function ValueTable(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [props.id])

    const fetchData = () => {
        setLoading(true);
        axios
            .get(`http://192.168.1.20:8000/api/sensor-detail/${props.id}/`)
            .then((res) => {
                let tmpArray = [];
                res.data.forEach(row => {
                    tmpArray.push([row.id, row.time, row.value])
                });
                setData(tmpArray)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {loading ? (
                <div style={{textAlign: "center"}}>
                <CircularProgress />
                </div>

            ) :

                (

                    <div>
                        <h5 style={{ textAlign: "center" }}>{props.name}</h5>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["ID", "Date", "Value"]}
                            tableData={data}
                        />
                        <GridContainer justify="center" style={{ textAlign: "center" }}>
                            <GridItem xs={12} sm={12} md={6} lg={6}>
                                <p>Export as CSV file</p>

                                <CSVLink data={data} headers={["ID", "Date", "Value"]}>
                                    <Button color="success">
                                        Download
                </Button>
                                </CSVLink>
                            </GridItem>
                        </GridContainer>

                    </div>
                )


            }
        </div>

    );

}