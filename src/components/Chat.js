import React, { Component } from 'react';
import ReactDOM  from 'react-dom';

import { connect } from 'react-redux';


import { handleMessageAction } from './../actions/HandleMessageAction';
import { unconnectNotifyAction } from './../actions/UnconnectServerAction';
import { connectNotifyAction } from './../actions/ConnectServerAction';

import { Button, Comment, Segment, Input} from 'semantic-ui-react';

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
      this.props.bindChatEvents();
  }

  componentDidUpdate() {
    //прокручиваем контент
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
    this.sendMessage(this.state.currentMessage, this.props.currentUser);
    this.clearMessage();
  };

  //или при клике на текстовом поле
  onInputEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.sendMessage(this.state.currentMessage, this.props.currentUser);
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
                        isMine={this.props.currentUser === message.author} />
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
      </div>
    );
  }
}

export default connect(
  state => ({
    chatMessages: state.chatMessages
  }),
  dispatch =>  ({
    bindChatEvents: () => {
      messageService.subscribe('open', (data) => dispatch(connectNotifyAction(data)));
      messageService.subscribe('send', (data) => dispatch(handleMessageAction(data)));
    }
  })
)(Chat);