/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../store/actions/index';

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const {
    //   props: {
    //     match: {
    //       params: { friendid },
    //     },
    //   },
    // } = this.props;
    // console.log('id ==== ', friendid);
    const { loadFriendDetails } = this.props;
    loadFriendDetails('ac3287fb-268d-4c3c-8607-9e12bc9ac666');
  }

  render() {
    const { friendData } = this.props;
    return (
      <div className="routesContainer">
        <div className="routes">
          <form>
            <div className="form-group">
              <label>First Name:</label>
              <label> {friendData.firstName}</label>
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <label> {friendData.lastName}</label>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <label> {friendData.email}</label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    friendData: state.user.friendData,
    friendNav: state.user.nav,
    friendId: state.user.nav.friendId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriendDetails: (userId) => {
      dispatch(userActions.fetchFriendDetails(userId));
    },
  };
};

FriendProfile.defaultProps = {
  friendNav: {
    open: false,
    id: '',
  },
};

FriendProfile.propTypes = {
  loadFriendDetails: PropTypes.func.isRequired,
  friendData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  friendNav: PropTypes.shape({
    open: PropTypes.bool,
    friendId: PropTypes.string,
  }),
  // props: PropTypes.shape({
  //   history: PropTypes.isRequired,
  //   match: PropTypes.shape({
  //     params: PropTypes.shape({
  //       friendid: PropTypes.string.isRequired,
  //     }).isRequired,
  //   }).isRequired,
  //   // history: propTypes.objectOf().isRequired,
  // }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
