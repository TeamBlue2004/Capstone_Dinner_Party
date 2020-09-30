import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FriendProfile from './FriendProfile';
import UsersList from './UsersList';
import { userActions } from '../../store/actions/index';
import './friends.scss';

class Friends extends Component {
  state = {
    searchTerm: '',
  };

  componentDidMount() {
    const {
      id,
      loadPendingFriends,
      loadApprovedFriends,
      loadUsers,
    } = this.props;
    loadPendingFriends(id);
    loadApprovedFriends(id);
    loadUsers();
  }

  editSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  dynamicSearch = () => {
    const { usersList, id } = this.props;
    const { searchTerm } = this.state;
    if (searchTerm) {
      return usersList
        .filter((user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((user) => user.id !== id);
    }
    return [];
  };

  addAsFriend = (friendId, userId) => {
    const { addFriend } = this.props;
    addFriend(friendId, userId);
  };

  approveAsFriend = (friendId, userId) => {
    const { approveFriend } = this.props;
    approveFriend(friendId, userId);
  };

  handleFriendDisplay = (friend) => {
    const { setFriendNav, friendNav } = this.props;
    if (friend.id === friendNav.friendId) {
      const nav = { open: !friendNav.open, id: '' };
      setFriendNav(nav);
    } else {
      const nav = { open: true, id: friend.id };
      setFriendNav(nav);
    }
  };

  render() {
    const {
      pendingFriendsList,
      id,
      requestSentMsg,
      approveRequestMsg,
      approvedFriendsList,
      friendNav,
    } = this.props;
    const { searchTerm } = this.state;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <input
              type="text"
              placeholder="Search for a user"
              value={searchTerm}
              onChange={this.editSearchTerm}
            />
            <ul className="searchFriendList list-group">
              <div>{requestSentMsg}</div>
              <UsersList users={this.dynamicSearch()} />
            </ul>
            <hr />
            {pendingFriendsList && pendingFriendsList.length !== 0 ? (
              <>
                <h2>{pendingFriendsList.length} pending friends request </h2>
                {pendingFriendsList.map((pendingfriend) => {
                  return (
                    <div key={pendingfriend.id}>
                      <div
                        className="friend-result-container"
                        onClick={() =>
                          this.handleFriendDisplay(pendingfriend.id)
                        }
                        onKeyPress={null}
                        tabIndex={0}
                        role="button"
                      >
                        {pendingfriend.firstName} {pendingfriend.lastName}
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                          onClick={() =>
                            this.approveAsFriend(pendingfriend.id, id)
                          }
                          value="approve friend request"
                        >
                          Approve Friend Request
                        </button>
                        <div>{approveRequestMsg}</div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div>You have no pending request</div>
            )}
            <hr />
            {approvedFriendsList && approvedFriendsList.length !== 0 ? (
              <>
                <h2>{approvedFriendsList.length} Friends</h2>
                <div>
                  {approvedFriendsList.map((friend) => {
                    return (
                      <div key={friend.id}>
                        <div
                          onClick={() => this.handleFriendDisplay(friend.id)}
                          onKeyPress={null}
                          tabIndex={0}
                          role="button"
                          className="friend-result-container"
                        >
                          {friend.firstName} {friend.lastName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div>You have no friends</div>
            )}
          </div>
        </div>
        {friendNav.open && friendNav.friendId !== '' && (
          <div className="infoContainer">
            <FriendProfile />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsList: state.user.friends,
    id: state.user.id,
    usersList: state.user.usersList,
    pendingFriendsList: state.user.pendingFriendsList,
    approvedFriendsList: state.user.approvedFriendsList,
    requestSentMsg: state.user.requestSentMsg,
    approveRequestMsg: state.user.approveRequestMsg,
    friendNav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPendingFriends: (userId) => {
      dispatch(userActions.fetchPendingFriends(userId));
    },
    loadApprovedFriends: (userId) => {
      dispatch(userActions.fetchApprovedFriends(userId));
    },
    loadUsers: () => {
      dispatch(userActions.fetchUsers());
    },
    addFriend: (friendId, userId) => {
      dispatch(userActions.addAsFriend(friendId, userId));
    },
    approveFriend: (friendId, userId) => {
      dispatch(userActions.approveAsFriend(friendId, userId));
    },
    setFriendNav: (nav) => {
      dispatch(userActions.setFriendNav(nav));
    },
  };
};

Friends.defaultProps = {
  approvedFriendsList: [],
  pendingFriendsList: [],
  usersList: [],
  friendNav: {
    open: false,
    id: '',
  },
};

Friends.propTypes = {
  approvedFriendsList: PropTypes.arrayOf(PropTypes.object),
  pendingFriendsList: PropTypes.arrayOf(PropTypes.object),
  usersList: PropTypes.arrayOf(PropTypes.object),
  friendNav: PropTypes.shape({
    open: PropTypes.bool,
    friendId: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  loadUsers: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  loadPendingFriends: PropTypes.func.isRequired,
  loadApprovedFriends: PropTypes.func.isRequired,
  approveFriend: PropTypes.func.isRequired,
  setFriendNav: PropTypes.func.isRequired,
  approveRequestMsg: PropTypes.string.isRequired,
  requestSentMsg: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
