import React, { Component } from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import cart from '../assets/cart.svg';
import logo from '../assets/logo.png';
import Inventory from '../libraries/inventory.json';

const StyledLogo = styled.img`
  width: 80px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  max-width: 1200px;
  margin: 20px auto;
  text-align: center;
`;

const StyledMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 18px;
`;

const StyledMenuItem = styled.li`
  text-decoration: none;
  display: inline;
  margin: 0;
  padding: 0 20px;
`;

const StyledCart = styled.img`
  width: 30px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`;

const StyledCard = styled.div`
  width: 20%;
  padding: 0.5%;
  height: calc((100vw * 0.2) * 1.4);
  @media (min-width: 1200px) {
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
  box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.15);
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
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const StyledName = styled.div`
  width: 100%;
`;
const StyledSale = styled.div`
  width: 50%;
`;
const StyledPrice = styled.div`
  width: 50%;
  text-decoration: line-through;
  color: red;
`;

const displayProducts = ({ products }) =>
  products.map(product => (
    <StyledCard>
      <StyledProduct imageUrl={product.imageUrl}>
        <StyledOverlay>
          <StyledWrapper>
            <StyledName>{product.productName}</StyledName>
            <StyledPrice>{product.unitPrice.retailValue}</StyledPrice>
            <StyledSale>{product.unitPrice.saleValue}</StyledSale>
          </StyledWrapper>
        </StyledOverlay>
      </StyledProduct>
    </StyledCard>
  ));

class Home extends Component {
  state = {
    category: '',
    products: []
  }
  render() {
    return (
      <div>
        <StyledHeader>
          <Link to="/">
            <StyledLogo src={logo} alt="App Logo" />
          </Link>
          <StyledMenu>
            <StyledMenuItem onCLick={() => this.setState({ category: 'Coats' })}>Coats</StyledMenuItem>
            <StyledMenuItem onCLick={() => this.setState({ category: 'Dresses' })}>Dresses</StyledMenuItem>
            <StyledMenuItem onCLick={() => this.setState({ category: 'Combos' })}>Combos</StyledMenuItem>
            <StyledMenuItem onCLick={() => this.setState({ category: 'Accessories' })}>Accessories</StyledMenuItem>
          </StyledMenu>
          <StyledCart src={cart} alt="Cart" />
        </StyledHeader>
        <StyledContainer>
          {displayProducts(Inventory)}
        </StyledContainer>
      </div>
    );
  }
}

export default Home;
