import React from 'react';
import { Route, Switch, BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './App.css';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import QuestionPage from './components/questionCard';
import { CopyToClipboard } from "react-copy-to-clipboard";
import SignUp from 'components/signUp';
import SignIn from "components/signIn";
import Home from 'components/home';
import { readLocalStorage } from 'helper';
import { Row } from 'reactstrap';
import { LightTooltip } from 'components/lightTooltip';
import CustomizedSnackbars from 'components/snackbar';

function mainLayout(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h3> Friend Rate /  </h3>
        <QuestionPage username={props.match.params.username} />
        <p>
          <code> Profilini oluştur. Oylamaya katıl </code>
        </p>
        <Link to="/signUp" >
          <Button variant="outlined" color="primary">
            Profil Oluştur
        </Button>
        </Link>
      </header>
    </div >
  )
}

function HomeLayout(props) {
  const [isOpen, setOpen] = React.useState(false);
  const user = readLocalStorage('user');
  return (
    <div className="App">
      <header className="App-header">
        <Row style={{ marginBottom: 90, marginTop: 40 }} >
          <Grid item xs={8}>
            <TextField
              style={{ color: "white" }}
              id="outlined-uncontrolled"
              label="Oylama linki"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={`http://friendrate.edutro.com/${user.username}`}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <CopyToClipboard onCopy={() => setOpen(true)} text={`http://friendrate.edutro.com/${user.username}`} >
              <LightTooltip title="Linki Kopyala">
                <FileCopyIcon style={{ cursor: "pointer" }} />
              </LightTooltip>
            </CopyToClipboard>
          </Grid>
          <CustomizedSnackbars open={isOpen} handleClose={() => setOpen(false)} />
        </Row>
        <h3> Son Gelen Oylamaların  </h3>
        <Home />
      </header>
    </div >
  )
}

function App() {
  const history = createBrowserHistory();
  const token = readLocalStorage('token');
  const user = readLocalStorage('user');
  return (
    <Router history={history}>
      <Switch>
        {/* <Redirect exact from="/" to="signUp" /> */}
        <Redirect exact from="/" to={token ? `/profile` : "/login"} />
        {/* <Route exact path="/" component={HomeLayout} /> */}
        <Route path="/profile" component={HomeLayout} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route path="/:username" component={mainLayout} />
      </Switch>
    </Router>
  );
}

export default App;
