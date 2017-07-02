import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SizeChart from '../modals/SizeChart';
import { modalHide } from '../redux/_modal';
import { colors, transitions } from '../styles';

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

class Modal extends Component {
  hideModal = () => {
    this.props.modalHide();
  }
  render() {
    let view = null;
    const { show, modalID } = this.props;
    switch (modalID) {
      case 'SIZE_CHART_MODAL':
        view = (
          <SizeChart />
        );
        break;
      default:
        view = (
          <h1>{' '}</h1>
        );
        break;
    }
    return (
      <StyledOverlay onClick={this.hideModal} show={show}>
        {view}
      </StyledOverlay>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalID: PropTypes.string.isRequired,
  modalHide: PropTypes.func.isRequired
};

const reduxProps = ({ modal }) => ({
  show: modal.show,
  modalID: modal.modalID,
});

export default connect(reduxProps, { modalHide })(Modal);
