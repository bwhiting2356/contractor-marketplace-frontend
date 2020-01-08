import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Item, Divider, Loader, Label, Icon } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react'
import { postNewBid, clearBidPostingSuccess } from '../redux/actions';

import { formatCurrency } from '../util';

import ErrorLabel from './ErrorLabel';

const NewBidModal = props => {
    const {showBidPostingSuccess, clearBidPostingSuccess, postingNewBid, postNewBid, details, userId} = props;
    const [modalOpen, setOpen] = useState(false);
    const [biddingPrice, setBiddingPrice] = useState();
    const [submitDisabled, setButtonDisabled] = useState(false);
    
    // custom validators
    const lessThanMaxPrice = (_, value) => value <= details.maximumBudget;
    const lessThanBiddingPrice = (_, value) => {
        if (value) {
            return parseFloat(value) <= parseFloat(biddingPrice)
        } else {
            return true;
        }
    }
    const isPositive = (_, value) => value > 0;

    const handleSubmit = ({price, min}) => {
        const newBid = {
            price,
            min: min ? min : price,
            projectId: details.id,
            contractorId: userId,
            date: new Date()
        }
        postNewBid(newBid)
    }
    const closeSuccessModal = () => {
        setOpen(false);
        clearBidPostingSuccess();
    }

    return (
        <Modal
            open={modalOpen}
            onClose={closeSuccessModal}
            centered={false}
            trigger={(<Button primary icon floated='right' onClick={() => setOpen(true)}>New Bid&nbsp;<Icon name="plus"/></Button>)}>
            <Modal.Header>New Bid</Modal.Header>
            <Modal.Content>
                { showBidPostingSuccess &&
                    (
                        <Fragment>
                            <Item>
                                Your new bid was successfully posted!
                            </Item>
                            <Divider />
                            <Button secondary onClick={closeSuccessModal}>OK</Button>
                        </Fragment>

                ) }
                { postingNewBid && <Loader /> }
                { !postingNewBid && !showBidPostingSuccess && (
                    <Form
                        onValid={() => setButtonDisabled(false)}
                        onInvalid={() => setButtonDisabled(true)}
                        onValidSubmit={handleSubmit}>
                        <Form.Field>
                            <Form.Input
                            instantValidation
                                name="price"    
                                labelPosition='left'
                                type='text'
                                required
                                onChange={e => setBiddingPrice(e.target.value)}
                                validations={{ isNumeric: true, lessThanMaxPrice, isPositive }}
                                label={`Initial Bidding Price (Max: ${formatCurrency(details.maximumBudget)})`}
                                errorLabel={ErrorLabel}

                                validationErrors={{ 
                                    isDefaultRequiredValue: 'Bidding price is required', 
                                    isPositive: 'Number must be positive',
                                    isNumeric: 'Please enter a valid number.',
                                    lessThanMaxPrice: 'Price can\'t be higher than the project\'s maximum.' }}
                                placeholder="What will you charge to take on this project?">
                                <Label type="number" basic>$</Label>
                                <input required />
                            </Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                name="min"
                                labelPosition='left'
                                type='text'
                                validations={{ isNumeric: true, lessThanBiddingPrice, isPositive }}
                                label="Minimum Price (Optional)"
                                errorLabel={ErrorLabel}
                                validationErrors={{ 
                                    isNumeric: 'Please enter a valid number.',
                                    isPositive: 'Number must be positive',
                                    lessThanBiddingPrice: 'Your minimum price cannot be greater than your bidding price.'
                                }}
                                placeholder="What is the lowest price you'll accept for this job?">
                                <Label type="number" basic>$</Label>
                                <input required />
                            </Form.Input>
                        </Form.Field>
                        <Button type='submit' disabled={submitDisabled}>Submit</Button>
                    </Form>
                )}

            </Modal.Content>
        </Modal>
    )
}

const mapStateToProps = state => ({
    details: state.projectDetailsReducer.details,
    postingNewBid: state.projectDetailsReducer.postingNewBid,
    showBidPostingSuccess: state.projectDetailsReducer.showBidPostingSuccess,
    userId: state.userReducer.userId
});

const mapDispatchToProps = { postNewBid, clearBidPostingSuccess }

export default connect(mapStateToProps, mapDispatchToProps)(NewBidModal);