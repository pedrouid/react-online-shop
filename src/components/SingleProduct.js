import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Breadcrumbs from './Breadcrumbs';
import Select from './Select';
import Price from './Price';
import { responsive, fonts } from '../styles';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  text-align: left;
  float: left;
`;

const StyledHalf = styled.div`
  width: 50%;
  @media (${responsive.sm.max}) {
    width: 100%;
  }
`;

const StyledInfo = styled(StyledHalf)`
  padding: 0 25px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.h1`
  font-weight: 700;
`;

const StyledVariant = styled.span`
  font-size: ${fonts.h5};
  font-weight: 700;
  padding-right: 10px;
`;

const StyledDescription = styled.p`
  width: 100%;
`;

const StyledOptions = styled.div`
  padding: 0;
`;

class SingleProduct extends Component {
  componentDidMount = () => {
    const productVariants = this.getVariants(this.props.product.variants);
    this.setState(productVariants);
  }

  onVariantChange = (variant, option) =>
    this.setState({ [variant]: option });

  getVariants = (variants) => {
    const productVariants = {};
    variants.map(variant => productVariants[variant.name] = '');
    return productVariants;
  };

  renderVariants = variants =>
  variants.map(variant => (
    <div>
      <StyledVariant>{variant.name}</StyledVariant>
      <Select
        required
        key={variant.name}
        dark
        onChange={({ target }) => this.onVariantChange(variant.name, target.value)}
        options={variant.options}
      />
    </div>
  ));

  render() {
    const { product } = this.props;
    return (
      <StyledContainer>
        <Breadcrumbs
          category={product.category}
          pathname={product.pathname}
          productName={product.productName}
        />
        <StyledHalf>
          <StyledImage src={product.imageUrl} />
        </StyledHalf>
        <StyledInfo>
          <StyledTitle>{product.productName}</StyledTitle>
          <Price unitPrice={product.unitPrice} />
          <StyledDescription>
            {product.description}
          </StyledDescription>
          <StyledOptions>
            {this.renderVariants(product.variants)}
          </StyledOptions>
        </StyledInfo>
      </StyledContainer>
    );
  }
}

SingleProduct.propTypes = {
  product: PropTypes.object.isRequired
};

export default SingleProduct;
