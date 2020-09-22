import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/actions/index';

class Friends extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log('componentDidMount ===');
    const { loadFriends, id } = this.props;
    loadFriends(id);
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
                  <p key={friend.id}>
                    {' '}
                    <Link to={`/friend/${friend.id}`} key={friend.id}>
                      {friend.id}
                    </Link>
                  </p>
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
  console.log('state is --- ', state);
  return {
    friendsList: state.login.friends,
    id: state.login.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriends: (userId) => {
      console.log('dispatch to action fetchfirends--', userId);
      dispatch(userActions.fetchFriends(userId));
    },
  };
};

Friends.propTypes = {
  loadFriends: PropTypes.func.isRequired,
  friendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
