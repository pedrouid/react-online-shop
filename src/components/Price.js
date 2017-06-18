import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCurrencySymbol } from '../helpers/utilities';
import { fonts, colors } from '../styles';

const StyledPrice = styled.div`
  width: 100%;
`;

const StyledSpan = styled.span`
  font-size: ${fonts.h4};
  padding: 0 5px;
`;

const StyledRetail = styled(StyledSpan)`
  text-decoration: ${({ sale }) => sale ? 'line-through' : 'none'};
`;

const StyledSale = styled(StyledSpan)`
  color: rgb(${colors.red});
`;

const Price = ({ unitPrice, ...otherProps }) => (
  <StyledPrice {...otherProps}>
    {(unitPrice.saleValue)
      ? <div>
        <StyledSale>{`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.saleValue}`}</StyledSale>
        <StyledRetail sale>{`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.retailValue}`}</StyledRetail>
      </div>
      : <div>
        <StyledRetail>{`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.retailValue}`}</StyledRetail>
      </div>
    }
  </StyledPrice>
);

Price.propTypes = {
  unitPrice: PropTypes.object.isRequired
};

export default Price;
