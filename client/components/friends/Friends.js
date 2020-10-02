import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UsersList from './UsersList';
import PendingFriends from './PendingFriends';
import ApprovedFriends from './AprrovedFriends';
import FriendProfile from './FriendProfile';
import { userActions } from '../../store/actions/index';
import './friends.scss';

class Friends extends Component {
  state = {
    searchTerm: '',
  };

  componentDidMount() {
    const {
      id,
      loadUsers,
      loadPendingFriends,
      loadApprovedFriends,
    } = this.props;
    loadUsers();
    loadPendingFriends(id);
    loadApprovedFriends(id);
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

  render() {
    const {
      pendingFriendsList,
      approvedFriendsList,
      requestSentMsg,
      approveRequestMsg,
      declineRequestMsg,
      nav,
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
            <ul className="friendList list-group">
              <div>{requestSentMsg}</div>
              <UsersList users={this.dynamicSearch()} />
            </ul>
            <hr />
            {pendingFriendsList && pendingFriendsList.length !== 0 ? (
              <>
                <h2>{pendingFriendsList.length} pending friends request </h2>
                <ul className="friendList list-group">
                  <div>{approveRequestMsg}</div>
                  <div>{declineRequestMsg}</div>
                  <PendingFriends />
                </ul>
              </>
            ) : (
              <div>You have no pending request</div>
            )}
            <hr />
            {approvedFriendsList && approvedFriendsList.length !== 0 ? (
              <>
                <h2>{approvedFriendsList.length} Friends</h2>
                <ul className="friendList list-group">
                  <ApprovedFriends />
                </ul>
              </>
            ) : (
              <div>You have no friends</div>
            )}
          </div>
        </div>
        {nav.open && nav.friendId !== '' && (
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
    id: state.user.id,
    usersList: state.user.usersList,
    pendingFriendsList: state.user.pendingFriendsList,
    approvedFriendsList: state.user.approvedFriendsList,
    requestSentMsg: state.user.requestSentMsg,
    approveRequestMsg: state.user.approveRequestMsg,
    declineRequestMsg: state.user.declineRequestMsg,
    nav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => {
      dispatch(userActions.fetchUsers());
    },
    loadPendingFriends: (userId) => {
      dispatch(userActions.fetchPendingFriends(userId));
    },
    loadApprovedFriends: (userId) => {
      dispatch(userActions.fetchApprovedFriends(userId));
    },
    setFriendNav: (nav) => {
      dispatch(userActions.setFriendNav(nav));
    },
  };
};

Friends.propTypes = {
  id: PropTypes.string.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  pendingFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  approvedFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestSentMsg: PropTypes.string.isRequired,
  approveRequestMsg: PropTypes.string.isRequired,
  declineRequestMsg: PropTypes.string.isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  loadUsers: PropTypes.func.isRequired,
  loadPendingFriends: PropTypes.func.isRequired,
  loadApprovedFriends: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
