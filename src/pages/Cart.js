import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from '../components/Select';
import Link from '../components/Link';
import Wrapper from '../components/Wrapper';
import Inventory from '../libraries/inventory.json';
import { getCurrencySymbol, convertMoneyStringToInt, convertIntToMoneyString } from '../helpers/utilities';
import { cartClear, cartRemove, cartUpdate } from '../redux/_cart';
import { colors } from '../styles';

const StyledHeader = styled.h1`
  font-weight: 700;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledRow = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(${colors.dark}, 0.3);
  & > div:nth-child(1) {
    width: 10%;
  }
  & > div:nth-child(2) {
    width: 45%;
  }
  & > div:nth-child(3) {
    width: 15%;
  }
  & > div:nth-child(4) {
    width: 15%;
  }
  & > div:nth-child(5) {
    width: 15%;
  }
`;

const StyledColumn = styled.div`
  display: block;
`;

const StyledImg = styled.img`
  width: 80%;
`;

const StyledLeft = styled.div`
  width: 65%;
  padding: 10px;
`;

const StyledRight = styled.div`
  width: 35%;
  padding: 20px 10px;
`;

const StyledInline = styled.div`
  display: inline;
  padding: 10px 25px;
`;

const StyledFlex = styled.div`
  display: flex;
`;

const getPrice = (unitPrice) => {
  if (unitPrice.saleValue) {
    return `${getCurrencySymbol(unitPrice.currency)} ${unitPrice.saleValue}`;
  }
  return `${getCurrencySymbol(unitPrice.currency)} ${unitPrice.retailValue}`;
};

const getUnitSubtotal = (quantity, unitPrice) => {
  if (unitPrice.saleValue) {
    return convertIntToMoneyString(
      quantity * unitPrice.saleValue,
      getCurrencySymbol(unitPrice.currency)
    );
  }
  return convertIntToMoneyString(
    quantity * unitPrice.retailValue,
    getCurrencySymbol(unitPrice.currency)
  );
};

const getTotal = (cart, shippingAmount) => {
  if (cart.subtotal && shippingAmount) {
    const subtotal = convertMoneyStringToInt(cart.subtotal);
    const shipping = convertMoneyStringToInt(shippingAmount);
    return convertIntToMoneyString(subtotal + shipping);
  }
  return null;
};

const getShippingPrice = (shipping) => {
  const price = Inventory.shipping
  .filter(x => x.type.toLowerCase() === shipping.toLowerCase())[0].price;
  return convertIntToMoneyString(price.value, getCurrencySymbol(price.currency));
};

const renderCart = cart =>
  Object.keys(cart).map((key) => {
    if (key === 'totalQuantity' || key === 'subtotal') return null;
    return cart[key].options.map(option => (
      <StyledRow key={`${key}-${option.size}`}>
        <StyledColumn>
          <Link to={`${cart[key].pathname}`}>
            <StyledImg src={cart[key].imageUrl} alt={cart[key].pathname} />
          </Link>
        </StyledColumn>
        <StyledColumn>
          <Link to={`${cart[key].pathname}`}><p>{cart[key].pathname}</p></Link>
          <p>{option.size}</p>
        </StyledColumn>
        <StyledColumn>
          {getPrice(cart[key].unitPrice)}
        </StyledColumn>
        <StyledColumn>
          {option.quantity}
        </StyledColumn>
        <StyledColumn>
          {getUnitSubtotal(option.quantity, cart[key].unitPrice)}
        </StyledColumn>
      </StyledRow>
    ));
  });

class Cart extends Component {
  state = {
    cart: this.props.cart,
    shippingSelected: 'UK Standard',
    shippingAmount: getShippingPrice('UK Standard')
  }
  setShipping = ({ target }) =>
    this.setState({
      shippingSelected: target.value,
      shippingAmount: getShippingPrice(target.value)
    });
  render = () => (
    <div>
      <Wrapper>
        <StyledHeader>Shopping Cart</StyledHeader>
        <StyledGrid>
          <StyledRow key={'cartHeader'}>
            <StyledColumn>{' '}</StyledColumn>
            <StyledColumn>Item</StyledColumn>
            <StyledColumn>Unit Price</StyledColumn>
            <StyledColumn>Quantity</StyledColumn>
            <StyledColumn>Price</StyledColumn>
          </StyledRow>
          {renderCart(this.state.cart)}
        </StyledGrid>
        <StyledGrid>
          <StyledLeft>
            <p>Shipping Options</p>
            <Select
              value={this.state.shippingSelected}
              onChange={this.setShipping}
              options={Inventory.shipping.map(x => x.type)}
            />
          </StyledLeft>
          <StyledRight>
            <StyledFlex>
              <StyledInline>Subtotal</StyledInline>
              <StyledInline>{convertIntToMoneyString(this.state.cart.subtotal)}</StyledInline>
            </StyledFlex>
            <StyledFlex>
              <StyledInline>Shipping</StyledInline>
              <StyledInline>{convertIntToMoneyString(this.state.shippingAmount)}</StyledInline>
            </StyledFlex>
            <StyledFlex>
              <StyledInline>Total</StyledInline>
              <StyledInline>{getTotal(this.state.cart, this.state.shippingAmount)}</StyledInline>
            </StyledFlex>
          </StyledRight>
        </StyledGrid>
      </Wrapper>
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired
};

const reduxProps = ({ cart }) => ({
  cart: cart.cart
});

export default connect(reduxProps, { cartClear, cartRemove, cartUpdate })(Cart);
