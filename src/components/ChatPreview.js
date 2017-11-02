import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import { sendMessageAction } from './../actions/SendMessageAction';
import './../styles/ChatStyle.css';
import { Button, Comment, Segment, Input} from 'semantic-ui-react';
import CommentPattern from './partials/CommentPattern';
import ChatHeader from './partials/ChatHeader';
import ConnectionStatus from './partials/ConnectionStatus';

import 'semantic-ui-css/semantic.min.css';


class ChatPreview extends Component {
  state = {
    currentMessage: ''
  };

  constructor() {
    super();
  }

  componentDidUpdate() {
    //прокручиваем контент
    this.scrollToBottom();
  }

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
    this.props.sendMessage(this.state.currentMessage);
    this.clearMessage();
  };

  //или при клике на текстовом поле
  onInputEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.props.sendMessage(this.state.currentMessage);
      this.clearMessage();
    }
  };

  render() {
    return (
      <div className='chatWrapper'>
        <ChatHeader />
        <Segment attached className='messageContainer'>
          <ConnectionStatus />
          <div className='commentWrapper' ref={div => {this.chat = div}}>
            <Comment.Group>
              {
                this.props.chatMessages.map((message, number) => <CommentPattern key={number} isMine={this.props.clientMessages.indexOf(number)!== -1} message={message}/>)
              }
            </Comment.Group>
          </div>
        </Segment>
        <Segment attached='bottom'>
          <Input value={this.state.currentMessage} onChange={this.onMessageChange} onKeyPress={this.onInputEnterPress} action placeholder='input your message' className='fullWidth'>
            <input />
            <Button onClick={this.onClick} content='send' primary />
          </Input>
        </Segment>
      </div>
    );
  }
}

export default connect(
  state => ({
    //сообщения всего чата
    chatMessages: state.chatMessages,
    //сообщения, отправленные только текущим клиентом
    clientMessages: state.clientMessages
  }),
  dispatch => ({
    //инициируем отправку сообщения
    sendMessage: (msg) => {
      if (msg !== '') {
        dispatch(sendMessageAction(msg))
      }
    }
  })
)(ChatPreview);