import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`;

const Cart = () => (
  <StyledContainer>
    <h1>This is Cart</h1>
  </StyledContainer>
);

export default Cart;
