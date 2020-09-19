/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loginActions } from '../../store/actions/index';

class Friends extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { loadFriends } = this.props;
    loadFriends('63f7b479-db89-4b5f-804d-4e371250b66f');
  }

  render() {
    const { friendsList } = this.props;
    return (
      <div>
        {friendsList.length !== 0 ? (
          <div>
            <div>
              <h2>{friendsList.length} Friends</h2>
            </div>
            <div>
              {friendsList.map((friend) => {
                return (
                  <Link to={`/friend/${friend.id}`} key={friend.id}>
                    {friend.id}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div>You have no friends</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsList: state.friends.friends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriends: (userId) => {
      dispatch(loginActions.fetchFriends(userId));
    },
  };
};

Friends.propTypes = {
  loadFriends: PropTypes.func.isRequired,
  friendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
