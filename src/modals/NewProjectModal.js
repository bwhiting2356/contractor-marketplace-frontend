import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Modal, Button, Label, Loader, Item, Divider } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react'

import { postNewProject, clearProjectPostingSuccess } from '../redux/actions';
import ErrorLabel from './ErrorLabel';

const NewProjectModal = props => {
    const currentTime = new Date();

    const [deadline, setDeadline] = useState(currentTime)
    const [date, setDate] = useState(currentTime.toISOString().substr(0, 10));
    const [time, setTime] = useState(moment(currentTime).format("HH:mm"));
   
    const [submitDisabled, setButtonDisabled] = useState(true);
    const [modalOpen, setOpen] = useState(false);

    const isPositive = (_, value) => value > 0;

    useEffect(() => {
        setDeadline(moment(`${date} ${time}`, `YYYY-MM-DD hh:mm`).format());
    }, [date, time])

    const {
        postNewProject,
        postingNewProject, 
        showProjectPostingSuccess,
        clearProjectPostingSuccess 
    } = props;

    const handleSubmit = ({ description, maximumBudget }) => {
        postNewProject({ description, maximumBudget, deadline })
    }
    const closeSuccessModal = () => {
        setOpen(false);
        clearProjectPostingSuccess();
    }

    return (
        <Modal
            open={modalOpen}
            onClose={closeSuccessModal}
            centered={false}
            trigger={<Button id="new-project" onClick={() => setOpen(true)}primary>New Project</Button>}>
            <Modal.Header>New Project</Modal.Header>
            <Modal.Content>
                { showProjectPostingSuccess &&
                    (
                        <Fragment>
                            <Item>
                                Your new project was successfully posted!
                            </Item>
                            <Divider />
                            <Button secondary onClick={closeSuccessModal}>OK</Button>
                        </Fragment>
                    ) 
                }
                { postingNewProject && <Loader active={true}/> }
                { !postingNewProject && !showProjectPostingSuccess && (
                    <Form
                    onValid={() => setButtonDisabled(false)}
                    onInvalid={() => setButtonDisabled(true)}
                    onValidSubmit={handleSubmit}>
                        <Form.Field>
                        <Form.Input
                            required
                            name="description"
                            label="Description"
                            errorLabel={ErrorLabel}
                            validationErrors={{ 
                                isDefaultRequiredValue: 'A description is required' 
                            }}
                            placeholder='What do you need to be done?' />
                        </Form.Field>
                        <Form.Field>
                        <Form.Input
                            name="maximumBudget"
                            labelPosition='left'
                            type='text'
                            required
                            validations={{ isNumeric: true, isPositive }}
                            label="Maximum Budget"
                            errorLabel={ErrorLabel}
                            validationErrors={{ 
                                isPositive: 'Number must be positive',
                                isDefaultRequiredValue: 'Maximum amount is required', 
                                isNumeric: 'Please enter a valid number.' }}
                            placeholder="What is the most you're willing to spend?">
                            <Label type="number" basic>$</Label>
                            <input required />
                        </Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>Deadline</label>
                            <div className="date-input-group">
                                <div><input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
                                <div><input type="time" value={time} onChange={e => setTime(e.target.value)} /></div>
                            </div>
                        </Form.Field>
                        <Button type='submit' disabled={submitDisabled}>Submit</Button>
                    </Form>
                )}
            </Modal.Content>
        </Modal>
    )
}

const mapStateToProps = state => ({
    postingNewProject: state.projectsReducer.postingNewProject,
    showProjectPostingSuccess: state.projectsReducer.showProjectPostingSuccess
})

const mapDispatchToProps = { postNewProject, clearProjectPostingSuccess }

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModal);