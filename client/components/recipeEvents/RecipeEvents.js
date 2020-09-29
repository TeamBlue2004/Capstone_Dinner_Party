import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeEvent from '../recipeEvent/RecipeEvent';
import { eventsActions } from '../../store/actions/index';
import './recipeEvents.scss';

class RecipeEvents extends Component {
  componentDidMount() {
    const { userId, loadEvents } = this.props;
    loadEvents(userId);
  }

  render() {
    const { events } = this.props;
    return (
      <div className="events-card">
        <h5>Add To Events</h5>
        <hr />
        <div className="events-dropdown">
          {events.map((event) => {
            return <RecipeEvent event={event} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    events: state.events.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: (userId) => {
      dispatch(eventsActions.fetchEvents(userId));
    },
  };
};

RecipeEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadEvents: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEvents);
