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
  width: 40px;
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
    let val = Number(target.value);
    if (val < 1) val = 1;
    if (val > 99) val = 99;
    this.setState({ quantity: val });
    this.props.onChange(val);
  }
  render() {
    return (
      <div>
        <StyledQuantityLabel>Quantity</StyledQuantityLabel>
        <StyledQuantityInput type="number" min="1" max={this.props.max} value={this.state.quantity} onChange={this._onChange} />
      </div>
    );
  }
}

Quantity.propTypes = {
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number
};

Quantity.defaultProps = {
  max: 99
};

export default Quantity;
