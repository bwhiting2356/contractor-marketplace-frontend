import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Button, Icon, Image, Grid, Segment } from 'semantic-ui-react';
import NewBidModal from './modals/NewBidModal';

import { formatCurrency } from './util';

const ProjectItem = ({ 
    id, 
    description, 
    deadline, 
    maximumBudget, 
    clientId, 
    projectStatus,
    showNewBidButton = false, 
    showDetailsButton = false }) => {
        const isOpen = projectStatus === 'OPEN'
        const label = {
            as: 'a',
            color: isOpen ? 'teal' : 'orange',
            content: isOpen ? 'Open' : 'Closed',
            icon: isOpen ? 'folder open outline' : 'folder outline',
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
                                    <div><span style={{ fontWeight: 'bold' }}>Deadline: </span>{new Date(deadline).toLocaleString()}</div>
                                    <div><span style={{ fontWeight: 'bold' }}>Maximum Budget:</span> {formatCurrency(maximumBudget)}</div>
                                </Grid.Column>
                                <Grid.Column>
                                { showNewBidButton && <NewBidModal /> }
                                { showDetailsButton && <Link to={`project/${id}`}>
                                    <Button basic floated="right">
                                        Details
                                        <Icon name='chevron right' />
                                    </Button>
                                </Link> }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                </Item.Content>
            </Item>
        )
}

export default ProjectItem;