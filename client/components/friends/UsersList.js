import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../store/actions/index';
import './friends.scss';

class UsersList extends Component {
  addAsFriend = (friendId, userId) => {
    const { addFriend } = this.props;
    addFriend(friendId, userId);
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
    const { users, id } = this.props;
    return (
      <>
        {users.map((user) => {
          return (
            <li
              key={user.id}
              className="list-group-item d-flex flex-row justify-content-between"
            >
              <div
                onClick={() => {
                  this.handleFriendDisplay(user.id);
                }}
                onKeyPress={null}
                tabIndex={0}
                role="button"
              >
                {user.firstName} {user.lastName}
              </div>
              <button
                type="submit"
                onClick={() => this.addAsFriend(user.id, id)}
                value="add Friend"
              >
                <i className="fas fa-user-plus fa-2x"></i>
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
    friendNav: state.user.friendNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (friendId, userId) => {
      dispatch(userActions.addAsFriend(friendId, userId));
    },
    setFriendNav: (nav) => {
      dispatch(userActions.setFriendNav(nav));
    },
  };
};

UsersList.propTypes = {
  id: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  friendNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  addFriend: PropTypes.func.isRequired,
  setFriendNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
