/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../store/actions/index';

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', // props.userData.username,
      firstName: '', // props.userData.firstName,
      lastName: '', // props.userData.lastName,
      // profilePic: '',
      email: '', // props.userData.email,
      addressUnit: '', // props.userData.addressUnit,
      addressStreet: '', // props.userData.addressStreet,
      addressCity: '', // props.userData.addressCity,
      addressZip: '', // props.userData.addressZIP,
      addressState: '', // props.userData.addressState,
      id: '', // props.userData.id,
      isEditing: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const { loadUserDetails, id } = this.props;
    loadUserDetails(id);
  }

  componentDidUpdate(prevProps) {
    const { userData } = this.props;
    const {
      id,
      firstName,
      lastName,
      email,
      username,
      addressUnit,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
    } = userData;
    if (prevProps !== this.props) {
      this.setState({ id });
      this.setState({ firstName });
      this.setState({ lastName });
      this.setState({ email });
      this.setState({ username });
      this.setState({ addressUnit });
      this.setState({ addressStreet });
      this.setState({ addressCity });
      this.setState({ addressState });
      this.setState({ addressZip });
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log('nextProps --- ', nextProps);
  //   if (nextProps.userData) {
  //     this.setState({
  //       username: nextProps.userData.username,
  //       firstName: nextProps.userData.firstName,
  //       lastName: nextProps.userData.lastName,
  //       // profilePic: '',
  //       email: nextProps.userData.email,
  //       addressUnit: nextProps.userData.addressUnit,
  //       addressStreet: nextProps.userData.addressStreet,
  //       addressCity: nextProps.userData.addressCity,
  //       addressZip: nextProps.userData.addressZIP,
  //       addressState: nextProps.userData.addressState,
  //       id: nextProps.userData.id,
  //     });
  //   }
  // }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateUser = (e) => {
    e.preventDefault();
    const { editUser } = this.props;
    editUser(this.state);
    this.toggleEdit();
  };

  toggleEdit() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      email,
      addressUnit,
      addressStreet,
      addressCity,
      addressZip,
      addressState,
      isEditing,
    } = this.state;
    return (
      <div className="routesContainer">
        <div className="routes">
          {isEditing ? (
            <div>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>UserName</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Address Unit</label>
                <input
                  type="text"
                  name="addressUnit"
                  value={addressUnit}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label>Address Street</label>
                <input
                  type="text"
                  name="addressStreet"
                  value={addressStreet}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label>Address City</label>
                <input
                  type="text"
                  name="addressCity"
                  value={addressCity}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label>Address State</label>
                <input
                  type="text"
                  name="addressState"
                  value={addressState}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label>Address Zip</label>
                <input
                  type="text"
                  name="addressZip"
                  value={addressZip}
                  onChange={this.handleChange}
                />
              </div>
              <button type="button" onClick={this.updateUser}>
                Save
              </button>
            </div>
          ) : (
            <div>
              <form>
                <div>
                  <label>First Name:</label>
                  <label> {firstName}</label>
                </div>
                <div>
                  <label>Last Name:</label>
                  <label> {lastName}</label>
                </div>
                <div>
                  <label>Email:</label>
                  <label> {email}</label>
                </div>
                <div>
                  <label>UserName:</label>
                  <label> {username}</label>
                </div>
                <div>
                  <label>Address Unit:</label>
                  <label> {addressUnit}</label>
                </div>

                <div>
                  <label>Address Street:</label>
                  <label> {addressStreet}</label>
                </div>

                <div>
                  <label>Address City:</label>
                  <label> {addressCity}</label>
                </div>

                <div>
                  <label>Address State:</label>
                  <label> {addressState}</label>
                </div>

                <div>
                  <label>Address Zip:</label>
                  <label> {addressZip}</label>
                </div>

                <button type="button" onClick={this.toggleEdit}>
                  edit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
    id: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserDetails: (userId) => {
      dispatch(userActions.fetchUserDetails(userId));
    },
    editUser: (userNewData) => {
      dispatch(userActions.updateUserDetails(userNewData));
    },
  };
};

UserAccount.propTypes = {
  loadUserDetails: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    addressUnit: PropTypes.string,
    addressStreet: PropTypes.string,
    addressCity: PropTypes.string,
    addressState: PropTypes.string,
    addressZip: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,

  editUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
