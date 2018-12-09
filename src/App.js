import React, { Component } from 'react';

import Chat from './components/Chat';
import SignIn from './components/partials/SignIn/SignIn';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

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
        const chatRenderer = () => {
            if (this.state.currentUser != null) {
                return <Chat userName={this.state.currentUser} />
            } else {
                return <Redirect to={'/welcome'}/>
            }
        };
        const welcomeRenderer = () => {
            if (this.state.currentUser) {
                return <Redirect to={'/chat'}/>
            } else {
               return <SignIn onUserSignedIn={this.onUserSignedIn} />
            }
        };

        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path='/chat'
                        render={chatRenderer}
                    />
                    <Route
                        exact
                        path='/welcome'
                        render={welcomeRenderer}
                    />
                    <Redirect to={'/welcome'} />
                </Switch>
            </Router>
        );
    }
}
export default App;
