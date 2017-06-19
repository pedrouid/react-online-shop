import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, fonts, transitions } from '../styles';

const StyledOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${transitions.base};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ show }) => show ? `rgba(${colors.black}, 0.5)` : 'transparent'};
  opacity: ${({ show }) => show ? 1 : 0};
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};
  pointer-events: ${({ show }) => show ? 'auto' : 'none'};
`;

const StyledImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  & img {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  padding: 14px 0;
  width: 20%;
  display: inline;
  cursor: pointer;
  color: rgb(${colors.dark});
  -webkit-appearance: none;
  background: none;
  text-align: left;
  font-size: ${fonts.medium};
`;

class SizeChart extends Component {
  state = {
    show: false
  }
  render() {
    return (
      <div>
        <StyledButton onClick={() => this.setState({ show: true })}>Size Chart</StyledButton>
        <StyledOverlay onClick={() => this.setState({ show: false })} show={this.state.show}>
          <StyledImageWrapper show={this.state.show}>
            <img src="http://res.cloudinary.com/gomesphoto/image/upload/v1497882248/5.clothing_sizes_kwzctb.jpg" alt="clothing sizes" />
          </StyledImageWrapper>
        </StyledOverlay>
      </div>
    );
  }
}
export default SizeChart;
