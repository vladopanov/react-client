import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { User } from '../../models/user';

interface IProps {
  user: User;
  users: any;
  getUsers: any;
  deleteUser: any;
}

class HomePage extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this._handleDeleteUser = this._handleDeleteUser.bind(this);
  }

  public componentDidMount() {
    this.props.getUsers();
  }

  public render() {
    const { user, users } = this.props;
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && <span className='text-danger'>ERROR: {users.error}</span>}
        {users.items &&
          <ul>
            {users.items.map((user, index) =>
              <li key={user.id}>
                {user.firstName + ' ' + user.lastName}
                {
                  user.deleting ? <em> - Deleting...</em>
                  : user.deleteError ? <span className='text-danger'> - ERROR: {user.deleteError}</span>
                  : <span> - <a onClick={this._handleDeleteUser(user.id)}>Delete</a></span>
                }
              </li>
            )}
          </ul>
        }
        <p>
            <Link to='/login'>Logout</Link>
        </p>
      </div>
    );
  }

  private _handleDeleteUser(id: string) {
    return (e: any) => this.props.deleteUser(id);
  }
}

function mapState(state: any) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
