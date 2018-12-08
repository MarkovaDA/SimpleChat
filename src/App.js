import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './components/Chat';
import SignIn from './components/SignIn';

import { messageService } from './service/MessageService';
import { handleMessageAction } from './actions/HandleMessageAction';
import { unconnectNotifyAction } from './actions/UnconnectServerAction';
import { connectNotifyAction } from './actions/ConnectServerAction';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


class App extends Component {
    state = {
        currentUser: null
    };


  componentWillMount() {
    this.props.bindChatEvents();
  }

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

//перенести это в Chat (здесь подключение к серверу быть не должно)
export default connect(
  state => ({}),
  dispatch => ({
    bindChatEvents: () => {
      const eventHandlers = {'message': handleMessageAction, 'open': connectNotifyAction, 'close': unconnectNotifyAction};

      for(let event in eventHandlers) {
        messageService.on(event, (data) => {
          dispatch(eventHandlers[event](data));
        });
      }
    }
  }))
(App);
