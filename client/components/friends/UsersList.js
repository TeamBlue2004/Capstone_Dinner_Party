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
                  this.handleNavDisplay(user.id);
                }}
                onKeyPress={null}
                tabIndex={0}
                role="button"
                className="user-search-result"
              >
                <div className="user-image">
                  <img
                    src={user.profilePic}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </div>
                <p>
                  {user.firstName} {user.lastName}
                </p>
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
    nav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (friendId, userId) => {
      dispatch(userActions.addAsFriend(friendId, userId));
    },
    setNav: (nav) => {
      dispatch(userActions.setNav(nav));
    },
  };
};

UsersList.propTypes = {
  id: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  addFriend: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
