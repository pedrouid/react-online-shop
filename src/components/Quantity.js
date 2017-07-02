import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts, colors } from '../styles';

const StyledQuantityLabel = styled.span`
  font-size: ${fonts.h5};
  font-weight: 700;
  padding-right: 10px;
`;

const StyledQuantityInput = styled.input`
  width: 15%;
  outline: none;
  border: none;
  text-align: center;
  line-height: 1.5;
  border-radius: 4px;
  font-size: ${fonts.medium};
  background: rgb(${colors.dark});
  color: rgb(${colors.white});
`;
class Quantity extends Component {
  state = {
    quantity: 1
  }
  _onChange = ({ target }) => {
    this.setState({ quantity: target.value });
    this.props.onChange(target.value);
  }
  render() {
    return (
      <div>
        <StyledQuantityLabel>Quantity</StyledQuantityLabel>
        <StyledQuantityInput type="number" min="1" max="99" value={this.state.quantity} onChange={this._onChange} />
      </div>
    );
  }
}

Quantity.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Quantity;
