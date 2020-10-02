import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../store/actions/index';

class FriendProfile extends Component {
  render() {
    const { users, nav } = this.props;
    const friend = users.find((fri) => fri.id === nav.friendId);
    return (
      <div className="friendInfo">
        <h1>{`${friend.firstName} ${friend.lastName}`}</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.user.usersList,
    nav: state.user.nav,
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
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
