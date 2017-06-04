import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import FadeIn from './components/FadeIn';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

const StyledWrapper = styled(FadeIn)`
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

class Router extends Component {
  componentDidMount() {
    window.rogueDispatch = this.context.store.dispatch;
    window.browserHistory = this.context.router.history;
  }
  render = () => (
    <StyledWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
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
