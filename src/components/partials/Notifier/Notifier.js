import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react'

class Notifier extends Component {
    state = {
        hidden: false
    };

    componentWillReceiveProps() {
        setTimeout(this.hide.bind(this), 2000);
    }

    isVisible() {
        return !this.state.hidden && this.props.offlineUser
    }

    hide() {
        this.setState({
            hidden: true
        })
    }

    render() {
        return (
            this.isVisible() &&
            <div>
                {this.props.offlineUser} is offline
                <Divider/>
            </div>
        )
    }
}

export default connect(state => ({
    offlineUser: state.offlineUser
}))(Notifier)