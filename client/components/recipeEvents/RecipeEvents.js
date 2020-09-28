import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { eventsActions, userActions } from '../../store/actions/index';
import './recipeEvents.scss';

class RecipeEvents extends Component {
  componentDidMount() {
    const { userId, loadEvents } = this.props;
    loadEvents(userId);
  }

  addRecipeToEvent = (eventId) => {
    const { recipeId } = this.props;
  };

  render() {
    const { events } = this.props;
    return (
      <div className="events-card">
        <h5>Add To Events</h5>
        <hr />
        <div className="events-dropdown">
          {events.map((event) => {
            return (
              <div key={event.eventName} className="event-item">
                <input
                  className="event-recipe-input"
                  type="checkbox"
                  name="eventRecipe"
                  value={event.eventName}
                  onChange={() => this.addRecipeToEvent(event.id)}
                />
                <div className="event-details">
                  <p className="event-name">{event.eventName}</p>
                  <p className="event-date">
                    {moment(event.datetime).format('l')}
                  </p>
                </div>
                {/* <label className="form-check-label" htmlFor="eventRecipe">
                </label> */}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    events: state.events.events,
    recipeId: state.recipes.nav.recipeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: (userId) => {
      dispatch(eventsActions.fetchEvents(userId));
    },
    // updateEventsMenu: (userId, recipeId) => {
    //   dispatch(eventsActions.updateUserFavoriteRecipe(userId, recipeId));
    // },
  };
};

RecipeEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipeId: PropTypes.string.isRequired,
  loadEvents: PropTypes.func.isRequired,
  //   updateUserFavoriteRecipe: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEvents);
