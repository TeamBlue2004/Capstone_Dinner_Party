import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipes } from '../../store/actions/recipes/recipes';

class RecipesSearch extends Component {
  state = {
    input: '',
  }

  componentDidMount(){
    const { history: {location: { search }}, loadRecipes } = this.props;
    console.log(search);
    loadRecipes(search);
  }

  searchHandler = (event) => {
    this.setState({ input: event.target.value });
  }

  submitIngredient = (event) => {
    const { input } = this.state;
    const { history } = this.props;
    history.push({
        pathname: '/recipes',
        search: `?ingredients=${input}`
      })
  }

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
      dispatch(recipes.fetchRecipes(query));
    },
  };
};

// Recipes.propTypes = {
//   loadRecipes: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(RecipesSearch);
