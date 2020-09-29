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

  handleAdd = () => {
    const { setEventNav, eventNav } = this.props;
    if (eventNav.eventId !== '') {
      const nav = { open: true, id: '' };
      setEventNav(nav);
    } else {
      const nav = { open: !eventNav.open, id: '' };
      setEventNav(nav);
    }
  };

  render() {
    const { userId, events, pendingEvents, eventNav, acceptEvent } = this.props;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <div className="d-flex flex-row justify-content-between">
              <h2>Events</h2>
              <button type="button" onClick={this.handleAdd}>
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
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="list-group">
              <h3>My Events:</h3>
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
            </div>
          </div>
        </div>
        {eventNav.open && eventNav.eventId === '' && (
          <div className="infoContainer">
            <AddEventForm />
          </div>
        )}
        {eventNav.open && eventNav.eventId !== '' && (
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
    eventNav: state.events.nav,
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
      dispatch(eventsActions.setEventNav(nav));
    },
    acceptEvent: (userId, eventId) => {
      dispatch(eventsActions.acceptEvent(userId, eventId));
    },
  };
};
Events.propTypes = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  pendingEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchPendingEvents: PropTypes.func.isRequired,
  setEventNav: PropTypes.func.isRequired,
  acceptEvent: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Events);
