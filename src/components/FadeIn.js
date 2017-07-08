import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { transitions } from '../styles';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledFadeIn = styled.div`
  height: 100vh;
  width: 100vw;
  transition: ${transitions.base};
  will-change: transform, opacity;
  animation: 0.5s ease 0s normal 1 ${fadeIn};
`;

const FadeIn = ({ children, ...otherProps }) => (
  <StyledFadeIn {...otherProps}>
    {children}
  </StyledFadeIn>
);

FadeIn.propTypes = {
  children: PropTypes.node.isRequired
};

export default FadeIn;
