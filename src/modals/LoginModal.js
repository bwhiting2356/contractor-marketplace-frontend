import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Label, Menu, Message } from 'semantic-ui-react';
import { Form, Select } from 'formsy-semantic-ui-react'
import { login } from '../redux/actions';

const errorLabel = <Label color="red" pointing/>

const LoginModal = props => {
    const { login } = props;
    const [submitDisabled, setButtonDisabled] = useState(false);
    const [userId, setUserId] = useState();
    const [userRole, setUserRole] = useState();

    const handleUserIdChange = e => setUserId(e.target.value);
    const handleUserRoleChange = (_, { value }) => setUserRole(value);
    const handleSubmit = () => login({ userId, userRole });

    return (
        <Modal
            centered={false}
            trigger={<Menu.Item name='log in' />}>
            <Modal.Header>Log In</Modal.Header>
            <Modal.Content>
                <Message><i>This marketplace operates on the honor system. There is no authentication/authorization...</i></Message>
                <Form
                    onValid={() => setButtonDisabled(false)}
                    onInvalid={() => setButtonDisabled(true)}
                    onValidSubmit={handleSubmit}>
                    <Form.Field>
                        <Form.Input
                            name="id"    
                            type='text'
                            required
                            label={`User Id`}
                            onChange={handleUserIdChange}
                            errorLabel={ errorLabel }
                            validationErrors={{ 
                                isDefaultRequiredValue: 'User id is required'
                            }}                        
                            placeholder="Your nom de plume">
                        </Form.Input>
                    </Form.Field>
                    <Form.Field>
                        <Select
                            name="role"
                            required
                            placeholder='Select your role'
                            onChange={handleUserRoleChange}
                            validationErrors={{ 
                                isDefaultRequiredValue: 'Please select a role'
                            }}   
                            errorLabel={ errorLabel }
                            options={[
                                { key: 'client', value: 'Client', text: 'Client' },
                                { key: 'contractor', value: 'Contractor', text: 'Contractor' }
                            ]} 
                        />
                    </Form.Field>
                    <Button type='submit' disabled={submitDisabled}>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(LoginModal);