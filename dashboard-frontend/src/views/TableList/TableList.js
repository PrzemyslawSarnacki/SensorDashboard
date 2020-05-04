import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(0,0,0,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {

  const classes = useStyles();
  const [dataID, setDataID] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    axios
      .get(`http://192.168.1.20:8000/api/sensor-detail/2/`)
      .then((res) => {
        let tmpLabels = [];
        let tmpValues = [];
        let tmpID = [];
        res.data.forEach(row => {
          tmpLabels.push(row.time)
          tmpValues.push(row.value)
          tmpID.push(row.id)
        });
        setDataLabels(tmpLabels)
        setDataValues(tmpValues)
        setDataID(tmpID)
        console.log(tmpID)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Data in form of Table</h4>
            <p className={classes.cardCategoryWhite}>
              Check raw data of certain sensor
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Date", "Value", "City", "Salary"]}
              tableData={[
                [dataID[0], dataLabels[0], dataValues[0], "Oud-Turnhout", "$36,738"],
                [dataID[1], dataLabels[1], dataValues[1], "Sinaai-Waas", "$23,789"],
                [dataID[2], dataLabels[2], dataValues[2], "Baileux", "$56,142"],
                [dataID[3], dataLabels[3], dataValues[3], "Overland Park", "$38,735"],
                [dataID[0], "Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                [dataID[0], "Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
            />

            <br></br>
        
            <p className={classes.cardTitleWhite}>Export as csv file</p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
