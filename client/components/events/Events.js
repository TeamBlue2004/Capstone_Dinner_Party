import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Event from '../event/Event';
import { eventsActions } from '../../store/actions/index';
import './events.scss';

class Events extends Component {
  constructor() {
    super();

    this.state = {
      isPaneOpen: false,
    };
    this.handlePane = this.handlePane.bind(this);
  }

  componentDidMount() {
    const { fetchEvents, userId } = this.props;
    fetchEvents(userId);
  }

  handlePane = () => {
    const { isPaneOpen } = this.state;
    this.setState({ isPaneOpen: !isPaneOpen });
  };

  render() {
    const { isPaneOpen } = this.state;
    const { events } = this.props;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <h2> My Events </h2>
            <button type="button" onClick={this.handlePane}>
              <i className="fas fa-plus"></i>
            </button>
            <div className="list-group">
              {events.map((event) => {
                return (
                  <div className="item list-group-item list-group-item-action flex-column align-items-start">
                    <h5 className="mb-1">{`${event.eventName} @ ${event.host}`}</h5>
                    <p className="mb-1">{event.datetime}</p>
                    <p className="mb-1">{event.location}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isPaneOpen && (
          <div className="infoContainer">
            <Event handlePane={this.handlePane} />
          </div>
        )}
      </>
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
    fetchEvents: (userId) => {
      dispatch(eventsActions.fetchEvents(userId));
    },
  };
};

Events.propTypes = {
  userId: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchEvents: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
