import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";

// @material-ui/icons
import {Line} from 'react-chartjs-2';

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import axios from "axios";
const dashboardRoutes = [];

// const useStyles = makeStyles(styles);

const useStyles = styles;



class LandingPage extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      dataLabels: [],
      dataValues: [],
    }
  }
  
  
  fetchData = () => {
    axios.get("http://192.168.1.20:8000/api/sensor-detail/1/").then(res => {
      console.log(res);
      let tmpLabels = [];
      let tmpValues = [];
      res.data.forEach(row => {
        tmpLabels.push(row.time)
        tmpValues.push(row.value)
      });
      this.setState({
        dataLabels: tmpLabels,
        dataValues: tmpValues,
      });
    });
  }
  
  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 1000);
  }
  

  render() {
    const { classes } = this.props;
    // const classes = useStyles();
    const { ...rest } = this.props;
    const data = {
      labels: this.state.dataLabels,
      datasets: [
        {
          label: 'Sensor X Dataset',
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
          data: this.state.dataValues
        }
      ]
    };

    return (
      <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Sensor Dashboard"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Sensor Dashboard</h1>
              <h4>
                Look at those amazing charts
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Add Sensors
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <Line data={data} />
          <div style={{marginBottom:"10px"}}></div>
          {/* <TeamSection />
          <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
    )
  }
}

export default withStyles(useStyles)(LandingPage);