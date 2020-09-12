import axios from 'axios';

export const register = (newUser) => {
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

export const login = (user) => {
  return axios
    .post('/api/users/login', {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      console.log('res', response);
      localStorage.setItem('usertoken', response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
