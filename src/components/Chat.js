import React, { Component } from 'react';
import { connect } from 'react-redux';

import './../styles/ChatStyle.css';
import 'semantic-ui-css/semantic.min.css';
import { MessageService } from "../service/MessageService";

class Chat extends Component {
  componentDidMount() {
    this.props.bindChatEvents();
  }


  render() {
      return (
          <div>
            <h1>Это чат, {this.props.currentUser}</h1>
          </div>
      )
  }
}

export default connect(
    state => ({}),
    dispatch => ({
        bindChatEvents: () => {
            const socket = MessageService.getConnection();

            socket.on('SERVER-CONNECT', function () {
                console.log('SERVER CONNECT');
            })
        }
    }))
(Chat);