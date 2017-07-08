import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`;

const Wrapper = ({ children, ...otherProps }) => (
  <StyledWrapper {...otherProps}>
    {children}
  </StyledWrapper>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrapper;
