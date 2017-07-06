import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Link from '../components/Link';
import cartIcon from '../assets/cart.svg';
import logo from '../assets/logo.png';
import { colors, transitions } from '../styles';

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-bottom: 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  max-width: 1200px;
  text-align: center;
`;

const StyledLogo = styled.img`
  width: 80px;
  cursor: pointer;
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
  font-weight: ${({ active }) => active ? '700' : '400'};
  &:hover {
    opacity: ${({ active }) => active ? '1' : '0.7'};
  }
`;

const StyledCartWrapper = styled.div`
  position: relative;
  transition: ${transitions.base};
  width: auto;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledCart = styled.img`
  width: 30px;
`;

const StyledCartSize = styled.div`
  border-radius: 50%;
  background: rgb(${colors.dark});
  position: absolute;
  color: rgb(${colors.white});
  cursor: pointer;
  padding: 5px;
  width: 20px;
  top: 12px;
  right: -12px;
  font-weight: 700;
  font-size: 10px;
  animation: ${pop} 0.5s ease-in-out;
`;

const checkCartSize = (cart) => {
  let total = 0;
  if (cart.length) return total;
  Object.keys(cart).map((sku) => {
    const quantity = Number(cart[sku].quantity);
    if (quantity) total += quantity;
    return null;
  });
  return total;
};

const Header = ({ view, cart, ...otherProps }) => (
  <StyledHeader {...otherProps}>
    <Link to="/">
      <StyledLogo src={logo} alt="App Logo" />
    </Link>
    <StyledMenu>
      <Link to={'/coats'}>
        <StyledMenuItem active={view.toLowerCase() === 'coats'}>Coats</StyledMenuItem>
      </Link>
      <Link to={'/dresses'}>
        <StyledMenuItem active={view.toLowerCase() === 'dresses'}>Dresses</StyledMenuItem>
      </Link>
      <Link to={'/combos'}>
        <StyledMenuItem active={view.toLowerCase() === 'combos'}>Combos</StyledMenuItem>
      </Link>
      <Link to={'/accessories'}>
        <StyledMenuItem active={view.toLowerCase() === 'accessories'}>Accessories</StyledMenuItem>
      </Link>
    </StyledMenu>
    <Link to="/cart">
      <StyledCartWrapper>
        <StyledCart active={view.toLowerCase() === 'cart'} src={cartIcon} alt="Cart" />
        {(!!checkCartSize(cart)) && (<StyledCartSize>{checkCartSize(cart)}</StyledCartSize>)}
      </StyledCartWrapper>
    </Link>
  </StyledHeader>
);

Header.propTypes = {
  view: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired
};

const reduxProps = ({ cart }) => ({
  cart: cart.cart
});

export default connect(reduxProps, null)(Header);
