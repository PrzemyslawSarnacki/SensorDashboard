import {
  defaultFont,
  primaryColor,
  whiteColor,
  dangerColor,
  grayColor
} from "assets/jss/material-dashboard-react.js";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.js";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";
const tasksStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  table: {
    marginBottom: "0",
    overflow: "visible"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid " + grayColor[5]
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    color: "#a9afbbd1",
    padding: "8px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px"
  },
  tableCellRTL: {
    textAlign: "right"
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: whiteColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: whiteColor,
    boxShadow: "none"
  }
};
export default tasksStyle;
