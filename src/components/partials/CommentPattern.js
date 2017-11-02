import React, { Component } from 'react';
import { Comment, Label, Divider } from 'semantic-ui-react';

class CommentPattern extends Component {

  getCurrentDateAndTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  render() {
    const userIcon = require('../../images/user-icon3.png');
    const isMine = this.props.isMine; //инициировано ли сообщение текущим клиентом?

    return (
      <Comment>
        {!isMine && <Comment.Avatar src={userIcon} />}
        <Comment.Content className={isMine ? 'commentMargin' : ''}>
          <Comment.Author as='a'>{isMine ? 'You:' : 'Unknown:'}</Comment.Author>
          <Comment.Metadata>
            <div>Today at {this.getCurrentDateAndTime()}</div>
          </Comment.Metadata>
          <Comment.Text>
            <Label basic color={isMine ? 'blue': 'grey'} pointing={isMine ? 'right': 'left'}>{this.props.message}</Label>
          </Comment.Text>
          <Divider />
        </Comment.Content>
      </Comment>
    )
  }
}

export default CommentPattern;