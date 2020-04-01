import React from "react";
import { Progress } from "reactstrap";

const ResultBar = props => {
  const colors = ["success", "info", "danger", "warning"];
  return (
    <div>
      <Progress
        style={{
          width: "20rem",
          height: "2rem",
          marginBottom: 5
        }}
        animated
        color={colors[Math.floor(Math.random() * 3) + 0]}
        value={props.value}
      >
        {props.text}
      </Progress>
    </div>
  );
};

export default ResultBar;
