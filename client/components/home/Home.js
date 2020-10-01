import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { eventsActions, userActions } from '../../store/actions/index';
import EventInfo from '../events/EventInfo';
import Recipe from '../recipe/Recipe';

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

  handleEventDisplay = (eventId) => {
    const { setHomeNav, homeNav } = this.props;
    // console.log('eventId ofclicked ==== ', eventId);
    // console.log('homeNav ==== ', homeNav);
    if (eventId === homeNav.eventId) {
      //console.log('inside if id match');
      const nav = { open: !homeNav.open, id: '' };
      setHomeNav(nav);
    } else {
      const nav = { open: true, id: eventId };
     // console.log('inside else ---');
      setHomeNav(nav);
    }
  };

  handleRecipeDisplay = (recipeId) => {
    const { setHomeNav, homeNav } = this.props;
    if (recipeId === homeNav.recipeId) {
      const nav = { open: !homeNav.open, id: '' };
      setHomeNav(nav);
    } else {
      const nav = { open: true, id: recipeId };
      setHomeNav(nav);
    }
  };

  render() {
    const { eventsList, favoriteRecipesList, homeNav } = this.props;
    // console.log('eventNav === ', eventNav);
    // console.log('recipeNav === ', recipeNav);
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
                            {event.eventName}
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
                            onClick={() => this.handleRecipeDisplay(recipe)}
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
        {homeNav.open && homeNav.recipeId !== '' && (
          <div className="infoContainer">
            <Recipe />
          </div>
        )}
        {homeNav.open && homeNav.eventId !== '' && (
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
    eventsList: state.events.events,
    favoriteRecipesList: state.recipes.favRecipes,
    id: state.user.id,
    homeNav: state.user.homeNav,
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
    setHomeNav: (nav) => {
      dispatch(userActions.setHomeNav(nav));
    },
  };
};

Home.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  loadFavoriteRecipes: PropTypes.func.isRequired,
  eventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteRecipesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  homeNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
  }).isRequired,
  setHomeNav: PropTypes.func.isRequired,
};

// Home.defaultProps = {
//   recipeNav: {
//     open: false,
//     id: '',
//   },
//   eventNav: {
//     open: false,
//     id: '',
//   },
// };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
