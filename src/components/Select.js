import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts, colors } from '../styles';
import { capitalize } from '../helpers/utilities';

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


const Select = ({ dark, options, emptyOption, capital, value, ...otherProps }) => (
  <StyledSelect dark={dark} {...otherProps}>
    {(emptyOption) && <option key="emptyOption" disabled selected value>{emptyOption}</option>}
    {options.map(option => (
      <option
        key={option}
        value={option.toLowerCase()}
        selected={!!value && option.toLowerCase() === value.toLowerCase()}
      >
        {(capital) ? capitalize(option) : option}
      </option>
    ))}
  </StyledSelect>
);

Select.propTypes = {
  options: PropTypes.array.isRequired,
  emptyOption: PropTypes.string,
  capital: PropTypes.bool,
  dark: PropTypes.bool,
  value: PropTypes.string,
};

Select.defaultProps = {
  emptyOption: '',
  capital: false,
  dark: false,
  value: ''
};

export default Select;
