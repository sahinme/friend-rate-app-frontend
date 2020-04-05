import React from "react";
import { MDBIcon, MDBBtn } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const SocialButtons = () => {
  return (
    <React.Fragment>
      <MDBBtn color="blue" size="lg" tag="a" floating social="fb">
        <MDBIcon fab icon="facebook-f" />
      </MDBBtn>
      <MDBBtn color="purple" size="lg" tag="a" floating social="ins">
        <MDBIcon fab icon="instagram" />
      </MDBBtn>
      <MDBBtn color="light-blue" size="lg" tag="a" floating social="tw">
        <MDBIcon fab icon="twitter" />
      </MDBBtn>
    </React.Fragment>
  );
};

export default SocialButtons;
