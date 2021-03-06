import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
// core components
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ValueTable from "components/Table/ValueTable";
import axios from 'axios';


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
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
  const [list, setList] = useState([]);
  const [id, setId] = useState(2);
  const [name, setName] = useState("Poland Covid Sensor");

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    axios
      .get(`http://192.168.1.20:8000/api/sensor-list/`)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    if (event.target.value[1] !== undefined) {
      setId(event.target.value[0]);
      setName(event.target.value[1]);
    }
  };

  return (
        <Card> 
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Data in form of Table</h4>
            <p className={classes.cardCategoryWhite}>
              Check raw data of certain sensor
            </p>
          </CardHeader>
          <CardBody>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
                <CustomSelect
                  id="company-disabled"
                  labelText="Choose"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    // value: "name",
                    onChange: handleChange,
                  }}
                  
                  onChange={handleChange}
                  >
              {list.map((sensor) => (
                <MenuItem key={sensor.id} value={[sensor.id, sensor.name]}>{sensor.name}</MenuItem>
              ))}
                </CustomSelect>
                </GridItem>
            </GridContainer>
            <br></br>
            <ValueTable id={id} name={name}/>
          </CardBody>
        </Card>
  );
}
