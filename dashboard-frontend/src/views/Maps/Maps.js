import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
// import MapChart from "components/Map/Map.js";
import IndividualMap from "components/Map/IndividualMap.js";

export default function Maps() {
  const [content, setContent] = useState("");
  return (

    <div>
      <IndividualMap setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
    );
}
