import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import CartView from '../components/CartView';
import ProductView from '../components/ProductView';

class Home extends Component {
  state = {
    view: this.props.location.pathname.slice(1),
    products: []
  }
  render = () => (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <ProductView view={''} />
          )}
        />
        <Route exact path="/cart" component={CartView} />
        <Route
          exact
          path="/:route"
          render={props => (
            <ProductView view={this.state.view} />
          )}
        />
      </Switch>
    </div>
  );
}

Home.propTypes = {
  location: PropTypes.object.isRequired
};

export default Home;
