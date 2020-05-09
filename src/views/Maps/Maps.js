import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "components/Map/Map.js";


export default function Maps() {
  const [content, setContent] = useState("");
  return (

    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
    );
}

