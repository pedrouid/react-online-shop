import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from '../components/Link';
import cart from '../assets/cart.svg';
import logo from '../assets/logo.png';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  max-width: 1200px;
  margin: 20px auto;
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

const StyledCart = styled.img`
  width: 30px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Header = ({ view, ...otherProps }) => (
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
      <StyledCart active={view.toLowerCase() === 'cart'} src={cart} alt="Cart" />
    </Link>
  </StyledHeader>
);

Header.propTypes = {
  view: PropTypes.string.isRequired
};

export default Header;
