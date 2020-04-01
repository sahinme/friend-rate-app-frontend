import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import userService from "services/userService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        friend rate
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const [values, setValue] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = ({ currentTarget: input }) => {
    const currentValues = values;
    currentValues[input.id] = input.value;
    setValue(currentValues);
  };

  const classes = useStyles();
  const handleSubmit = async () => {
    const result = await userService.createUser(values);
    console.log(result);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kayıt ol
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Kullanici Adi"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="E-Posta"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Kayıt Ol
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Zaten hesabın var mı? Giriş Yap
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
