import React from 'react';
import PropTypes from 'prop-types';
import Inventory from '../libraries/inventory.json';
import ProductSingle from '../pages/ProductSingle';
import ProductList from '../pages/ProductList';

const getProduct = pathname =>
  Inventory.products.filter(product => product.pathname === pathname)[0];

const Products = ({ view }) => (
  <div>
    {(Inventory.categories.indexOf(view) === -1 && view)
    ? <ProductSingle product={getProduct(view)} />
    : <ProductList view={view} />}
  </div>
);

Products.propTypes = {
  view: PropTypes.string.isRequired
};

export default Products;
