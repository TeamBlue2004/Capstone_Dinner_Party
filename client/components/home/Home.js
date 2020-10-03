import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  eventsActions,
  userActions,
  recipesActions,
} from '../../store/actions/index';
import EventInfo from '../events/EventInfo';
import Recipe from '../recipe/Recipe';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { loadEvents, loadFavoriteRecipes, loadRecipes, id } = this.props;
    loadEvents(id);
    loadFavoriteRecipes(id);
    loadRecipes('?ingredients=');
  }

  handleEventDisplay = (eventId) => {
    const { setNav, nav } = this.props;
    if (eventId === nav.eventId) {
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
        eventId,
        recipeId: '',
        friendId: '',
      };
      setNav(navObj);
    }
  };

  handleRecipeDisplay = (recipeId) => {
    const { setNav, nav } = this.props;
    if (recipeId === nav.recipeId) {
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
        eventId: '',
        recipeId,
        friendId: '',
      };
      setNav(navObj);
    }
  };

  render() {
    const { eventsList, favoriteRecipesList, nav } = this.props;
    const cardStyle = {
      backgroundColor: '#DBF5DA',
      padding: '20px',
      margin: '20px',
    };
    return (
      <>
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
                        <div key={event.id}>
                          <div
                            className="friend-result-container"
                            onClick={() => this.handleEventDisplay(event.id)}
                            onKeyPress={null}
                            tabIndex={0}
                            role="button"
                          >
                            {`${event.eventName} @ ${event.host}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>You have no upcoming events</div>
              )}
            </div>
            <div className="card" style={cardStyle}>
              <h2>SAVED RECIPES</h2>
              {favoriteRecipesList ? (
                <div className="favorite-recipes">
                  <div
                    id="recipeCarousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    {favoriteRecipesList.map((recipe) => {
                      return (
                        <div
                          key={recipe.id}
                          className="recipe-result-container"
                          onKeyPress={null}
                          tabIndex={0}
                          role="button"
                        >
                          <div
                            key={recipe.id}
                            id={recipe.id}
                            className="recipe"
                            role="button"
                            tabIndex={0}
                            onClick={() => this.handleRecipeDisplay(recipe.id)}
                            onKeyPress={null}
                          >
                            <div id={recipe.id} className="recipe-body">
                              <img
                                className="recipe-img"
                                id={recipe.id}
                                src={recipe.image}
                                alt={recipe.name}
                              />
                              <span id={recipe.id} className="recipe-title">
                                {recipe.name}
                              </span>
                            </div>
                          </div>
                        </div>
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
        {nav.open && nav.recipeId !== '' && (
          <div className="infoContainer">
            <Recipe />
          </div>
        )}
        {nav.open && nav.eventId !== '' && (
          <div className="infoContainer">
            <EventInfo />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    eventsList: state.events.events,
    favoriteRecipesList: state.recipes.favRecipes,
    nav: state.user.nav,
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
    loadRecipes: (query) => {
      dispatch(recipesActions.fetchRecipes(query));
    },
    setNav: (nav) => {
      dispatch(userActions.setNav(nav));
    },
  };
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  eventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteRecipesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
  }).isRequired,
  loadEvents: PropTypes.func.isRequired,
  loadFavoriteRecipes: PropTypes.func.isRequired,
  loadRecipes: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
