import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Badge } from "reactstrap";
import { Divider, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function SelectResult(props) {
  const classes = useStyles();
  const { item1, item2 } = props;
  return (
    <React.Fragment>
      <Chip className={classes.chip} label={item1 + " : " + item2} />
    </React.Fragment>
  );
}
