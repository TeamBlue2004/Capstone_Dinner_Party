/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { eventsActions } from '../../store/actions/index';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { loadEvents } = this.props;
    loadEvents('63f7b479-db89-4b5f-804d-4e371250b66f');
  }

  render() {
    const { eventsList } = this.props;
    console.log('render eventList --- ', eventsList);
    return (
      <div>
        {eventsList.length !== 0 ? (
          <div>
            <h2>{eventsList.length} coming events</h2>
          </div>
        ) : (
          <div>No events</div>
        )}
        <div>
          {eventsList.map((event) => {
            return <Link to={`/event/${event.id}`} key={event.id}></Link>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eventsList: state.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvents: (userId) => {
      console.log('disptach is called for fetchEvents --');
      dispatch(eventsActions.fetchEvents(userId));
    },
  };
};

Home.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  eventsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
