import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import QuestionPage from './components/questionCard';

function mainLayout(props) {
  console.log(props);

  return (
    <div className="App">
      <header className="App-header">
        <QuestionPage username={props.match.params.username} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
      </p>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
      </a>
      </header>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:username" component={mainLayout} />
      </Switch>
    </Router>
  );
}

export default App;
