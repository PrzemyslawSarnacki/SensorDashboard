/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import ShowChart from "@material-ui/icons/ShowChart";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Navigation from "@material-ui/icons/Navigation";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Edit from "@material-ui/icons/Edit";
import PlusOne from "@material-ui/icons/PlusOne";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import AddSensor from "views/AddSensor/AddSensor.js";
import Charts from "views/Charts/Charts.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Maps from "views/Maps/Maps.js";
import Locations from "views/Locations/Locations.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpdateLocation from "views/UpdateLocation/UpdateLocation.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard", 
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    icon: ShowChart,
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/update-location",
    name: "Update Location",
    icon: Edit,
    component: UpdateLocation,
    layout: "/admin"
  },
  {
    path: "/add-sensor",
    name: "Add Sensor",
    icon: PlusOne,
    component: AddSensor,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/locations",
    name: "Locations",
    icon: Navigation,
    component: Locations,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }
];

export default dashboardRoutes;
