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
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import userAvatar from "./images/user.jpg";
import { useHistory } from "react-router-dom";
import Progress from "./progress";
import { Alert } from "reactstrap";

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

export default function SignUp(props) {
  const history = useHistory();

  const [values, setValue] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    profileImage: null,
  });
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState("");

  const handleInputChange = ({ currentTarget: input }) => {
    const currentValues = values;
    currentValues[input.id] = input.value;
    setValue(currentValues);
  };

  const onselectChange = (e) => {
    console.log(e.target.value);
    setValue({ ...values, gender: e.target.value });
  };

  const classes = useStyles();

  const handleSubmit = async () => {
    setLoader(true);
    const result = await userService.createUser(values);
    console.log(result);
    if (result && result.status === 200 && result.data.id) {
      history.push(`/profile`);
    }
    if (result && result.data.username === "taken") {
      setErrorValue("Bu kullanıcı adı alınmış");
      setError(true);
    }
    if (result && result.data.email === "taken") {
      setErrorValue("Bu e-post adresi alınmış");
      setError(true);
    }
    setLoader(false);
  };

  const handlePreview = (imageUrl) => {
    const previewImageDom = document.querySelector(".preview-image");
    previewImageDom.src = imageUrl;
  };

  const handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    setValue({ ...values, profileImage: imageFile });
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        //input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
      handlePreview(localImageUrl);
    }
  };

  const RenderFileInput = ({ input, type, meta }) => {
    const mimeType = "image/jpeg, image/png, image/jpeg, image/gif";
    return (
      <div style={{ marginTop: "5px" }}>
        <input
          name={input.name}
          type={type}
          accept={mimeType}
          onChange={(event) => handleChange(event, input)}
        />
        {meta && meta.invalid && meta.error && <p>error</p>}
      </div>
    );
  };
  return isLoading ? (
    <Progress />
  ) : (
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
          {error && <Alert color="danger">{errorValue}</Alert>}
          <Grid item xs={12}>
            <TextField
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-outlined-label">
              Cinsiyet
            </InputLabel>
            <Select
              style={{ width: "50%" }}
              labelId="demo-simple-select-outlined-label"
              id="gender"
              value={values.gender}
              onChange={onselectChange}
              label="Age"
            >
              <MenuItem value="E">Erkek</MenuItem>
              <MenuItem value="K">Kadın</MenuItem>
            </Select>
          </Grid>
          <img
            src={props.previewLogoUrl || userAvatar}
            alt="preview"
            className="preview-image"
            style={{
              maxHeight: "200px",
              objectFit: "contain",
              width: "40%",
            }}
          />
          <RenderFileInput input={{ name: "file" }} type="file" meta="" />
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
              Hesabın var mı? Giriş Yap
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
