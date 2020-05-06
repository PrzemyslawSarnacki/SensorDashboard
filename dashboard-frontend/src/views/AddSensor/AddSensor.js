import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
import LocationCity from "@material-ui/icons/LocationCity";
// core components
import InputFields from "components/InputFields/InputFields.js";
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
        color: "#FFFFFF",
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

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longtitude, setLongtitude] = useState(0);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [unit, setUnit] = useState("");
    const [description, setDescription] = useState("");
    const [tc, setTC] = useState(false);


    const addSensor = () => {
        axios
            .post(`http://192.168.1.20:8000/api/add-sensor/`, {
                name: name,
                sensor_location: { name: name, city: city, latitude: latitude, longtitude: longtitude },
                code: name.replace(" ", "-").toLowerCase(),
                min_value: min,
                max_value: max,
                unit: unit,
                description: description
            },
                {
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

    const showNotification = () => {
        if (!tc) {
            setTC(true);
            setTimeout(function () {
                setTC(false);
            }, 6000);
        }
    };


    const classes = useStyles();
    return (
        <div>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Add Sensor</h4>
                            <p className={classes.cardCategoryWhite}>Add New Sensor</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Name"
                                        id="name"
                                        formControlProps={{
                                            onChange: e => setName(e.target.value),
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="City"
                                        id="city"
                                        formControlProps={{
                                            onChange: e => setCity(e.target.value),
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Latitude"
                                        id="latitude"
                                        formControlProps={{
                                            onChange: e => setLatitude(e.target.value),
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Longtitude"
                                        id="longtitude"
                                        formControlProps={{
                                            onChange: e => setLongtitude(e.target.value),

                                            fullWidth: true
                                        }}
                                        inputProps={{
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Min Value"
                                        id="min-value"
                                        formControlProps={{
                                            onChange: e => setMin(e.target.value),

                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Max Value"
                                        id="max-value"
                                        formControlProps={{
                                            onChange: e => setMax(e.target.value),

                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Unit"
                                        id="unit"
                                        formControlProps={{
                                            onChange: e => setUnit(e.target.value),
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Description"
                                        id="description"
                                        formControlProps={{
                                            onChange: e => setDescription(e.target.value),
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 3
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                        <CardFooter>

                            <Button onClick={() => addSensor()} color="primary">Add Sensor</Button>
                            <Snackbar
                                place="tc"
                                color="info"
                                icon={LocationCity}
                                message="Sensor Added successfully!."
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
