import React, {Component} from 'react';
import {
    Segment,
    Button,
    Form,
    Header} from 'semantic-ui-react';

import './SignInStyle.css';

class SignIn extends Component {
    state = {
        userName: ''
    };

    onUsernameChange = ({target}) => {
        this.setState({
            userName: target.value
        });
    };

    onSignIn = () => {
        this.props.onUserSignedIn(this.state.userName);
    };

    render() {
        return (
            <Segment className='signInContainer'>
                <Header as='h3'>Simple chat</Header>
                <Form unstackable>
                    <Form.Input
                        placeholder='username'
                        value={this.state.userName}
                        onChange={this.onUsernameChange}
                    />
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