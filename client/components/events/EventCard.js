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
  };

  componentDidMount() {
    const { datetime } = this.props;
    this.interval = setInterval(() => {
      const total = Date.parse(datetime) - Date.parse(new Date());
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      this.setState({ days, hours });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  handleNavDisplay = () => {
    const { setNav, nav, id } = this.props;
    if (id === nav.eventId) {
      const navObj = {
        open: !nav.open,
        eventId: '',
        recipeId: '',
        friendId: '',
      };
      setNav(navObj);
    } else {
      const navObj = {
        open: true,
        eventId: id,
        recipeId: '',
        friendId: '',
      };
      setNav(navObj);
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
    const { days, hours } = this.state;

    return (
      <div className="event-card list-group-item list-group-item-action d-flex flex-column justify-content-between">
        <div
          className="clickable-div d-flex flex-row justify-content-between align-items-center"
          onClick={() => {
            this.handleNavDisplay();
          }}
          onKeyPress={null}
          tabIndex={0}
          role="button"
        >
          <div>
            <h5 className="mb-1">{`${eventName} @ ${host}`}</h5>
            <p className="mb-1">{moment(datetime).format('LLLL')}</p>
            <p className="mb-1">{location.split(';')[0]}</p>
          </div>
          <div id="clockdiv" className="rounded">
            <div>
              <span className="days">{days}</span>
              <div className="smalltext">Days</div>
            </div>
            <div>
              <span className="hours">{hours}</span>
              <div className="smalltext">Hours</div>
            </div>
          </div>
        </div>
        {userId === hostid ? (
          <button
            type="button"
            className="eventDelete btn btn-danger"
            onClick={() => deleteEvent(id, userId)}
          >
            Delete Event
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    nav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (id, userId) => {
      dispatch(eventsActions.deleteEvent(id, userId));
    },
    setNav: (nav) => {
      dispatch(eventsActions.setNav(nav));
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
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  setNav: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
