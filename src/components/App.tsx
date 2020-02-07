import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components/common';
import { HomePage } from '../components/HomePage';
import { LoginPage } from '../components/LoginPage';
import { RegisterPage } from '../components/RegisterPage';

export interface IProps {
  alert: any;
  clearAlerts: any;
}

class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  public render() {
    const { alert } = this.props;
    return (
      <div className='jumbotron'>
        <div className='container'>
          <div className='col-sm-8 col-sm-offset-2'>
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path='/' component={HomePage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/register' component={RegisterPage} />
                <Redirect from='*' to='/' />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state: any) {
  const { alert } = state;
  return {
    alert
  };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);

export default hot(connectedApp);
