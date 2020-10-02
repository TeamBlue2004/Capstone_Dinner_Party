import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './eventInfo.scss';
import { eventsActions } from '../../store/actions/index';

class EventRecipe extends Component {
  state = {
    dish: '',
  };

  updateDish = (event) => {
    const dish = event.target.value;
    this.setState({ dish: event.target.value }, () =>
      dish === 'delete' ? this.deleteEventRecipe() : this.updateEventDish()
    );
  };

  updateEventDish = () => {
    const { dish } = this.state;
    const { recipe, updateEventRecipe } = this.props;
    updateEventRecipe(recipe.Event_Recipe.id, dish);
  };

  deleteEventRecipe = () => {
    const { recipe, deleteEventRecipe } = this.props;
    deleteEventRecipe(
      recipe.Event_Recipe.id,
      recipe.User_Recipes[0].Event_Recipe_User.id
    );
  };

  render() {
    const { recipe, userId } = this.props;
    return (
      <>
        <li className="event-recipe-item">
          <img
            alt={recipe.name}
            className="event-recipe-image"
            src={recipe.image}
            title={recipe.name}
          />
          <img
            alt={`${recipe.User_Recipes[0].firstName} ${recipe.User_Recipes[0].lastName}`}
            className="event-recipe-user"
            src={`${recipe.User_Recipes[0].profilePic}`}
            title={`${recipe.User_Recipes[0].firstName} ${recipe.User_Recipes[0].lastName}`}
          />
          {userId === recipe.User_Recipes[0].id && (
            <select
              className="event-recipe-update"
              name="dish"
              onChange={this.updateDish}
              defaultValue=""
            >
              <option value="" disabled>
                Update
              </option>
              <option value="appetizer">Appetizer</option>
              <option value="entree">Entree</option>
              <option value="dessert">Dessert</option>
              <option value="delete">Delete</option>
            </select>
          )}
        </li>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    eventId: state.user.nav.eventId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEventRecipe: (eventRecipeId, dish) => {
      dispatch(eventsActions.updateEventRecipe(eventRecipeId, dish));
    },
    deleteEventRecipe: (eventRecipeId, eventRecipeUserId) => {
      dispatch(
        eventsActions.deleteEventRecipe(eventRecipeId, eventRecipeUserId)
      );
    },
  };
};

EventRecipe.propTypes = {
  userId: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    Event_Recipe: PropTypes.shape({
      id: PropTypes.string.isRequired,
      dish: PropTypes.string.isRequired,
    }).isRequired,
    User_Recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  updateEventRecipe: PropTypes.func.isRequired,
  deleteEventRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventRecipe);
