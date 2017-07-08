import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CartIcon from '../components/CartIcon';
import Link from '../components/Link';
import logo from '../assets/logo.png';

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

const Header = ({ view, cart, ...otherProps }) => (
  <StyledHeader {...otherProps}>
    <Link to="/">
      <StyledLogo src={logo} alt="App Logo" />
    </Link>
    <StyledMenu>
      <Link to={'/all'}>
        <StyledMenuItem active={view.toLowerCase() === 'all'}>All</StyledMenuItem>
      </Link>
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
      <CartIcon active={view.toLowerCase() === 'cart'} quantity={cart.totalQuantity} />
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
