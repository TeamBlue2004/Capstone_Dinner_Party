import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../store/actions/index';
import './friends.scss';

class ApprovedFriends extends Component {
  handleNavDisplay = (friendId) => {
    const { setNav, nav } = this.props;
    if (friendId === nav.friendId) {
      const navObj = {
        open: !nav.open,
        eventId: '',
        recipeId: '',
        friendId: '',
      };
      setNav(navObj);
    } else {
      const navObj = {
        open: true,
        eventId: '',
        recipeId: '',
        friendId,
      };
      setNav(navObj);
    }
  };

  render() {
    const { approvedFriendsList, id, deleteFriend } = this.props;
    return (
      <>
        {approvedFriendsList.map((friend) => {
          return (
            <li
              key={friend.id}
              className="list-group-item d-flex flex-row justify-content-between"
            >
              <div
                onClick={() => {
                  this.handleNavDisplay(friend.id);
                }}
                onKeyPress={null}
                tabIndex={0}
                role="button"
              >
                {friend.firstName} {friend.lastName}
              </div>
              <button
                type="submit"
                onClick={() => deleteFriend(friend.id, id)}
                value="decline"
              >
                <i className="fas fa-times fa-2x"></i>
              </button>
            </li>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    approvedFriendsList: state.user.approvedFriendsList,
    nav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (nav) => {
      dispatch(userActions.setNav(nav));
    },
    deleteFriend: (friendId, userId) => {
      dispatch(userActions.deleteFriend(friendId, userId));
    },
  };
};

ApprovedFriends.propTypes = {
  id: PropTypes.string.isRequired,
  approvedFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  setNav: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedFriends);
