import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../store/actions/index';
import './friends.scss';

class PendingFriends extends Component {
  approveFriend = (friendId, userId) => {
    const { approveFriend } = this.props;
    approveFriend(friendId, userId);
  };

  declineFriend = (friendId, userId) => {
    const { declineFriend } = this.props;
    declineFriend(friendId, userId);
  };

  handleFriendDisplay = (friendId) => {
    const { setFriendNav, friendNav } = this.props;
    if (friendId === friendNav.friendId) {
      const nav = { open: !friendNav.open, id: '' };
      setFriendNav(nav);
    } else {
      const nav = { open: true, id: friendId };
      setFriendNav(nav);
    }
  };

  render() {
    const { id, pendingFriendsList } = this.props;
    return (
      <>
        {pendingFriendsList.map((pendingfriend) => {
          return (
            <li
              key={pendingfriend.id}
              className="list-group-item d-flex flex-column"
            >
              <div className="d-flex flex-row justify-content-between">
                <div
                  onClick={() => {
                    this.handleFriendDisplay(pendingfriend.id);
                  }}
                  onKeyPress={null}
                  tabIndex={0}
                  role="button"
                >
                  {pendingfriend.firstName} {pendingfriend.lastName}
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => this.approveFriend(pendingfriend.id, id)}
                    value="approve"
                  >
                    <i className="fas fa-check fa-2x"></i>
                  </button>
                  <button
                    type="submit"
                    onClick={() => this.declineFriend(pendingfriend.id, id)}
                    value="decline"
                  >
                    <i className="fas fa-times fa-2x"></i>
                  </button>
                </div>
              </div>
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
    pendingFriendsList: state.user.pendingFriendsList,
    friendNav: state.user.friendNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    approveFriend: (friendId, userId) => {
      dispatch(userActions.approveFriend(friendId, userId));
    },
    declineFriend: (friendId, userId) => {
      dispatch(userActions.declineFriend(friendId, userId));
    },
    setFriendNav: (nav) => {
      dispatch(userActions.setFriendNav(nav));
    },
  };
};

PendingFriends.propTypes = {
  id: PropTypes.string.isRequired,
  pendingFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  friendNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  approveFriend: PropTypes.func.isRequired,
  declineFriend: PropTypes.func.isRequired,
  setFriendNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriends);
