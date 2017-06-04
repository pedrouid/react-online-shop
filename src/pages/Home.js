import React, { Component } from 'react';
import Header from '../components/Header';
import CartView from '../components/CartView';
import ProductView from '../components/ProductView';

class Home extends Component {
  state = {
    view: '',
    products: []
  }
  changeView = view => this.setState({ view })
  render() {
    return (
      <div>
        <Header changeView={this.changeView} view={this.state.view} />
        {
          (this.state.view.toLowerCase() === 'cart')
          ? <CartView />
          : <ProductView category={this.state.view} />
        }
      </div>
    );
  }
}

export default Home;
