import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../store/actions/index';
import './friends.scss';

class ApprovedFriends extends Component {
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
    const { approvedFriendsList } = this.props;
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
                  this.handleFriendDisplay(friend.id);
                }}
                onKeyPress={null}
                tabIndex={0}
                role="button"
              >
                {friend.firstName} {friend.lastName}
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
    approvedFriendsList: state.user.approvedFriendsList,
    friendNav: state.user.friendNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFriendNav: (nav) => {
      dispatch(userActions.setFriendNav(nav));
    },
  };
};

ApprovedFriends.propTypes = {
  approvedFriendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  friendNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  setFriendNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedFriends);
