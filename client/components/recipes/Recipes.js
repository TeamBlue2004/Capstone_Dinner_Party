import React, { Component } from 'react';

const { recipes } = require('../../store/actions/index');

export default class Recipes extends Component {
  componentDidMount() {
    console.log(this.props);
    // const { fetchRecipes } = recipes;
    // fetchRecipes();
  }

  render() {
    return <h1>Recipes</h1>;
  }
}
