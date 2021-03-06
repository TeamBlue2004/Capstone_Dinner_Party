import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { eventsActions } from '../../store/actions/index';
import AddRecipeToEvent from '../buttons/AddRecipeToEventButton';
import './recipeEvent.scss';

class RecipeEvent extends Component {
  state = {
    dish: '',
  };

  updateDish = (event) => {
    this.setState({ dish: event.target.value });
  };

  addRecipeToEvent = () => {
    const { dish } = this.state;
    const { event, recipeId, userId, addRecipeToEvent } = this.props;
    if (dish !== '') {
      addRecipeToEvent(event.id, recipeId, userId, dish);
    } else {
      alert('Please select a dish');
    }
  };

  render() {
    const { event } = this.props;
    return (
      <>
        <div className="event-item">
          <div className="event-details">
            <p className="event-name">{event.eventName}</p>
            <select name="dish" onChange={this.updateDish} defaultValue="">
              <option value="" disabled>
                Select dish
              </option>
              <option value="appetizer">Appetizer</option>
              <option value="entree">Entree</option>
              <option value="dessert">Dessert</option>
            </select>
            <p className="event-date">{moment(event.datetime).format('l')}</p>
          </div>
          <AddRecipeToEvent onClick={this.addRecipeToEvent} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    events: state.events.events,
    recipeId: state.user.nav.recipeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: (userId) => {
      dispatch(eventsActions.fetchEvents(userId));
    },
    addRecipeToEvent: (eventId, recipeId, userId, dish) => {
      dispatch(eventsActions.addRecipeToEvent(eventId, recipeId, userId, dish));
    },
  };
};

RecipeEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
  }).isRequired,
  recipeId: PropTypes.string.isRequired,
  addRecipeToEvent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEvent);
