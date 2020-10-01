/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions, eventsActions } from '../../store/actions/index';

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
    const {
      loadFriendDetails,
      loadCommonEvents,
      friendId,
      userId,
    } = this.props;
    loadFriendDetails(friendId);
    loadCommonEvents(friendId, userId);
  }

  render() {
    const { friendData } = this.props;
    return (
      <div className="recipe-card">
        <h4>{friendData.userName}</h4>
        {/* <div className="recipe-image">
          <img src={ friendData.image} alt={friendData.image} />
        </div> */}

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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    friendData: state.user.friendData,
    friendNav: state.user.nav,
    friendId: state.user.nav.friendId,
    userId: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriendDetails: (friendId) => {
      dispatch(userActions.fetchFriendDetails(friendId));
    },
    loadCommonEvents: (friendId, userId) => {
      dispatch(eventsActions.fetchCommonEvents(friendId, userId));
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
  loadCommonEvents: PropTypes.func.isRequired,
  friendData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
  }).isRequired,
  friendNav: PropTypes.shape({
    open: PropTypes.bool,
    friendId: PropTypes.string,
  }),
  friendId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
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
