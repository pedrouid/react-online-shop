import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Breadcrumbs from './Breadcrumbs';
import Price from './Price';
import { responsive } from '../styles';

const StyledContainer = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`;

const StyledHalf = styled.div`
  width: 50%;
  @media (${responsive.md.min}) {
    width: 100%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.h1`
  font-weight: 700;
`;


const SingleProduct = ({ product }) => (
  <StyledContainer>
    <Breadcrumbs product={product} />
    <StyledHalf>
      <StyledImage src={product.imageUrl} />
    </StyledHalf>
    <StyledHalf>
      <StyledTitle>{product.productName}</StyledTitle>
      <Price unitPrice={product.unitPrice} />
    </StyledHalf>
  </StyledContainer>
);

SingleProduct.propTypes = {
  product: PropTypes.object.isRequired
};

export default SingleProduct;
