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
                    this.handleNavDisplay(pendingfriend.id);
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
    nav: state.user.nav,
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
    setNav: (nav) => {
      dispatch(userActions.setNav(nav));
    },
  };
};

PendingFriends.propTypes = {
  id: PropTypes.string.isRequired,
  pendingFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  approveFriend: PropTypes.func.isRequired,
  declineFriend: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingFriends);
