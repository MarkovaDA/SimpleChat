import React, { Component } from 'react';
import { Header, Icon, Segment} from 'semantic-ui-react';

class ChatHeader extends Component {
  render() {
    return (
      <Segment attached='top' >
        <Header as='h3'>
          <Icon name='group' color={'blue'}/>
          <Header.Content>
            Simple chat
          </Header.Content>
        </Header>
      </Segment>
    )
  }
}
export default ChatHeader;