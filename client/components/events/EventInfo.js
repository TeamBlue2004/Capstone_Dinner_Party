import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import EventRecipe from './EventRecipe';

import './eventInfo.scss';
import { eventsActions, userActions } from '../../store/actions/index';

class EventInfo extends Component {
  componentDidMount() {
    const { nav, fetchEventGuests, loadEventRecipes } = this.props;
    fetchEventGuests(nav.eventId);
    loadEventRecipes(nav.eventId);
  }

  componentDidUpdate(prevProps) {
    const { nav, fetchEventGuests, loadEventRecipes } = this.props;
    if (prevProps.nav.eventId !== nav.eventId) {
      fetchEventGuests(nav.eventId);
      loadEventRecipes(nav.eventId);
    }
  }

  handleCalendar = () => {
    const { events } = this.props;
    const { gapi } = window;
    const CLIENT_ID =
      '56988426454-g99r1ecg3b0d0ge9b1bg36far3u4l014.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyB1lci9jZSY11oDdu55-4ONfDjX15dev9s';
    const DISCOVERY_DOCS = [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ];
    const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3');

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const event = {
            summary: `${events[0].eventName} @ ${events[0].host}`,
            location: events[0].location,
            start: {
              dateTime: moment(events[0].datetime).format(),
              timeZone: 'America/New_York',
            },
            end: {
              dateTime: moment(events[0].datetime).add(2, 'hours').format(),
              timeZone: 'America/New_York',
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
            sendNotifications: true,
          };
          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });
          request.execute((ev) => {
            window.open(ev.htmlLink, '_blank', 'width=1200,height=1200');
          });
        });
    });
  };

  closePane = () => {
    const { setNav } = this.props;
    const navObj = { open: false, eventId: '', recipeId: '', friendId: '' };
    setNav(navObj);
  };

  render() {
    const {
      userId,
      events,
      eventGuests,
      nav,
      eventRecipes,
      google,
    } = this.props;
    const event = events.find((ev) => ev.id === nav.eventId);
    let guests;
    if (event && eventGuests) {
      guests = eventGuests.filter(
        (user) => user.id !== userId && user.id !== event.hostid
      );
    }

    const containerStyle = {
      position: 'relative',
    };
    return (
      <>
        <button className="exitButton" type="button" onClick={this.closePane}>
          <i className="fas fa-times"></i>
        </button>
        <div className="p-2 mb-5 shadow-lg bg-white rounded text-center">
          <h5 className="mb-1">{`${event.eventName} @ ${event.host}`}</h5>
        </div>
        <div className="p-2 mb-5 shadow-lg bg-white rounded text-center">
          <h5 className="mb-1">{`Who's coming:`}</h5>
          {guests.map((guest) => {
            return (
              <p key={guest.id}>{`${guest.firstName} ${guest.lastName}`}</p>
            );
          })}
        </div>
        <div className="p-2 mb-5 shadow-lg bg-white rounded text-center event-menu">
          <h4 className="mb-1">Menu</h4>
          {eventRecipes.length !== 0 ? (
            <>
              <h6>Appetizers</h6>
              <ul className="event-dish">
                {eventRecipes
                  .filter((recipe) => recipe.Event_Recipe.dish === 'appetizer')
                  .map((appetizer) => {
                    return (
                      <EventRecipe key={appetizer.id} recipe={appetizer} />
                    );
                  })}
              </ul>
              <h6>Entrees</h6>
              <ul className="event-dish">
                {eventRecipes
                  .filter((recipe) => recipe.Event_Recipe.dish === 'entree')
                  .map((entree) => {
                    return <EventRecipe key={entree.id} recipe={entree} />;
                  })}
              </ul>
              <h6>Desserts</h6>
              <ul className="event-dish">
                {eventRecipes
                  .filter((recipe) => recipe.Event_Recipe.dish === 'dessert')
                  .map((dessert) => {
                    return <EventRecipe key={dessert.id} recipe={dessert} />;
                  })}
              </ul>
            </>
          ) : (
            <p>No recipes assigned to this event</p>
          )}
        </div>
        <div className="p-2 shadow-lg bg-white rounded text-center detailes">
          <h5 className="mb-1">Dinner Party Details</h5>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex flex-column">
              <p className="mb-1 text-left">Date:</p>
              <p className="mb-1">
                {`${moment(event.datetime).format('MMMM Do YYYY')}`}
                <button
                  type="button"
                  className="addCalendar"
                  onClick={this.handleCalendar}
                  title="Add To Calendar"
                >
                  <span role="img" aria-label="calendar">
                    📅
                  </span>
                </button>
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
              zoomControl
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
    eventGuests: state.events.eventGuests,
    eventRecipes: state.events.eventRecipes,
    nav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventGuests: (eventId) => {
      dispatch(eventsActions.fetchEventGuests(eventId));
    },
    loadEventRecipes: (eventId) => {
      dispatch(eventsActions.fetchEventRecipes(eventId));
    },
    setNav: (nav) => {
      dispatch(userActions.setNav(nav));
    },
  };
};

EventInfo.propTypes = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventGuests: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
  }).isRequired,
  loadEventRecipes: PropTypes.func.isRequired,
  google: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchEventGuests: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP9jsj_LJte4O2s1T421OD_kBTF9W6NH8',
})(connect(mapStateToProps, mapDispatchToProps)(EventInfo));
