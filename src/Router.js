import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
import { Switch, Route } from 'react-router-dom';
import FadeIn from './components/FadeIn';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { setSession, getSession } from './helpers/utilities';
import './libraries/CSSTransitionAnimation.css';

const StyledWrapper = styled(FadeIn)`
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

const CSSTransitionConfig = {
  transitionName: 'fade',
  className: 'transitionContainer',
  transitionEnterTimeout: 300,
  transitionLeaveTimeout: 300
};

class Router extends Component {
  componentDidMount() {
    if (!getSession()) {
      setSession();
    }
    window.rogueDispatch = this.context.store.dispatch;
    window.browserHistory = this.context.router.history;
  }
  render = () => (
    <StyledWrapper>
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route
          exact
          path="/"
          render={({ location }) => (
            <div>
              <Header view={location.pathname} />
              <CSSTransitionGroup {...CSSTransitionConfig}>
                <Route
                  location={location}
                  key={location.key}
                  component={Home}
                />
              </CSSTransitionGroup>
            </div>
            )}
        />
        <Route
          exact
          path="/:route"
          render={({ location }) => (
            <div>
              <Header view={location.pathname} />
              <CSSTransitionGroup {...CSSTransitionConfig}>
                <Route
                  location={location}
                  key={location.key}
                  component={Home}
                />
              </CSSTransitionGroup>
            </div>
            )}
        />
        <Route component={NotFound} />
      </Switch>
    </StyledWrapper>
  );
}

Router.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Router;
