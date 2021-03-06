import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';

import './App.css';

import reducers from './redux/store'
import ProjectList from './ProjectList';
import ProjectDetails from './ProjectDetails';
import TopMenu from './TopMenu';
import WelcomeMessage from './WelcomeMessage';

const store = createStore(
  reducers, 
  compose(
      applyMiddleware(thunk), 
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <div className="custom-container">
        <Container>
          <TopMenu />
          <WelcomeMessage />
          <Router>
            <Switch>
              <Route exact path="/"><Redirect to="/projects"></Redirect></Route>
              <Route exact path="/projects" component={ProjectList} />
              <Route exact path="/project/:id" component={ProjectDetails} />
            </Switch>
          </Router>
          <Divider />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
