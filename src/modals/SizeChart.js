import React from 'react';
import styled from 'styled-components';

const StyledImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  & img {
    width: 100%;
  }
`;

const SizeChart = () => (
  <StyledImageWrapper>
    <img src="http://res.cloudinary.com/gomesphoto/image/upload/v1497882248/5.clothing_sizes_kwzctb.jpg" alt="clothing sizes" />
  </StyledImageWrapper>
);

export default SizeChart;
