import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

export default class Popup extends Component {
  state = {
    show: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;
    const { BodyModal, ButtonModal, title } = this.props;
    const { handleClose, handleShow } = this;

    return (
      <>
        {ButtonModal && <ButtonModal onClick={handleShow} />}
        <Modal show={show} onHide={handleClose} animation centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BodyModal />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

Popup.defaultProps = {
  ButtonModal: null,
  BodyModal: null,
  title: '',
};

Popup.propTypes = {
  ButtonModal: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  BodyModal: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  title: PropTypes.string,
};
