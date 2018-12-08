import React, { Component } from 'react';
import Chat from './components/Chat';
import SignIn from './components/SignIn';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
    state = {
        currentUser: null
    };

  onUserSignedIn = (currentUser) => {
      this.setState({
          currentUser: currentUser
      });
  };

  render() {
    return (
        <Router>
            <Switch>
                <Route path='/chat' exact render={ () => {
                    return this.state.currentUser != null ?
                        (<Chat currentUser={this.state.currentUser} />) :
                        (<Redirect to={'/welcome'}/>)
                }} />
                <Route path='/welcome' exact render={() => {
                    if (this.state.currentUser ) {
                       return <Redirect to={'/chat'} />
                    }

                    return (<SignIn onUserSignedIn={this.onUserSignedIn}/>)
                }} />
                <Redirect to={'/welcome'} />
            </Switch>
        </Router>
    );
  }
}
export default App;
