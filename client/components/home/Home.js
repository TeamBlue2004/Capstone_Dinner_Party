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
    const cardStyle = {
      backgroundColor: '#DBF5DA',
      padding: '20px',
      margin: '20px',
    };
    return (
      <div className="routesContainer">
        <div className="routes">
          <div className="card" style={cardStyle}>
            <h2>UPCOMING EVENTS</h2>
            {eventsList.length !== 0 ? (
              <div>
                <div>
                  <h4>You have {eventsList.length} upcoming events:</h4>
                </div>
                <div className="eventbox">
                  {eventsList.map((event) => {
                    return (
                      <Link
                        to={`/event/${event.id}`}
                        key={event.id}
                        style={{ fontWeight: 'bold', color: '#4977F2' }}
                      >
                        {event.eventName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>You have no upcoming events</div>
            )}
          </div>
          <div className="card" style={cardStyle}>
            <h2>MY FAVORITE RECIPES</h2>
            {favoriteRecipesList ? (
              <div className="recipes-results">
                <div
                  id="recipeCarousel"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  {favoriteRecipesList.map((recipe) => {
                    return (
                      <li
                        data-target="#recipeCarousel"
                        className="carouselItem"
                      >
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
                      </li>
                    );
                  })}
                </div>
              </div>
            ) : (
              <h2>You have not favorited any recipes!</h2>
            )}
          </div>
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
