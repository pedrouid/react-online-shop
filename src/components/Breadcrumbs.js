import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from './Link';

const StyledBreadcrumbs = styled.div`
  width: 100%;
  float: left;
  text-align:left;
`;

const StyledSpan = styled.span`
  &:hover {
    opacity: 0.7;
  }
`;

const StyledCaret = styled.span`
  font-weight: 700;
`;

const Breadcrumbs = ({ product }) => (
  <StyledBreadcrumbs>
    <Link to={'/'}><StyledSpan>{'Shop'}</StyledSpan></Link>
    <StyledCaret>{'>'}</StyledCaret>
    <Link to={`/${product.category}`}><StyledSpan>{product.category}</StyledSpan></Link>
    <StyledCaret>{'>'}</StyledCaret>
    <Link to={`/${product.pathname}`}><StyledSpan>{product.productName}</StyledSpan></Link>
  </StyledBreadcrumbs>
);

Breadcrumbs.propTypes = {
  product: PropTypes.object.isRequired
};
