import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Item, Button, Icon, Image, Grid } from 'semantic-ui-react';
import moment from 'moment';

import NewBidModal from './modals/NewBidModal';
import TimeRemaining from './TimeRemaining';
import { formatCurrency } from './util';

const ProjectItem = ({ 
    id, 
    description, 
    deadline, 
    maximumBudget, 
    clientId, 
    showNewBidButton = false, 
    showDetailsButton = false }) => {
        const timeDifference = new Date(deadline) - new Date();
        const [expired, setExpired] = useState(timeDifference < 0);

        useEffect(() => {
            const timer = setTimeout(() => {
                setExpired(true);
            }, timeDifference);
            return () => clearTimeout(timer);
        });

        const label = {
            as: 'span',
            color: !expired ? 'teal' : 'orange',
            content: !expired ? 'Open' : 'Closed',
            icon: !expired ? 'folder open outline' : 'folder outline',
            ribbon: true
        }

        return (
            <Item key={id}>
                <Item.Image
                    label={label}
                    size='small'
                    src={`https://picsum.photos/seed/${id}/200`} />
                
                <Item.Content>
                    <Item.Header as='a'>Project #{id}</Item.Header>
                    <Item.Meta floated="right">
                        Posted by {clientId}&nbsp;
                        <Image style={{ display: 'inline', height: '20px', width: '20px' }} src={`https://i.pravatar.cc/150?img=${clientId}`} circular size='mini' />
                    </Item.Meta>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <div><span style={{ fontWeight: 'bold' }}>Description:</span> {description}</div>
                                    <div><span style={{ fontWeight: 'bold' }}>Maximum Budget:</span> {formatCurrency(maximumBudget)}</div>
                                    <div><span style={{ fontWeight: 'bold' }}>Deadline: </span>{moment(deadline).format('MMMM Do YYYY, h:mm a')}</div>
                                    { !expired && <TimeRemaining deadline={deadline}/> }
                                </Grid.Column>
                                <Grid.Column>
                                { !expired && showNewBidButton && <NewBidModal /> }
                                { showDetailsButton && <Link to={`project/${id}`}>
                                        <Button basic floated="right">
                                            Details
                                            <Icon name='chevron right' />
                                        </Button>
                                    </Link> 
                                }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                </Item.Content>
            </Item>
        )
}

export default ProjectItem;