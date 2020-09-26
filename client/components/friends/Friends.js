import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/actions/index';

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

  render() {
    const {
      pendingFriendsList,
      usersList,
      id,
      /* requestSentMessage, */
      approvedFriendsList,
    } = this.props;
    const { searchTerm } = this.state;
    // loggedIn user should not appear in result if searchTerm matches with loggedIn User FN,LN or Username
    const filteredUsersList = usersList.filter((user) => user.id !== id);
    return (
      <div>
        <div>
          <input
            id="searchTerm"
            placeholder="Search"
            value={searchTerm}
            name="searchTerm"
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
          />
        </div>
        <div>
          <button type="submit" onClick={this.searchUsers} value="Search Users">
            Search Users
          </button>
        </div>

        <div>
          {filteredUsersList.length !== 0 ? (
            <div>
              <div>
                <h2>{filteredUsersList.length} User Found</h2>
              </div>
              <div>
                {filteredUsersList.map((user) => {
                  return (
                    <p key={user.id}>
                      {' '}
                      <Link to={`/user/${user.id}`} key={user.id}>
                        <div>
                          {' '}
                          <p>
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                        <div>
                          {' '}
                          <button
                            type="submit"
                            onClick={() => this.addAsFriend(user.id, id)}
                            value="add Friend"
                          >
                            Add as a Friend
                          </button>
                        </div>
                        {/* <div>
                          {' '}
                          <p>{user.username}</p>
                        </div> */}
                      </Link>
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>No users</div>
          )}
        </div>

        <div>
          {pendingFriendsList && pendingFriendsList.length !== 0 ? (
            <div>
              <div>
                <h2>{pendingFriendsList.length} pending friends request </h2>
              </div>
              <div>
                {pendingFriendsList.map((pendingfriend) => {
                  return (
                    <p key={pendingfriend.id}>
                      {' '}
                      <Link
                        to={`/user/${pendingfriend.id}`}
                        key={pendingfriend.id}
                      >
                        <div>
                          {' '}
                          <p>
                            {pendingfriend.firstName} {pendingfriend.lastName}
                          </p>
                        </div>
                        <div>
                          {' '}
                          <button
                            type="submit"
                            onClick={() =>
                              this.approveAsFriend(pendingfriend.id, id)
                            }
                            value="approve friend request"
                          >
                            Approve Friend Request
                          </button>
                        </div>
                        {/* <div>
                          {' '}
                          <p>{user.username}</p>
                        </div> */}
                      </Link>
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>You have no pending request</div>
          )}
        </div>
        <div>
          {approvedFriendsList && approvedFriendsList.length !== 0 ? (
            <div>
              <div>
                <h2>{approvedFriendsList.length} Friends</h2>
              </div>
              <div>
                {approvedFriendsList.map((friend) => {
                  return (
                    <p key={friend.id}>
                      {' '}
                      <Link to={`/friend/${friend.id}`} key={friend.id}>
                        {friend.firstName} {friend.lastName}
                      </Link>
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>No friends</div>
          )}
        </div>
      </div>
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
  };
};

Friends.propTypes = {
  approvedFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  pendingFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  loadUsers: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  loadPendingFriends: PropTypes.func.isRequired,
  loadApprovedFriends: PropTypes.func.isRequired,
  approveFriend: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
