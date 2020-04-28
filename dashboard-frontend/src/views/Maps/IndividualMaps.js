import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
// import MapChart from "components/Map/Map.js";
import IndividualMap from "components/Map/IndividualMap.js";
import { withRouter } from "react-router-dom";

function IndividualMaps(props) {
  const [content, setContent] = useState("");
  return (

    <div>
      <IndividualMap id={props.match.params.productID} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
    );
}


export default withRouter(IndividualMaps);
