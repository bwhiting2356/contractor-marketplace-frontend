import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Label, Loader, Item, Divider } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';

import { postNewProject, clearProjectPostingSuccess } from '../redux/actions';
import { getCurrentFormattedTime } from '../util'

// const padZeros = num => {
//     const characterCount = num.toString().length;
//     const zeros = '0'.repeat(2 - characterCount);
//     return `${zeros}${num}`;
// }

// const getCurrentFormattedTime = (currentTime) => {
//     const currentHours = padZeros(currentTime.getHours());
//     const currentMinutes = padZeros(currentTime.getMinutes());
//     const currentDate = padZeros(currentTime.getDate());
//     const currentMonth = padZeros(currentTime.getMonth());
//     const currentYear = currentTime.getFullYear();
//     const formattedDay = `${currentDate}-${currentMonth}-${currentYear}`;
//     const formattedTime = `${currentHours}:${currentMinutes}`;
//     return { formattedDay, formattedTime }
// }

const errorLabel = <Label color="red" pointing/>

const NewProjectModal = props => {
    const defaultDeadline = new Date()
    // default deadline to tomorrow, same time
    defaultDeadline.setDate(defaultDeadline.getDate() + 1);

    const {formattedDay, formattedTime} = getCurrentFormattedTime(defaultDeadline);

    const [date, setDate] = useState(formattedDay);
    const [time, setTime] = useState(formattedTime);
    const [deadline, setDeadline] = useState(defaultDeadline)
    const [submitDisabled, setButtonDisabled] = useState(true);
    const [modalOpen, setOpen] = useState(false);
    
    const updateDeadline = () => {
        const updatedDatetime = new Date();
        const [inputDate, month, year] = date.split('-');
        const [hours, minutes] = time.split(':')
        updatedDatetime.setDate(inputDate)
        updatedDatetime.setMonth(month);
        updatedDatetime.setFullYear(year);
        updatedDatetime.setHours(hours)
        updatedDatetime.setMinutes(minutes)
        setDeadline(updatedDatetime);
    }
    
    useEffect(updateDeadline, [date, time])

    const {
        postNewProject,
        postingNewProject, 
        showProjectPostingSuccess,
        clearProjectPostingSuccess 
    } = props;

    const handleDateChange = (_, { value }) => setDate(value);
    const handleTimeChange = (_, { value }) => setTime(value);
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
            trigger={<Button onClick={() => setOpen(true)}primary>New Project</Button>}>
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

                ) }
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
                            errorLabel={ errorLabel }
                            validationErrors={{ isDefaultRequiredValue: 'A description is required' }}
                            placeholder='What do you need to be done?' />
                        </Form.Field>
                        <Form.Field>
                        <Form.Input
                            name="maximumBudget"
                            labelPosition='left'
                            type='text'
                            required
                            validations="isNumeric"
                            label="Maximum Budget"
                            errorLabel={ errorLabel }
                            validationErrors={{ 
                                isDefaultRequiredValue: 'Maximum amount is required', 
                                isNumeric: 'Please enter a valid number.' }}
                            placeholder="What is the most you're willing to spend?">
                            <Label type="number" basic>$</Label>
                            <input required />
                        </Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <label>Deadline</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{ width: '50%', display: 'inline-block' }}>
                                    <DateInput 
                                        value={date}
                                        name="date"
                                        placeholder="Date"
                                        iconPosition="left"
                                        onChange={handleDateChange}
                                        />
                                </div>
                                <div style={{ width: '50%', display: 'inline-block' }}>
                                    <TimeInput style={{ width: '50%', display: 'inline-block'}}
                                        name="time"
                                        value={time}
                                        placeholder="Time"
                                        iconPosition="left"
                                        onChange={handleTimeChange}
                                        />
                                </div>
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