import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import userService from "services/userService";
import { Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [values, setValue] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    const currentValues = values;
    currentValues[input.id] = input.value;
    setValue(currentValues);
  };

  const classes = useStyles();
  const handleSubmit = async () => {
    setLoading(true);
    const result = await userService.signIn(values);
    if (result.status === 200 && result.data.token) {
      history.push(`/profile/${values.username}`);
    } else {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        {error && (
          <Alert color="danger">Kullanıcı adı veya şifre yanlış!</Alert>
        )}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid style={{ marginTop: 10 }} container spacing={2}>
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
                name="password"
                label="Şifre"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
        )}
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Giriş Yap
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link
              href="#"
              onClick={() => history.push(`/signUp`)}
              variant="body2"
            >
              Hesabın yok mu? Hemen kaydol
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
