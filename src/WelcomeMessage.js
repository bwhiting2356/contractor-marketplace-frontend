import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

const WelcomeMessage = props => {
    if (!props.isLoggedIn) {
        return (
            <Message icon positive>
                <Icon name='tasks' size="tiny" />
                <Message.Content>
                    <Message.Header>Welcome!</Message.Header>
                    <i>Log in as a client to post projects. Log in as a contractor to bid on projects.</i>
                </Message.Content>
            </Message>
    
        )
    } else {
        return ''
    }
};

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.userId !== ''
})

export default connect(mapStateToProps)(WelcomeMessage);