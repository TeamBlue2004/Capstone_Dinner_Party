import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './addEventForm.scss';
import { eventsActions } from '../../store/actions/index';

class AddEventForm extends Component {
  state = {
    eventName: '',
    datetime: moment(),
    location: '',
    invitees: [],
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLocationChange = (e) => {
    this.setState({ location: e });
  };

  handleSelect = async (value) => {
    const res = await geocodeByAddress(value);
    const LatLng = await getLatLng(res[0]);
    this.setState({ location: `${value};${LatLng.lat};${LatLng.lng}` });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, postEvent, setEventNav } = this.props;
    const { eventName, datetime, location } = this.state;
    const event = { hostId: userId, eventName, datetime, location };
    postEvent(event);
    const nav = { open: false, id: '' };
    setEventNav(nav);
  };

  render() {
    const { eventName, datetime, location, invitees } = this.state;
    const animatedComponents = makeAnimated();
    console.log(invitees);

    const localFriends = [
      { label: 'bima', value: 1 },
      { label: 'judith', value: 2 },
      { label: 'shruti', value: 3 },
      { label: 'caroline', value: 4 },
    ];
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="auth-form">
          <h1 style={{ color: 'black' }}>{`Let's Party`}</h1>
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              className="form-control"
              name="eventName"
              placeholder="Enter event name"
              value={eventName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="datetime">Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="datetime"
              placeholder="Pick Date and Time"
              value={datetime}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Event Location</label>
            <PlacesAutocomplete
              value={location}
              onChange={this.handleLocationChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <>
                  <input
                    {...getInputProps({
                      placeholder: 'Type address',
                      className: 'form-control',
                      required: 'required',
                    })}
                  />
                  <div>
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </PlacesAutocomplete>
          </div>
          <div className="form-group">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              name="friends"
              options={localFriends}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(opt) => this.setState({ invitees: opt })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            href="/#/events"
          >
            Add Event
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postEvent: (event) => {
      dispatch(eventsActions.postEvent(event));
    },
    setEventNav: (nav) => {
      dispatch(eventsActions.setEventNav(nav));
    },
  };
};
AddEventForm.propTypes = {
  userId: PropTypes.string.isRequired,
  postEvent: PropTypes.func.isRequired,
  setEventNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm);
