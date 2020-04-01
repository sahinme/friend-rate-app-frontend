import React from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Button from '@material-ui/core/Button';
import './App.css';
import QuestionPage from './components/questionCard';
import SignUp from 'components/signUp';

function mainLayout(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h3> Friend Rate /  </h3>
        <QuestionPage username={props.match.params.username} />
        <p>
          Profilini olustur. Arkadaşların oylasın
      </p>
        <Link to="/signUp" >
          <Button /* onClick={() => props.history.push('/signUp')} */ variant="outlined" color="primary">
            Profil Oluştur
        </Button>
        </Link>
      </header>
    </div >
  )
}

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/signUp" component={SignUp} />
        <Route path="/:username" component={mainLayout} />
      </Switch>
    </Router>
  );
}

export default App;
