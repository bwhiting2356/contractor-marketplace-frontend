import React from 'react';
import { Link } from 'react-router-dom';
import { List, Item, Segment, Button, Icon, Label, Image, Grid } from 'semantic-ui-react';
import NewBidModal from './modals/NewBidModal';

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
            color: isOpen ? 'teal' : 'red',
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
                    <Item.Header as='a'>Project Id: #{id}</Item.Header>
                    <Item.Meta floated="right">
                        Posted by {clientId}&nbsp;
                        <Image style={{display: 'inline', height: '20px', width: '20px'}} src={`https://i.pravatar.cc/150?img=${clientId}`} circular size='mini' />
                    </Item.Meta>
                    <Item.Description>
                        {description}
                    </Item.Description>
                    <Item.Extra>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <div>Deadline: {new Date(deadline).toLocaleString()}</div>
                                    <div>Maximum Budget: ${maximumBudget.toFixed(2)}</div>
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
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
}

export default ProjectItem;