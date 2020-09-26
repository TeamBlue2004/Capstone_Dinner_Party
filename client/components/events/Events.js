import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddEventForm from '../addEventForm/AddEventForm';
import { eventsActions } from '../../store/actions/index';
import EventCard from './EventCard';
import EventInfo from './EventInfo';
import './events.scss';

class Events extends Component {
  componentDidMount() {
    const { fetchEvents, userId } = this.props;
    fetchEvents(userId);
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
    const { events, eventNav } = this.props;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <h2> My Events </h2>
            <button type="button" onClick={this.handleAdd}>
              <i className="fas fa-plus"></i>
            </button>
            <div className="list-group">
              {events.map((event) => {
                return (
                  <EventCard
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
    eventNav: state.events.nav,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: (userId) => {
      dispatch(eventsActions.fetchEvents(userId));
    },
    setEventNav: (nav) => {
      dispatch(eventsActions.setEventNav(nav));
    },
  };
};
Events.propTypes = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  fetchEvents: PropTypes.func.isRequired,
  setEventNav: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Events);
