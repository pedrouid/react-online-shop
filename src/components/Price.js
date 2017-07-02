import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCurrencySymbol } from '../helpers/utilities';
import { fonts, colors } from '../styles';

const StyledPrice = styled.div`
  width: 100%;
`;

const StyledSpan = styled.span`
  font-size: ${({ fontSize }) => fontSize ? fonts[fontSize] : fonts.large};
  padding: 0 5px;
`;

const StyledRetail = styled(StyledSpan)`
  padding: 0 5px;
  font-weight: ${({ sale }) => sale ? '300' : '700'};
  font-size: ${({ sale }) => sale ? '100%' : '120%'};
  text-decoration: ${({ sale }) => sale ? 'line-through' : 'none'};
`;

const StyledSale = styled(StyledSpan)`
  padding: 0 5px;
  font-weight: 700;
  color: rgb(${colors.red});
`;

const Price = ({ unitPrice, fontSize, ...otherProps }) => (
  <StyledPrice {...otherProps}>
    {(unitPrice.saleValue)
      ? <div>
        <StyledSale fontSize={fontSize}>{`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.saleValue}`}</StyledSale>
        <StyledRetail sale fontSize={fontSize}>{`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.retailValue}`}</StyledRetail>
      </div>
      : <div>
        <StyledRetail fontSize={fontSize}>{`${getCurrencySymbol(unitPrice.currency)} ${unitPrice.retailValue}`}</StyledRetail>
      </div>
    }
  </StyledPrice>
);

Price.propTypes = {
  unitPrice: PropTypes.object.isRequired,
  fontSize: PropTypes.string,
};

Price.defaultProps = {
  fontSize: 'large'
};

export default Price;
