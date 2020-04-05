import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { resultLabels } from "properties";
import { Chip } from "@material-ui/core";
import SocialButtons from "./socialButtons";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const ResultModal = (props) => {
  const { buttonLabel, className } = props;

  const classes = useStyles();

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} className={className}>
      <ModalHeader
        toggle={props.toggle}
      >{`Oylayan: ${props.voterName}`}</ModalHeader>
      <ModalBody>
        {Object.entries(props.selectedVote).map((item, key) => {
          return (
            <Chip
              className={classes.chip}
              label={resultLabels[key] + " " + item[1]}
            />
          );
        })}
      </ModalBody>
      <ModalFooter>
        <SocialButtons />
      </ModalFooter>
    </Modal>
  );
};

export default ResultModal;
