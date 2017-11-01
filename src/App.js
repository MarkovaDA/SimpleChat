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
    this.props.handleMessage();
    this.props.unconnectServerNotify();
    this.props.connectServerNotify();
  }


  render() {
    return (
      <ChatPreview />
    );
  }
}

export default connect(
  state => ({

  }),
  dispatch => ({
    //hashmap: event => handler in method bindChatEvents()

    handleMessage: () => {
      messageService.on('message', (data) => {
        dispatch(handleMessageAction(data));
      });
    },
    connectServerNotify: () => {
      messageService.on('open', () => {
        dispatch(connectNotifyAction());
      });
    },
    unconnectServerNotify: () => {
      messageService.on('close', () => {
        dispatch(unconnectNotifyAction());
      });
    }
  }))
(App);
