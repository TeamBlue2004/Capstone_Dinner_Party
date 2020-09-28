import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import './eventCard.scss';
import { eventsActions } from '../../store/actions/index';

class EventInfo extends Component {
  render() {
    const { events, eventNav, google } = this.props;
    const event = events.find((ev) => ev.id === eventNav.eventId);

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '50%',
    };

    return (
      <>
        <div className="p-2 mb-5 shadow-lg bg-white rounded text-center">
          <h5 className="mb-1">{`${event.eventName} @ ${event.host}`}</h5>
        </div>
        <div className="p-2 shadow-lg bg-white rounded text-center detailes">
          <h5 className="mb-1">Dinner Party Details</h5>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex flex-column">
              <p className="mb-1 text-left">Date:</p>
              <p className="mb-1">
                {`${moment(event.datetime).format('MMMM Do YYYY')}`}
              </p>
            </div>
            <div className="d-flex flex-column">
              <p className="mb-1 text-left">Time:</p>
              <p className="mb-1">{`${moment(event.datetime).format('LT')}`}</p>
            </div>
          </div>
          <div className="d-flex flex-column">
            <p className="mb-1 text-left">Location:</p>
            <p className="mb-1 text-left">
              {`${event.location.split(';')[0]}`}
            </p>
          </div>
          <div className="googleMap">
            <Map
              google={google}
              zoom={15}
              containerStyle={containerStyle}
              initialCenter={{
                lat: event.location.split(';')[1],
                lng: event.location.split(';')[2],
              }}
            >
              <Marker
                key="marker_1"
                position={{
                  lat: event.location.split(';')[1],
                  lng: event.location.split(';')[2],
                }}
              />
            </Map>
          </div>
        </div>
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
  };
};

EventInfo.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  google: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP9jsj_LJte4O2s1T421OD_kBTF9W6NH8',
})(connect(mapStateToProps, mapDispatchToProps)(EventInfo));
