import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Switch, Route } from 'react-router-dom';
import FadeIn from './components/FadeIn';
import Header from './components/Header';
import Modal from './components/Modal';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import { setSession, getSession } from './helpers/utilities';
import './libraries/CSSTransitionAnimation.css';

const CSSTransitionConfig = {
  transitionName: 'fade',
  className: 'transitionContainer',
  transitionEnterTimeout: 300,
  transitionLeaveTimeout: 300
};

class Router extends Component {
  state = {
    view: this.context.router.route.location.pathname.slice(1)
  }
  componentDidMount() {
    if (!getSession()) {
      setSession();
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ view: nextContext.router.route.location.pathname.slice(1) });
  }
  render = () => (
    <FadeIn>
      <Header view={this.state.view} />
      <Switch>
        <Route
          exact
          path="/"
          render={({ location }) => (
            <div>
              <CSSTransitionGroup {...CSSTransitionConfig}>
                <Route
                  location={location}
                  key={location.key}
                  render={() => <Home view={this.state.view} />}
                />
              </CSSTransitionGroup>
            </div>
            )}
        />
        <Route
          exact
          path="/cart"
          render={({ location }) => (
            <div>
              <CSSTransitionGroup {...CSSTransitionConfig}>
                <Route
                  location={location}
                  key={location.key}
                  render={() => <Cart view={this.state.view} />}
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
              <CSSTransitionGroup {...CSSTransitionConfig}>
                <Route
                  location={location}
                  key={location.key}
                  render={() => <Products view={this.state.view} />}
                />
              </CSSTransitionGroup>
            </div>
            )}
        />
        <Route
          render={({ location }) => (
            <div>
              <CSSTransitionGroup {...CSSTransitionConfig}>
                <Route
                  location={location}
                  key={location.key}
                  render={() => <NotFound view={this.state.view} />}
                />
              </CSSTransitionGroup>
            </div>
            )}
        />
      </Switch>
      <Modal />
    </FadeIn>
  );
}

Router.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Router;
