import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import './eventCard.scss';
import { eventsActions } from '../../store/actions/index';

class EventCard extends Component {
  state = {
    days: 0,
    hours: 0,
    seconds: 0,
  };

  componentDidMount() {
    const { datetime } = this.props;
    this.interval = setInterval(() => {
      const total = Date.parse(datetime) - Date.parse(new Date());
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const seconds = Math.floor((total / 1000) % 60);

      this.setState({ days, hours, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  handleEventDisplay = () => {
    const { setEventNav, eventNav, id } = this.props;
    if (id === eventNav.eventId) {
      const nav = { open: !eventNav.open, id };
      setEventNav(nav);
    } else {
      const nav = { open: true, id };
      setEventNav(nav);
    }
  };

  render() {
    const {
      id,
      host,
      hostid,
      eventName,
      datetime,
      location,
      userId,
      deleteEvent,
    } = this.props;
    const { days, hours, seconds } = this.state;

    return (
      <div
        key={id}
        className="item list-group-item list-group-item-action d-flex flex-row justify-content-between"
        onClick={() => {
          this.handleEventDisplay();
        }}
        onKeyPress={() => { }}
        tabIndex={0}
        role="button"
      >
        <div>
          <h5 className="mb-1">{`${eventName} @ ${host}`}</h5>
          <p className="mb-1">{moment(datetime).format('LLLL')}</p>
          <p className="mb-1">{location}</p>
          {userId === hostid ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteEvent(id, userId)}
            >
              Delete Event
            </button>
          ) : null}
        </div>
        <div id="clockdiv" className="shadow-lg bg-white rounded">
          <div>
            <span className="days">{days}</span>
            <div className="smalltext">Days</div>
          </div>
          <div>
            <span className="hours">{hours}</span>
            <div className="smalltext">Hours</div>
          </div>
          <div>
            <span className="seconds">{seconds}</span>
            <div className="smalltext">Seconds</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    eventNav: state.events.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (id, userId) => {
      dispatch(eventsActions.deleteEvent(id, userId));
    },
    setEventNav: (nav) => {
      dispatch(eventsActions.setEventNav(nav));
    },
  };
};

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  hostid: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  eventNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  setEventNav: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
