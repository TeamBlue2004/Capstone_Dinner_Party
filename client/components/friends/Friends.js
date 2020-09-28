import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/actions/index';
import FriendProfile from './FriendProfile';

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const { loadPendingFriends, id, loadApprovedFriends } = this.props;
    loadPendingFriends(id);
    loadApprovedFriends(id);
  }

  searchUsers = () => {
    const { loadUsers } = this.props;
    const { searchTerm } = this.state;
    loadUsers(searchTerm);
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

  // togglePane = (friend) => {
  //   const { isPaneOpen } = this.state;
  //   this.setState({ isPaneOpen: !isPaneOpen, friendId: friend.target.id });
  // };

  render() {
    const {
      pendingFriendsList,
      usersList,
      id,
      /* requestSentMessage, */
      approvedFriendsList,
      friendNav,
    } = this.props;
    const { searchTerm } = this.state;
    // loggedIn user should not appear in result if searchTerm matches with loggedIn User FN,LN or Username
    const filteredUsersList = usersList.filter((user) => user.id !== id);
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <input
              id="searchTerm"
              placeholder="Search"
              value={searchTerm}
              name="searchTerm"
              onChange={(e) => this.setState({ searchTerm: e.target.value })}
            />
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={this.searchUsers}
              value="Search Users"
            >
              Search Users
            </button>
            {filteredUsersList.length !== 0 ? (
              <div>
                <div>
                  <h2>{filteredUsersList.length} User Found</h2>
                </div>
                <div>
                  {filteredUsersList.map((user) => {
                    return (
                      <div key={user.id}>
                        <div
                          onClick={() => this.handleFriendDisplay(user.id)}
                          onKeyPress={null}
                          tabIndex={0}
                          role="button"
                        >
                          {user.id}
                        </div>

                        <div>
                          {user.firstName} {user.lastName}
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                            onClick={() => this.addAsFriend(user.id, id)}
                            value="add Friend"
                          >
                            Add as a Friend
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>No users</div>
            )}

            {pendingFriendsList && pendingFriendsList.length !== 0 ? (
              <div>
                <div>
                  <h2>{pendingFriendsList.length} pending friends request </h2>
                </div>
                <div>
                  {pendingFriendsList.map((pendingfriend) => {
                    return (
                      <div key={pendingfriend.id}>
                        {' '}
                        <Link
                          to={`/user/${pendingfriend.id}`}
                          key={pendingfriend.id}
                        >
                          <div>
                            {' '}
                            <div>
                              {pendingfriend.firstName} {pendingfriend.lastName}
                            </div>
                          </div>
                          <div>
                            {' '}
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
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>You have no pending request</div>
            )}

            {approvedFriendsList && approvedFriendsList.length !== 0 ? (
              <div>
                <div>
                  <h2>{approvedFriendsList.length} Friends</h2>
                </div>
                <div>
                  {approvedFriendsList.map((friend) => {
                    return (
                      /* */
                      <div key={friend.id}>
                        {' '}
                        <Link to={`/friend/${friend.id}`} key={friend.id}>
                          {friend.firstName} {friend.lastName}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>No friends</div>
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
    requestSentMessage: state.user.requestSentMessage,
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
    loadUsers: (searchTerm) => {
      dispatch(userActions.searchUsers(searchTerm));
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
