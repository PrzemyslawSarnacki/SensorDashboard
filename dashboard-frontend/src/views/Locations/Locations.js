/*eslint-disable*/
import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import CardBody from "components/Card/CardBody.js";
import IndividualMap from "components/Map/IndividualMap.js";
import ReactTooltip from "react-tooltip";
import axios from "axios";

const useStyles = makeStyles(((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    color: "rgba(255,255,255,.62)",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
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
      lineHeight: "1",
    },
  },
})));


export default function Locations() {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [list, setList] = useState([]);
  const [id, setId] = useState(1);
  const [name, setName] = useState("Name");

  useEffect(() => {
    console.log(name)
    fetchList();
  }, []);

  const fetchList = () => {
    console.log("fetching data");
    axios
      .get("http://192.168.1.20:8000/api/sensor-list/")
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };



  const handleChange = (event) => {
    console.log(name);
    if (event.target.value[1] !== undefined) {
      setId(event.target.value[0]);
      setName(event.target.value[1]);
    }
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Locations</h4>
        <p className={classes.cardCategoryWhite}>
          Track your sensor in real time
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
            <h5>
              Individual Sensor Location
              <br />
              <small>Choose which sensor to track</small>
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              {/* <FormControl className={classes.formControl}>
                <InputLabel color="primary" id="demo-simple-select-label">Sensor Name</InputLabel> */}
                <CustomSelect
                  // labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color="primary"
                  value={name}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: name,
                    onChange: handleChange,

                  }}

                  onChange={handleChange}
                  >
              {list.map((sensor) => (
                <MenuItem value={[sensor.id, sensor.name]}>{sensor.name}</MenuItem>
              ))}

                </CustomSelect>
              {/* <FormHelperText>{name}</FormHelperText>
              </FormControl> */}
 

              {list.map((sensor) => (
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => setId(sensor.id)}
                  >
                    {sensor.name}
                  </Button>
                  <Snackbar
                    place="br"
                    color="info"
                    icon={AddAlert}
                    message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                    // open={br}
                    close
                  />
                </GridItem>
              ))}
            </GridContainer>
          </GridItem>
        </GridContainer>
        <div>
              <h5 style={{textAlign: "center"}}>{name}</h5>
      <IndividualMap id={id} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
      </CardBody>
    </Card>
  );
}
