import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipes } from '../../store/actions/recipes/recipes';
import { RecipesSearch } from '../index';

class Recipes extends Component {
  componentDidMount() {
    const {
      history: {
        location: { search },
      },
      loadRecipes,
    } = this.props;
    loadRecipes(search);
  }

  render() {
    return <RecipesSearch {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipes: () => {
      dispatch(recipes.fetchRecipes());
    },
  };
};

Recipes.propTypes = {
  history: PropTypes.objectOf({
    location: PropTypes.objectOf({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loadRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
