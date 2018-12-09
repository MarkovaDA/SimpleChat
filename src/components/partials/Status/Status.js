import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

import './Status.css';
class Status extends Component {

    render() {
        return (
            <div>
                {
                    !this.props.isConnect &&
                    <Message
                        negative
                        className='chatErrorMessage'>
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
