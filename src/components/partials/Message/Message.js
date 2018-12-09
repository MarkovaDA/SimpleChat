import React, { Component } from 'react';
import {
    Comment,
    Label,
    Divider
} from 'semantic-ui-react';

import './Message.css';

class Message extends Component {

    render() {
        const isMine = this.props.isMine; //инициировано ли сообщение текущим клиентом?

        const {text,author,time} = this.props.message;

        return (
            <Comment>
                <Comment.Content className={isMine ? 'commentMargin' : ''}>
                    <Comment.Author as='a'>{author}</Comment.Author>

                    <Comment.Metadata>
                        <div>Today at {time}</div>
                    </Comment.Metadata>

                    <Comment.Text>
                        <Label
                            basic
                            color={isMine ? 'blue' : 'grey'}
                            pointing={isMine ? 'right' : 'left'}>
                            {text}
                        </Label>
                    </Comment.Text>

                    <Divider/>

                </Comment.Content>
            </Comment>
        )
    }
}
export default Message;