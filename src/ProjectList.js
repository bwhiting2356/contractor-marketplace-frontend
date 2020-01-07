import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Loader, Button, Item, Icon, Breadcrumb } from 'semantic-ui-react';

import { fetchProjects } from './redux/actions';
import ProjectItem from './ProjectItem';
import NewProjectModal from './modals/NewProjectModal';
import { userRoles } from './redux/projectsReducer';

const ProjectList = props => {
    const { fetchProjects, fetching, projects, isContractor, isClient } = props;
    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <Container>
            { isClient && <NewProjectModal /> }
 
            <Loader active={fetching}/>
            <Item.Group divided>
                { projects.map(project => <ProjectItem key={project.id} {...project} showDetailsButton/>)}
            </Item.Group>
            { !fetching && projects.length === 0 && <Item>
                No projects to show.
            </Item> }
        </Container>
    )

}

const mapStateToProps = state => ({
    fetching: state.projectsReducer.fetching,
    projects: state.projectsReducer.projects,
    isContractor: state.userReducer.userRole === userRoles.CONTRACTOR,
    isClient: state.userReducer.userRole === userRoles.CLIENT
})

const mapDispatchToProps = { fetchProjects }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);