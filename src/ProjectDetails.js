import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import ProjectItem from './ProjectItem';
import { fetchProjectDetail, fetchBids } from './redux/actions';
import { Loader, Item, Container, Button, Icon, Table, Header, Image, Divider, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { userRoles } from './redux/projectsReducer';

const ProjectDetails = props => {
    let { id } = useParams();

    const {
        detailsFetching,
        bidsFetching,
        details,
        bids,
        fetchProjectDetail,
        fetchBids,
        isContractor
    } = props;
   
    useEffect(() => {
        fetchProjectDetail(id)
        fetchBids(id);
    }, [id]);

    return (
        
        <Container>
            <Link to="/projects"><Button basic><Icon name='chevron left' />Back to Projects</Button></Link>
            <Item.Group divided>
                <Loader active={detailsFetching}/>
                { details.id && <ProjectItem { ...details } showNewBidButton={isContractor}/>}
            </Item.Group>
                <Divider />
                <Loader active={bidsFetching}/>
                {
                    bids.length > 0 && (
                        <Fragment>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='inbox' circular />
                                <Header.Content>Bids</Header.Content>
                            </Header>
                            <Table celled>
                                <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Contractor</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right">Price</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="right">Date</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    { bids && bids.map(({ id, contractorId, price, date }) => (
                                        <Table.Row key={id}>
                                            <Table.Cell>
                                                <Header as='h4' image>
                                                    <Image src={`https://i.pravatar.cc/150?img=${contractorId}`} circular size='mini' />
                                                    <Header.Content>{ contractorId }</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell textAlign="right">${price.toFixed(2)}</Table.Cell>
                                            <Table.Cell textAlign="right">{ new Date(date).toLocaleString() }</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Fragment>
                    )
                }
                { bids.length == 0 && !bidsFetching && <Message>There have been no bids yet for this project.</Message>}
           
        </Container>
        
    )
}

const mapStateToProps = state => ({
    bids: state.projectDetailsReducer.bids,
    details: state.projectDetailsReducer.details,
    isContractor: state.userReducer.userRole === userRoles.CONTRACTOR,
    bidsFetching: state.projectDetailsReducer.bidsFetching.bidsFetching,
    detailsFetching: state.projectDetailsReducer.bidsFetching.detailsFetching
})

const mapDispatchToProps = { fetchProjectDetail, fetchBids }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);