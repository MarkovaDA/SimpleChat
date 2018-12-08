import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

class Status extends Component {

  render() {
    return (
      <div>
      {
        !this.props.isConnect &&
        <Message negative>
          <Message.Header>Sorry, the server connection was broken</Message.Header>
          <p>Chat is unavailable</p>
        </Message>
      }
      </div>
    );
  }
}
export default connect(
  state => ({
    isConnect: state.isConnect
  }),
)(Status);
