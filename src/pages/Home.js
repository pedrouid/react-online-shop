import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import CartView from '../components/CartView';
import ProductView from '../components/ProductView';

class Home extends Component {
  state = {
    view: this.props.location.pathname.slice(1),
    products: []
  }
  render = () => (
    <div>
      <Header changeView={this.changeView} view={this.state.view} />
      <Route
        exact
        path="/"
        render={props => (
          <ProductView category={''} />
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
    </div>
  );
}

Home.propTypes = {
  location: PropTypes.object.isRequired
};

export default Home;
