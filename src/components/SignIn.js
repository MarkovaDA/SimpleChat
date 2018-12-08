import React, { Component } from 'react';

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
            <div>
                <input type='text' placeholder='username' value={this.state.currentUser} onChange={this.onUsernameChange}/>
                <br />
                <button onClick={this.onSignIn}>Sign In</button>
            </div>
        )
    }
}
export default SignIn;