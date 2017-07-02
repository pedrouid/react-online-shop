import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Breadcrumbs from './Breadcrumbs';
import Select from '../components/Select';
import Price from '../components/Price';
import Quantity from '../components/Quantity';
import AddToCart from '../components/AddToCart';
import { modalShow } from '../redux/_modal';
import { cartUpdate } from '../redux/_cart';
import { responsive, fonts, colors } from '../styles';

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
  margin: 10px 0;
`;

const StyledSizeChart = styled.span`
  cursor: pointer;
  color: rgb(${colors.dark});
  -webkit-appearance: none;
  background: none;
  text-align: left;
  margin-left: 10px;
  font-size: ${fonts.medium};
`;

class SingleProduct extends Component {
  state = {
    quantity: 1
  }
  componentDidMount = () => {
    const productVariants = this.getVariants(this.props.product.variants);
    this.setState(productVariants);
  }

  onVariantChange = (variant, option) =>
    this.setState({ [variant]: option });

  onQuantityChange = quantity =>
    this.setState({ quantity });

  onCardAdd = () => {
    this.props.cartUpdate();
  }

  getVariants = (variants) => {
    const productVariants = {};
    variants.map(variant => productVariants[variant.name] = '');
    return productVariants;
  };

  toggleSizeModal = () => {
    this.props.modalShow('SIZE_CHART_MODAL');
  }

  renderVariants = variants =>
  variants.map(variant => (
    <div>
      <StyledVariant key={`label-${variant.name}`}>{variant.name}</StyledVariant>
      <Select
        required
        key={variant.name}
        dark
        onChange={({ target }) => this.onVariantChange(variant.name, target.value)}
        options={variant.options}
      />
      {
        (variant.name.toLowerCase() === 'size')
        && <StyledSizeChart onClick={this.toggleSizeModal}>Size Chart</StyledSizeChart>
      }
    </div>
  ));

  render() {
    const {
      productName,
      category,
      pathname,
      unitPrice,
      description,
      variants,
      imageUrl
    } = this.props.product;
    return (
      <StyledContainer key={`product-${productName}`}>
        <Breadcrumbs
          category={category}
          pathname={pathname}
          productName={productName}
        />
        <StyledHalf>
          <StyledImage src={imageUrl} />
        </StyledHalf>
        <StyledInfo>
          <StyledTitle>{productName}</StyledTitle>
          <Price unitPrice={unitPrice} />
          <StyledDescription>
            {description}
          </StyledDescription>
          <StyledOptions>
            {this.renderVariants(variants)}
          </StyledOptions>
          {}
          <Quantity onChange={this.onQuantityChange} />
          <AddToCart onClick={this.onCardAdd} />
        </StyledInfo>
      </StyledContainer>
    );
  }
}

SingleProduct.propTypes = {
  product: PropTypes.object.isRequired,
  cartUpdate: PropTypes.func.isRequired,
  modalShow: PropTypes.func.isRequired
};

export default connect(null, { cartUpdate, modalShow })(SingleProduct);
