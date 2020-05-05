import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
import LocationCity from "@material-ui/icons/LocationCity";
// core components
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#a9afbbd1",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {


    useEffect(() => {
        fetchList();
    }, []);

    useEffect(() => {
        getPreviousLocation();
    }, [id]);

    const [list, setList] = useState([]);
    const [tc, setTC] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longtitude, setLongtitude] = useState(0);
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState(1);

    const updateLocation = () => {
        axios
            .put(`http://192.168.1.20:8000/api/update-location/${id}/`, { name: name, city: city, latitude: latitude, longtitude: longtitude }, {
                "Content-Type": "application/json",
            })
            .then((res) => {
                showNotification();
                console.log("success")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getPreviousLocation = () => {
        axios
            .get(`http://192.168.1.20:8000/api/sensor-location/${id}/`)
            .then((res) => {
                res.data.forEach((row) => {
                    console.log(row.sensor_location.city);
                    setLatitude(row.sensor_location.latitude);
                    setLongtitude(row.sensor_location.longtitude);
                    setCity(row.sensor_location.city);
                    setName(row.sensor_location.name);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchList = () => {
        axios
            .get("http://192.168.1.20:8000/api/sensor-list/")
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showNotification = () => {
        if (!tc) {
            setTC(true);
            setTimeout(function () {
                setTC(false);
            }, 6000);
        }
    };

    const handleChange = (event) => {
        if (event.target.value !== undefined) {
            setId(event.target.value);
        }
    };

    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Edit Location</h4>
                            <p className={classes.cardCategoryWhite}>Update your sensor location</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6} lg={6}>
                                        <CustomSelect
                                            id="company-disabled"
                                            labelText="Choose"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: handleChange,
                                            }}
                                        >
                                            {list.map((sensor) => (
                                                <MenuItem key={sensor.id} value={sensor.id}>{sensor.name}</MenuItem>
                                            ))}
                                        </CustomSelect>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Name"
                                        id="name"
                                        inputProps={{
                                            defaultValue: name,
                                            name: "name",
                                        }}
                                        formControlProps={{
                                            onChange: e => setName(e.target.value),
                                            fullWidth: true
                                        }}
                                    />
                                    <p>{name}</p>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="City"
                                        id="city"
                                        inputProps={{
                                            defaultValue: city,
                                            name: "city",
                                        }}
                                        formControlProps={{
                                            onChange: e => setCity(e.target.value),
                                            fullWidth: true
                                        }}
                                    />
                                    <p>{city}</p>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Latitude"
                                        id="latitude"
                                        inputProps={{
                                            defaultValue: latitude,
                                            name: "latitude",
                                        }}
                                        formControlProps={{
                                            onChange: e => setLatitude(e.target.value),
                                            fullWidth: true
                                        }}
                                    />
                                    <p>{latitude}</p>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Longtitude"
                                        id="longtitude"
                                        inputProps={{
                                            defaultValue: longtitude,
                                            name: "longtitude",
                                        }}
                                        formControlProps={{
                                            onChange: e => setLongtitude(e.target.value),
                                            fullWidth: true
                                        }}
                                    />
                                    <p>{longtitude}</p>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={() => updateLocation()} color="primary">Update Location</Button>
                            <Snackbar
                                place="tc"
                                color="info"
                                icon={LocationCity}
                                message="Location updated successfully!."
                                open={tc}
                                closeNotification={() => setTC(false)}
                                close
                            />
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
