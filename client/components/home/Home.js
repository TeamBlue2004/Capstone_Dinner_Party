import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { eventsActions, userActions } from '../../store/actions/index';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { loadEvents, loadFavoriteRecipes, id } = this.props;
    loadEvents(id);
    loadFavoriteRecipes(id);
  }

  render() {
    const { eventsList, favoriteRecipesList } = this.props;
    return (
      <div className="routesContainer">
        <div className="routes">
          {eventsList.length !== 0 ? (
            <div>
              <div>
                <h2>{eventsList.length} coming events</h2>
              </div>
              <div className="eventbox">
                {eventsList.map((event) => {
                  return (
                    <Link to={`/event/${event.id}`} key={event.id}>
                      {event.id}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>No events</div>
          )}
          {favoriteRecipesList ? (
            <div className="recipes-results">
              {favoriteRecipesList.map((recipe) => {
                return (
                  <Link
                    to={`/recipe/${recipe.id}`}
                    key={recipe.id}
                    className="card"
                  >
                    <img
                      className="card-img-top"
                      src={recipe.image}
                      alt={recipe.name}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{recipe.name}</h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventsList: state.events.events,
    favoriteRecipesList: state.recipes.favRecipes,
    id: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: (userId) => {
      dispatch(eventsActions.fetchEvents(userId));
    },
    loadFavoriteRecipes: (userId) => {
      dispatch(userActions.fetchUserFavoriteRecipes(userId));
    },
  };
};

Home.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  loadFavoriteRecipes: PropTypes.func.isRequired,
  eventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteRecipesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
