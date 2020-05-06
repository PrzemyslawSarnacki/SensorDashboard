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

    const [list, setList] = useState([]);
    const [id, setId] = useState(1);


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
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Latitude"
                                        id="latitude"
                                        formControlProps={{
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
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Max Value"
                                        id="max-value"
                                        formControlProps={{
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
                        <Button color="primary">Add Sensor</Button>
                    </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
