import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { handleMessageAction } from './../actions/HandleMessageAction';
import { leaveUserAction } from './../actions/LeaveUserAction';
import { connectNotifyAction } from './../actions/ConnectServerAction';

import { messageService } from './../service/MessageService';

import {
    Button,
    Header,
    Comment,
    Segment,
    Input,
    Icon
} from 'semantic-ui-react';

import Notifier from './partials/Notifier/Notifier'
import Message from './partials/Message/Message';
import Status from './partials/Status/Status';

import Replic from './../models/Replic'


import './../styles/ChatStyle.css';
import 'semantic-ui-css/semantic.min.css';



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

    clearMessage = () => {
        this.setState({
            currentMessage: ''
        });
    };

    //прокрутка контента к последнему сообщению
    scrollToBottom = () => {
        ReactDOM.findDOMNode(this.chat).scrollIntoView({block: 'end', behavior: 'smooth'});
    };

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
        const chatTitle =
            <Segment attached='top' secondary>
                <Header as='h3'>
                    <Icon name='group' color='blue'/>
                    <Header.Content>
                        Simple chat
                    </Header.Content>
                </Header>
            </Segment>;

        const chatMessages =
            this.props.chatMessages.map((message, number) =>
                <Message
                    key={number}
                    message={message}
                    isMine={this.props.userName === message.author} />
            );

        const chatActionBar =
            <Input
                action
                value={this.state.currentMessage}
                onChange={this.onMessageChange}
                onKeyPress={this.onInputEnterPress}
                placeholder='input your message'
                className='fullWidth'>

                <input/>

                <Button
                    primary
                    onClick={this.onClick}
                    content='send'
                />
            </Input>

        return (
            <div className='chatWrapper'>
                {chatTitle}

                <Segment attached className='messageContainer'>
                    <Status/>

                    <div className='commentWrapper'
                         ref={div => this.chat = div} >
                        <Comment.Group>
                            {chatMessages}
                        </Comment.Group>
                    </div>

                </Segment>

                <Segment attached='bottom'>
                    {chatActionBar}
                </Segment>

                <Notifier/>
            </div>
        );
    }
}

export default connect(
    state => ({
        chatMessages: state.chatMessages
    }),
    dispatch => ({
        bindChatEvents: (currentUser) => {
            messageService.subscribe('open', () => dispatch(connectNotifyAction(currentUser)));
            messageService.subscribe('send', (data) => dispatch(handleMessageAction(data)));
            messageService.subscribe('leave', (data) => dispatch(leaveUserAction(data)));
        }
    })
)(Chat);