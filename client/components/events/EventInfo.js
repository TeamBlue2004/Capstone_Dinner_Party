import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import './eventCard.scss';
import { eventsActions } from '../../store/actions/index';

class EventInfo extends Component {
  render() {
    const { events, eventNav } = this.props;
    const event = events.find((ev) => ev.id === eventNav.eventId);

    return (
      <div
        key={event.id}
        className="item list-group-item list-group-item-action d-flex flex-row justify-content-between"
      >
        <div>
          <h5 className="mb-1">{`${event.eventName} @ ${event.host}`}</h5>
          <p className="mb-1">{moment(event.datetime).format('LLLL')}</p>
          <p className="mb-1">{event.location}</p>
        </div>
      </div>
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
    // deleteEvent: (id, userId) => {
    //   dispatch(eventsActions.deleteEvent(id, userId));
    // },
    // setEventNav: (nav) => {
    //   dispatch(eventsActions.setEventNav(nav));
    // },
  };
};

EventInfo.propTypes = {
  // id: PropTypes.string.isRequired,
  // host: PropTypes.string.isRequired,
  // hostid: PropTypes.string.isRequired,
  // eventName: PropTypes.string.isRequired,
  // datetime: PropTypes.string.isRequired,
  // location: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  fetchEvents: PropTypes.func.isRequired,
  // setEventNav: PropTypes.func.isRequired,
  // deleteEvent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);
