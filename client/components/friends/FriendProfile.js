import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../store/actions/index';

class FriendProfile extends Component {
  render() {
    const { users, friendNav } = this.props;
    const friend = users.find((fri) => fri.id === friendNav.friendId);
    return (
      <div className="recipe-card">
        <h1>{friend.firstName}</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.user.usersList,
    friendNav: state.user.friendNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriendDetails: (userId) => {
      dispatch(userActions.fetchFriendDetails(userId));
    },
  };
};

FriendProfile.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  friendNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
