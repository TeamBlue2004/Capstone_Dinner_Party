import axios from 'axios';
import React from 'react';
import { TYPES } from '../types';

const setLoggedIn = () => ({
  type: TYPES.SET_LOGGEDIN,
});

const updateForm = (name, value) => ({
  type: TYPES.UPDATE_FORM,
  name,
  value,
});

const register = (newUser) => {
  console.log(newUser);
  return axios
    .post('/api/users/register', {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      addressUnit: newUser.addressUnit,
      addressStreet: newUser.addressStreet,
      addressCity: newUser.addressCity,
      addressState: newUser.addressState,
      addressZIP: newUser.addressZIP,
      profilePic: newUser.profilePic,
      username: newUser.username,
      password: newUser.password,
    })
    .then((response) => {
      console.log(response, 'Registered');
    });
};

const login = (user) => {
  return axios
    .post('/api/users/login', {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      console.log('res', response);
      localStorage.setItem('usertoken', response.data);
      return response.redirect('/home');
    })
    .catch((err) => {
      console.log(err);
    });
};

const createInput = (state) => {
  return (
    <input
      type="text"
      className="form-control"
      name={state}
      placeholder={`Enter your ${state}`}
      value={state}
      onChange={this.onChange}
    />
  );
};

export const loginActions = {
  setLoggedIn,
  updateForm,
  login,
  register,
  createInput,
};
