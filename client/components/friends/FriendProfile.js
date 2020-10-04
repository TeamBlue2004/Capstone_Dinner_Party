import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../store/actions/index';

class FriendProfile extends Component {
  render() {
    const cardStyle = {
      backgroundColor: '#DBF5DA',
      padding: '20px',
      margin: '20px',
      textAlign: 'center',
      alignItems: 'center',
    };
    const pStyle = {
      backgroundColor: 'white',
    };
    const { users, nav } = this.props;
    const friend = users.find((fri) => fri.id === nav.friendId);
    return (
      <div className="friendInfo" style={cardStyle}>
        <h1>{`${friend.firstName} ${friend.lastName}`}</h1>
        <img className="rounded-circle" alt="profile" src={friend.profilePic} />
        <br></br>
        <h4>Favorite Foods</h4>
        <p style={pStyle}>{friend.favoriteFoods}</p>
        <h4>Disliked Foods</h4>
        <p style={pStyle}>{friend.dislikedFoods}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.user.usersList,
    nav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriendDetails: (userId) => {
      dispatch(userActions.fetchFriendDetails(userId));
    },
  };
};

FriendProfile.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
