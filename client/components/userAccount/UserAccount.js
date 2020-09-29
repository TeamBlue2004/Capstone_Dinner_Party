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
      favoriteFoods: 'Write in your favorite foods!',
      dislikedFoods: 'Write in your least favorite foods!',
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
      profilePic,
      favoriteFoods,
      dislikedFoods,
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
      this.setState({ profilePic });
      this.setState({ favoriteFoods });
      this.setState({ dislikedFoods });
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

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.toggleEdit();
  //   const { editFood } = this.props;
  //   editFood(this.state);
  //   console.log('user updated', this.state);
  // };

  toggleEdit() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  render() {
    const cardStyle = {
      backgroundColor: '#DBF5DA',
      padding: '20px',
      margin: '20px',
      textAlign: 'center',
      alignItems: 'center',
    };
    const pStyle = {
      backgroundColor: 'white',
    };
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
      profilePic,
      isEditing,
      favoriteFoods,
      dislikedFoods,
    } = this.state;
    return (
      <div className="routesContainer">
        <div className="routes" style={cardStyle}>
          <h2>
            {firstName} {lastName}
          </h2>
          <img className="rounded-circle" alt="profile" src={profilePic} />
          <br></br>
          <form>
            <h4>Favorite Foods</h4>
            {isEditing ? (
              <div>
                <input
                  name="favoriteFoods"
                  value={favoriteFoods}
                  style={pStyle}
                  onChange={this.handleChange}
                />
                <br></br>
                <button
                  className="btn btn-success btn-sm "
                  type="button"
                  onClick={this.updateUser}
                >
                  SAVE
                </button>
              </div>
            ) : (
              <div>
                <p style={pStyle}>{console.log(this.state)}, my favorite!</p>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={this.toggleEdit}
                >
                  EDIT
                </button>
              </div>
            )}
            <br></br>
          </form>
          <br></br>
          <br></br>
          <form>
            <h4>Disliked Foods</h4>
            {isEditing ? (
              <div>
                <input
                  name="dislikedFoods"
                  value={dislikedFoods}
                  style={pStyle}
                  onChange={this.handleChange}
                />
                <br></br>
                <button
                  className="btn btn-success btn-sm "
                  type="button"
                  onClick={this.updateUser}
                >
                  SAVE
                </button>
              </div>
            ) : (
              <div>
                <p name="dislikedFoods" style={pStyle}>
                  {dislikedFoods}
                </p>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={this.toggleEdit}
                >
                  EDIT
                </button>
              </div>
            )}
          </form>
          <br></br>
          <h4>Personal Information</h4>
          <br></br>
          {isEditing ? (
            <div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>UserName</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address Unit</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressUnit"
                  value={addressUnit}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address Street</label>
                <input
                  type="text"
                  name="addressStreet"
                  className="form-control"
                  value={addressStreet}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address City</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressCity"
                  value={addressCity}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address State</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressState"
                  value={addressState}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address Zip</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressZip"
                  value={addressZip}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Profile Picture URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="profilePic"
                  value={profilePic}
                  onChange={this.handleChange}
                />
              </div>
              <button
                className="btn btn-success btn-lg"
                type="button"
                onClick={this.updateUser}
              >
                SAVE
              </button>
            </div>
          ) : (
            <div>
              <form>
                <div className="form-group">
                  <label>First Name: </label>
                  <label> {firstName}</label>
                </div>

                <div className="form-group">
                  <label>Last Name: </label>
                  <label> {lastName}</label>
                </div>
                <div className="form-group">
                  <label>Email: </label>
                  <label> {email}</label>
                </div>
                <div className="form-group">
                  <label>UserName: </label>
                  <label> {username}</label>
                </div>
                <div className="form-group">
                  <label>Address Unit: </label>
                  <label> {addressUnit}</label>
                </div>

                <div className="form-group">
                  <label>Address Street: </label>
                  <label> {addressStreet}</label>
                </div>

                <div className="form-group">
                  <label>Address City: </label>
                  <label> {addressCity} </label>
                </div>

                <div className="form-group">
                  <label>Address State: </label>
                  <label> {addressState}</label>
                </div>

                <div className="form-group">
                  <label>Address Zip: </label>
                  <label> {addressZip}</label>
                </div>

                <div className="form-group">
                  <label>Profile Picture URL: </label>
                  <label> {profilePic}</label>
                </div>

                <div className="form-group">
                  <label>Favorite Food: </label>
                  <label> {favoriteFoods}</label>
                </div>

                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={this.toggleEdit}
                >
                  EDIT
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
    profilePic: PropTypes.string,
    id: PropTypes.string,
    favoriteFoods: PropTypes.string,
    dislikedFoods: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,

  editUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
