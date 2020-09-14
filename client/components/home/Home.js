/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { eventsActions, recipesActions } from '../../store/actions/index';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { loadEvents, loadFavoriteRecipes } = this.props;
    loadEvents('63f7b479-db89-4b5f-804d-4e371250b66f');
    loadFavoriteRecipes('63f7b479-db89-4b5f-804d-4e371250b66f');
  }

  render() {
    const { eventsList, favoriteRecipesList } = this.props;
    console.log('render eventList --- ', eventsList);
    console.log('render favoriteRecipesList --- ', favoriteRecipesList);
    return (
      <div>
        {eventsList.length !== 0 ? (
          <div>
            <div>
              <h2>{eventsList.length} coming events</h2>
            </div>
            <div className="eventbox">
              {eventsList.map((event) => {
                return <Link to={`/event/${event.id}`} key={event.id}></Link>;
              })}
            </div>
          </div>
        ) : (
          <div>No events</div>
        )}
        {/* <div>
          {eventsList.map((event) => {
            return <Link to={`/event/${event.id}`} key={event.id}></Link>;
          })}
        </div> */}
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
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state in home in mapStatetoProps --- ', state);
  return {
    eventsList: state.events.events,
    favoriteRecipesList: state.recipes.favRecipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: (userId) => {
      console.log('disptach is called for fetchEvents --');
      dispatch(eventsActions.fetchEvents(userId));
    },
    loadFavoriteRecipes: (userId) => {
      console.log('disptach is called for loadFavoriteRecipes --');
      dispatch(recipesActions.fetchFavoriteRecipes(userId));
    },
  };
};

Home.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  loadFavoriteRecipes: PropTypes.func.isRequired,
  eventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteRecipesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
