import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import cartIcon from '../assets/cart.svg';
import { colors, transitions } from '../styles';

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
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

const CartIcon = ({ quantity, active, ...props }) => (
  <StyledCartWrapper {...props}>
    <StyledCart active={active} src={cartIcon} alt="Cart" />
    {(!!quantity) && (<StyledCartSize>{quantity}</StyledCartSize>)}
  </StyledCartWrapper>
);

CartIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  quantity: PropTypes.number
};

CartIcon.defaultProps = {
  quantity: 0
};

export default CartIcon;
