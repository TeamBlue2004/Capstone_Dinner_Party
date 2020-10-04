import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { userActions, eventsActions } from '../../store/actions/index';
import './friends.scss';

class FriendProfile extends Component {
  componentDidMount() {
    const { loadCommonEvents, userId, users, nav } = this.props;
    const friend = users.find((fri) => fri.id === nav.friendId);
    loadCommonEvents(friend.id, userId);
  }

  componentDidUpdate(prevProps) {
    const { loadCommonEvents, userId, users, nav } = this.props;
    const friend = users.find((fri) => fri.id === nav.friendId);
    if (prevProps.nav.friendId !== nav.friendId) {
      loadCommonEvents(friend.id, userId);
    }
  }

  closePane = () => {
    const { setNav } = this.props;
    const navObj = { open: false, eventId: '', recipeId: '', friendId: '' };
    setNav(navObj);
  };

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
    const { users, nav, commonEvents } = this.props;
    const friend = users.find((fri) => fri.id === nav.friendId);
    return (
      <>
        <div className="friendInfo" style={cardStyle}>
          <button className="exitButton" type="button" onClick={this.closePane}>
            <i className="fas fa-times"></i>
          </button>
          <h1>{`${friend.firstName} ${friend.lastName}`}</h1>
          <img
            className="rounded-circle"
            alt="profile"
            src={friend.profilePic}
          />
          <br></br>
          <h4>Favorite Foods</h4>
          <p style={pStyle}>{friend.favoriteFoods}</p>
          <h4>Disliked Foods</h4>
          <p style={pStyle}>{friend.dislikedFoods}</p>
        </div>
        <hr />
        <h2>Common Events</h2>

        <div className="list-group">
          {commonEvents.length > 0 ? (
            <>
              {commonEvents.map((event) => {
                return (
                  <div className="event-card" key={event.id}>
                    <div className="item list-group-item list-group-item-action d-flex flex-row justify-content-between">
                      <div>
                        <h5 className="mb-1">{`${event.eventName} @ ${event.host}`}</h5>
                        <p className="mb-1">
                          {moment(event.datetime).format('LLLL')}
                        </p>
                        <p className="mb-1">{event.location.split(';')[0]}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div>No common events</div>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.user.usersList,
    nav: state.user.nav,
    userId: state.user.id,
    commonEvents: state.events.commonEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriendDetails: (userId) => {
      dispatch(userActions.fetchFriendDetails(userId));
    },
    loadCommonEvents: (friendId, userId) => {
      dispatch(eventsActions.fetchCommonEvents(friendId, userId));
    },
    setNav: (nav) => {
      dispatch(userActions.setNav(nav));
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
  loadCommonEvents: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  commonEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
