import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions } from '../../store/actions/index';

class RecipesSearch extends Component {
  state = {
    input: '',
  };

  componentDidMount() {
    const {
      history: {
        location: { search },
      },
      loadRecipes,
    } = this.props;
    loadRecipes(search);
  }

  searchHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  submitIngredient = () => {
    const { input } = this.state;
    const { history, loadRecipes } = this.props;
    history.push({
      pathname: '/recipes',
      search: `?ingredients=${input}`,
    });
    loadRecipes(history.location.search);
  };

  render() {
    const { input } = this.state;
    return (
      <div className="md-form">
        <form onSubmit={this.submitIngredient}>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Ingredient"
            aria-label="Search"
            value={input}
            onChange={this.searchHandler}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipes: (query) => {
      dispatch(recipesActions.fetchRecipes(query));
    },
  };
};

RecipesSearch.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loadRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesSearch);
