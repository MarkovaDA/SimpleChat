import React, { Component } from 'react';
import {
    Segment,
    Button,
    Form,
    Header
} from 'semantic-ui-react';

import './SignIn.css';

class SignIn extends Component {
    state = {
        currentUser: ''
    };

    onUsernameChange = ({target}) => {
        this.setState({
            currentUser: target.value
        });
    };

    onSignIn = () => {
        this.props.onUserSignedIn(this.state.currentUser);
    };

    render() {
        return (
            <Segment className='signInContainer'>
                <Header as='h3'>Simple chat</Header>
                <Form unstackable>
                    <Form.Input
                        placeholder='username'
                        value={this.state.currentUser}
                        onChange={this.onUsernameChange}/>
                    <Button
                        type='submit'
                        onClick={this.onSignIn}>
                        Join
                    </Button>
                </Form>
            </Segment>
        )
    }
}
export default SignIn;