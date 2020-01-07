import {
    FETCH_PROJECTS,
    SAVE_PROJECTS,
    POST_NEW_PROJECT,
    POST_NEW_PROJECT_SUCCESS,
    CLEAR_POST_NEW_PROJECT_SUCCESS,
} from './actionTypes';

export const userRoles = {
    CLIENT: 'Client',
    CONTRACTOR: 'Contractor'
}

const initialState = {
    projects: [],
    fetching: true,
    postingNewProject: false,
    showProjectPostingSuccess: false,
}


const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS:
            return { ...state, fetching: true }
        case SAVE_PROJECTS:
            return { ...state, fetching: false, projects: action.payload }
        case POST_NEW_PROJECT:
            return { ...state, postingNewProject: true }
        case POST_NEW_PROJECT_SUCCESS:
            return { ...state, postingNewProject: false, showProjectPostingSuccess: true }
        case CLEAR_POST_NEW_PROJECT_SUCCESS: 
            return { ...state, showProjectPostingSuccess: false }
        default:
            return state
    }
}

export default projectsReducer;