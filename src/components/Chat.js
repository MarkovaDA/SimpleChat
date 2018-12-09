import React, { Component } from 'react';
import ReactDOM  from 'react-dom';

import { connect } from 'react-redux';

import { handleMessageAction } from './../actions/HandleMessageAction';
import { leaveUserAction } from './../actions/LeaveUserAction';
import { connectNotifyAction } from './../actions/ConnectServerAction';

import { Button, Comment, Segment, Input} from 'semantic-ui-react';

import Notifier from './partials/Notifier'
import Message from './partials/Message';
import Title from './partials/Title';
import Status from './partials/Status';

import Replic  from './../models/Replic'

import './../styles/ChatStyle.css';
import 'semantic-ui-css/semantic.min.css';

import { messageService } from "./../service/MessageService";


class Chat extends Component {
  state = {
    currentMessage: ''
  };


  componentDidMount() {
      messageService.getConnection();
      this.props.bindChatEvents(this.props.userName);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMessage = (msgText, author) => {
      if (msgText !== '') {
          const replic = new Replic(msgText, author);
          messageService.sendMessage(replic.getSerializedObject());
      }
  };

  //очистка текстового поля сообщения
  clearMessage = () => {
    this.setState({
      currentMessage: ''
    });
  };

  //прокрутка контента к последнему сообщению
  scrollToBottom = () => {
    ReactDOM.findDOMNode(this.chat).scrollIntoView({block: 'end', behavior: 'smooth'});
  };

  //обновление сообщения при изменении значения текстового поля
  onMessageChange = (event) => {
    this.setState({
      currentMessage: event.target.value
    });
  };

  //отправка сообщения при клике на кнопку
  onClick = () => {
    this.sendMessage(this.state.currentMessage, this.props.userName);
    this.clearMessage();
  };

  //или при клике на текстовом поле
  onInputEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.sendMessage(this.state.currentMessage, this.props.userName);
      this.clearMessage();
    }
  };

  render() {
    return (
      <div className='chatWrapper'>
        <Title />
        <Segment attached className='messageContainer'>
          <Status />
          <div className='commentWrapper' ref={div => {this.chat = div}}>
            <Comment.Group>
              {
                this.props.chatMessages.map((message, number) =>
                    <Message
                        key={number}
                        message={message}
                        isMine={this.props.userName === message.author} />
                    )
              }
            </Comment.Group>
          </div>
        </Segment>
        <Segment attached='bottom'>
          <Input action
              value={this.state.currentMessage}
              onChange={this.onMessageChange}
              onKeyPress={this.onInputEnterPress}
              placeholder='input your message'
              className='fullWidth'>
            <input />
            <Button primary
                onClick={this.onClick}
                content='send'
            />
          </Input>
        </Segment>
        <Notifier />
      </div>
    );
  }
}

export default connect(
  state => ({
    chatMessages: state.chatMessages
  }),
  dispatch =>  ({
    bindChatEvents: (currentUser) => {
      messageService.subscribe('open', () => dispatch(connectNotifyAction(currentUser)));
      messageService.subscribe('send', (data) => dispatch(handleMessageAction(data)));
      messageService.subscribe('leave', (data) => dispatch(leaveUserAction(data)));
    }
  })
)(Chat);