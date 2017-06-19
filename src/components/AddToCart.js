import React from 'react';
import styled from 'styled-components';
import { transitions, colors } from '../styles';

const StyledButton = styled.button`
  transition: ${transitions.base};
  background: none;
  border: 2px solid rgb(${colors.dark});
  cursor: pointer;
  font-size: 20px;
  padding: 15px 30px;
  border-radius: 5px;
  margin: 20px 0;
  &:hover {
    opacity: 0.7;
    outline: rgba(${colors.dark}, 0.3)
  }
`;

const AddToCart = () => (
  <StyledButton>Add to Cart</StyledButton>
);
export default AddToCart;
