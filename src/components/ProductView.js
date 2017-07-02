import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Inventory from '../libraries/inventory.json';
import SingleProduct from './SingleProduct';
import Price from '../components/Price';
import Link from './Link';
import { transitions, colors, responsive } from '../styles';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`;

const StyledCard = styled.div`
  padding: 2%;
  width: 100%;
  height: calc(100vw * 1.4);

  @media (${responsive.sm.min}) {
    padding: 1%;
    width: 33%;
    height: calc((100vw * 0.33) * 1.4);
  }

  @media (${responsive.md.min}) {
    padding: 0.5%;
    width: 20%;
    height: calc((100vw * 0.2) * 1.4);
  }

  @media (${responsive.lg.min}) {
    height: 336px;
  }
`;

const StyledProduct = styled.div`
  background-image: ${({ imageUrl }) => imageUrl && `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.15);
  & > div {
    transition: ${transitions.base};
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    background-color: rgba(${colors.lightGrey}, 0.8);
  }
  &:hover > div {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const StyledName = styled.div`
  width: 100%;
  font-weight: 700;
`;

const displayProducts = products =>
  products.map(product => (
    <StyledCard key={product.sku}>
      <Link to={`/${product.pathname}`}>
        <StyledProduct imageUrl={product.imageUrl}>
          <StyledOverlay>
            <StyledWrapper>
              <StyledName>{product.productName}</StyledName>
              <Price unitPrice={product.unitPrice} fontSize={'small'} />
            </StyledWrapper>
          </StyledOverlay>
        </StyledProduct>
      </Link>
    </StyledCard>
  ));

class ProductView extends Component {
  state = {
    products: this.filterProducts(this.props.view)
  }
  componentWillReceiveProps({ view }) {
    this.setState({ products: this.filterProducts(view) });
  }
  getProduct = pathname =>
    Inventory.products.filter(product => product.pathname === pathname)[0];
  filterProducts(category) {
    if (!category) return Inventory.products;
    const products = Inventory.products.filter(x => x.category === category);
    return products;
  }
  render() {
    return (
      <StyledContainer>
        {(Inventory.categories.indexOf(this.props.view) === -1 && this.props.view)
        ? <SingleProduct product={this.getProduct(this.props.view)} />
        : displayProducts(this.state.products)}
      </StyledContainer>
    );
  }
}

ProductView.propTypes = {
  view: PropTypes.string.isRequired
};

export default ProductView;
