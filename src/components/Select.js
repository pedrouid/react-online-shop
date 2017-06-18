import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts } from '../styles';
import { capitalCase } from '../helpers/utilities';

const StyledSelect = styled.select`
  -webkit-appearance: none;
  border: 1px solid black;
  border-radius: 10px;
  font-size: ${fonts.medium};
  line-height: 1.2;
  padding: 5px 0 5px 15px;
  left: 0;
  text-align: center;
  outline: none;
`;

const renderOptions = (options, capitalize) =>
  options.map(option => (
    <option key={option} value={option.toLowerCase()}>
      {(capitalize) ? capitalCase(option) : option}
    </option>
  ));

const Select = ({ options, emptyOption, capitalize, ...otherProps }) => (
  <StyledSelect {...otherProps}>
    {(emptyOption) && <option disabled selected value>{emptyOption}</option>}
    {renderOptions(options, capitalize)}
  </StyledSelect>
);

Select.propTypes = {
  options: PropTypes.array.isRequired,
  emptyOption: PropTypes.string,
  capitalize: PropTypes.bool
};

Select.defaultProps = {
  emptyOption: '',
  capitalize: false
};

export default Select;
