import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from './Link';

const StyledBreadcrumbs = styled.div`
  width: 100%;
  float: left;
  text-align:left;
  margin: 30px 0;
`;

const StyledSpan = styled.span`
  padding: 0 5px;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledCaret = styled.span`
  font-weight: 700;
`;

const Breadcrumbs = ({ category, pathname, productName }) => (
  <StyledBreadcrumbs>
    <Link to={'/'}><StyledSpan>{'Shop'}</StyledSpan></Link>
    <StyledCaret>{'>'}</StyledCaret>
    <Link to={`/${category}`}><StyledSpan>{category}</StyledSpan></Link>
    <StyledCaret>{'>'}</StyledCaret>
    <Link to={`/${pathname}`}><StyledSpan>{productName}</StyledSpan></Link>
  </StyledBreadcrumbs>
);

Breadcrumbs.propTypes = {
  category: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired
};

export default Breadcrumbs;
