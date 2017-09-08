import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
// import { logout } from '../helpers/auth'
import axios from 'axios';
function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}
export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    var self = this;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    // axios.get('http://localhost/AD/AD.php',{"user":56789})
    // .then(function (response) {
    //   self.setState({
    //     authed: true,
    //     loading: false,
    //   })
    // })
    // .catch(function (error) {
    //    self.setState({
    //       authed: false,
    //       loading: false
    //     })
    // });
    axios.post('http://localhost/AD/AD.php',{"user":12345} )
    .then(function (response) {
      var data = response.data.valid;
      if(data){
        self.setState({
          authed: true,
          loading: false,
        })  
      }else{
        self.setState({
         authed: false,
         loading: false
       })
      }
    })
    .catch(function (error) {
      self.setState({
         authed: false,
         loading: false
       })
    });
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Data</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                </li>
                <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          // logout()
                        }}
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
