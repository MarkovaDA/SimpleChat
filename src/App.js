import React, { Component } from 'react';
import { connect } from 'react-redux';
import './components/ChatPreview';
import ChatPreview from './components/ChatPreview';
import { messageService } from './service/MessageService';
import { handleMessageAction } from './actions/HandleMessageAction';
import { unconnectNotifyAction } from './actions/UnconnectServerAction';
import { connectNotifyAction } from './actions/ConnectServerAction';

class App extends Component {

  componentWillMount() {
    this.props.bindChatEvents();
  }

  render() {
    return (
      <ChatPreview />
    );
  }
}

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
