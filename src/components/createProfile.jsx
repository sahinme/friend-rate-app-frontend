import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, FormHelperText, Input } from "@material-ui/core";

export default function CreateProfile() {
  return (
    <div className="App">
      <header className="App-header">
        <h3> Friend Rate / </h3>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </header>
    </div>
  );
}
