import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

const NotFound = () => (
  <div>
    <Wrapper>
      <Link to="/"><h1>404 Page Not Found</h1></Link>
    </Wrapper>
  </div>
);

export default NotFound;
