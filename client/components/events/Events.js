import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import AddEventForm from '../addEventForm/AddEventForm';
import EventCard from './EventCard';
import EventInfo from './EventInfo';
import { eventsActions } from '../../store/actions/index';
import './events.scss';

class Events extends Component {
  componentDidMount() {
    const { fetchEvents, fetchPendingEvents, userId } = this.props;
    fetchEvents(userId);
    fetchPendingEvents(userId);
  }

  componentDidUpdate(prevProps) {
    const {
      userId,
      events,
      pendingEvents,
      fetchEvents,
      fetchPendingEvents,
    } = this.props;
    if (
      prevProps.events.length !== events.length ||
      prevProps.pendingEvents.length !== pendingEvents.length
    ) {
      fetchEvents(userId);
      fetchPendingEvents(userId);
    }
  }

  handleAddNav = () => {
    const { setEventNav, nav } = this.props;
    if (nav.eventId !== '') {
      const navObj = {
        open: true,
        eventId: '',
        recipeId: '',
        friendId: '',
      };
      setEventNav(navObj);
    } else {
      const navObj = {
        open: !nav.open,
        eventId: '',
        recipeId: '',
        friendId: '',
      };
      setEventNav(navObj);
    }
  };

  render() {
    const {
      userId,
      events,
      pendingEvents,
      nav,
      acceptEvent,
      declineEvent,
    } = this.props;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <div className="d-flex flex-row user-events">
              <h2>My Events</h2>
              <button type="button" onClick={this.handleAddNav}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="list-group">
              {pendingEvents.length > 0 && (
                <>
                  <h3>You are invited to:</h3>
                  {pendingEvents.map((event) => {
                    return (
                      <div key={event.id} className="list-group-item">
                        <h5 className="mb-1">{`${event.eventName} @ ${event.host}`}</h5>
                        <p className="mb-1">
                          {moment(event.datetime).format('LLLL')}
                        </p>
                        <p className="mb-1">{event.location.split(';')[0]}</p>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => acceptEvent(userId, event.id)}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => declineEvent(userId, event.id)}
                        >
                          Decline
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="list-group">
              {events.length > 0 ? (
                <>
                  {events.map((event) => {
                    return (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        host={event.host}
                        hostid={event.hostid}
                        eventName={event.eventName}
                        datetime={event.datetime}
                        location={event.location}
                      />
                    );
                  })}
                </>
              ) : (
                <h3>No upcoming events</h3>
              )}
            </div>
          </div>
        </div>
        {nav.open && nav.eventId === '' && (
          <div className="infoContainer">
            <AddEventForm />
          </div>
        )}
        {nav.open && nav.eventId !== '' && (
          <div className="infoContainer">
            <EventInfo />
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    events: state.events.events,
    pendingEvents: state.events.pendingEvents,
    nav: state.user.nav,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: (userId) => {
      dispatch(eventsActions.fetchEvents(userId));
    },
    fetchPendingEvents: (userId) => {
      dispatch(eventsActions.fetchPendingEvents(userId));
    },
    setEventNav: (nav) => {
      dispatch(eventsActions.setNav(nav));
    },
    acceptEvent: (userId, eventId) => {
      dispatch(eventsActions.acceptEvent(userId, eventId));
    },
    declineEvent: (userId, eventId) => {
      dispatch(eventsActions.declineEvent(userId, eventId));
    },
  };
};
Events.propTypes = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  pendingEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchPendingEvents: PropTypes.func.isRequired,
  setEventNav: PropTypes.func.isRequired,
  acceptEvent: PropTypes.func.isRequired,
  declineEvent: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Events);
