import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCurrencySymbol } from '../helpers/utilities';

const StyledPrice = styled.div`
  width: 100%;
`;

const Price = ({ unitPrice, ...otherProps }) => (
  <StyledPrice {...otherProps}>
    {(unitPrice.saleValue)
      ? <div>
        <span>`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.saleValue}`</span>
        <span>`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.retailValue}`</span>
      </div>
      : <div>
        <span>`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.retailValue}`</span>
      </div>
    }
  </StyledPrice>
);

Price.propTypes = {
  unitPrice: PropTypes.object.isRequired
};

export default Price;
