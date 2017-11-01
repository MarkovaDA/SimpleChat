import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import { sendMessageAction } from './../actions/SendMessageAction';
import './../styles/ChatStyle.css';
import { Button, Comment, Header, Icon, Segment, Input} from 'semantic-ui-react';
import CommentPattern from './partials/CommentPattern';
import ChatHeader from './partials/ChatHeader';
import 'semantic-ui-css/semantic.min.css';


class ChatPreview extends Component {
  state = {
    currentMessage: '',
    clientMessages: [] //массив сообщений клиента в рамках текущей сессии
  };

  componentWillUpdate() {
    this.scrollToBottom();
  }

  //очистка текстового поля сообщения
  clearMessage = () => {
    this.setState({
      currentMessage: ''
    });
  };

  rememberMessage = (newMessageIndex) => {
    //?:почему state обновляется корректно таким образом
    this.state.clientMessages.push(newMessageIndex);
  };

  scrollToBottom = () => {
    //скролится плохо - подумать об этом
    ReactDOM.findDOMNode(this.chat).scrollIntoView({block: "end", behavior: "smooth"});
  };

  onMessageChange = (event) => {
    this.setState({
      currentMessage: event.target.value
    });
  };

  afterMessageSend = () => {
    this.clearMessage();
    this.rememberMessage(this.props.chatMessages.length);
    this.scrollToBottom();
  };

  onClick = () => {
    this.props.sendMessage(this.state.currentMessage);
    this.afterMessageSend();
  };

  onInputEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.props.sendMessage(this.state.currentMessage);
      this.afterMessageSend();
    }
  };

  render() {
    return (
      <div className='chatWrapper'>
        <ChatHeader />
        <Segment attached className='messageContainer'>
          <div className='commentWrapper' ref={div => {this.chat = div}}>
            <Comment.Group>
              {
                this.props.chatMessages.map((message, number) => <CommentPattern key = {number} isMine={this.state.clientMessages.indexOf(number) !== -1} message={message}/>)
              }
            </Comment.Group>
          </div>
        </Segment>
        <Segment attached='bottom'>
          <Input value={this.state.currentMessage} onChange={this.onMessageChange} onKeyPress={this.onInputEnterPress} action placeholder='input your message' className={'fullWidth'}>
            <input />
            <Button onClick={this.onClick} content='send'  primary />
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
  dispatch => ({
    //инициируем отправку сообщения
    sendMessage: (msg) => {
      if (msg !== '') {
        dispatch(sendMessageAction(msg))
      }
    }
  })
)(ChatPreview);