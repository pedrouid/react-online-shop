import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts, colors } from '../styles';
import { capitalCase } from '../helpers/utilities';

const StyledSelect = styled.select`
  -webkit-appearance: none;
  border-radius: 4px;
  border-style: none;
  border: none;
  background: ${({ dark }) => dark ? `rgb(${colors.dark})` : `rgb(${colors.white})`};
  color: ${({ dark }) => dark ? `rgb(${colors.white})` : `rgb(${colors.dark})`};
  font-size: ${fonts.medium};
  padding: 5px 15px;
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

const Select = ({ dark, options, emptyOption, capitalize, ...otherProps }) => (
  <StyledSelect dark={dark} {...otherProps}>
    {(emptyOption) && <option disabled selected value>{emptyOption}</option>}
    {renderOptions(options, capitalize)}
  </StyledSelect>
);

Select.propTypes = {
  options: PropTypes.array.isRequired,
  emptyOption: PropTypes.string,
  capitalize: PropTypes.bool,
  dark: PropTypes.bool
};

Select.defaultProps = {
  emptyOption: '',
  capitalize: false,
  dark: false
};

export default Select;
