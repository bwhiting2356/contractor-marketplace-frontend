import {
    FETCH_PROJECTS,
    SAVE_PROJECTS,
    LOGIN,
    LOGOUT,
    POST_NEW_PROJECT,
    POST_NEW_PROJECT_SUCCESS,
    CLEAR_POST_NEW_PROJECT_SUCCESS,
    FETCH_PROJECT_DETAILS,
    SAVE_PROJECT_DETAILS,
    FETCH_BIDS,
    SAVE_BIDS,
    POST_NEW_BID,
    POST_NEW_BID_SUCCESS,
    CLEAR_POST_NEW_BID_SUCCESS,
    CHECK_LOCAL_CREDENTIALS,
    POST_NEW_BID_ERROR,
    POST_NEW_PROJECT_ERROR
} from './actionTypes';

// export const logout = () => ({ type: LOGOUT });

export const login = ({ userId, userRole }) => dispatch => {
    dispatch({ type: LOGIN, payload: { userId, userRole } });
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
}

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
}

export const checkLocalCredentials = () => dispatch => {
    dispatch({ type: CHECK_LOCAL_CREDENTIALS });
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if (userId && userRole) {
        dispatch({ type: LOGIN, payload: { userId, userRole } });
    }
}

export const fetchProjects = () => async dispatch => {
    dispatch({ type: FETCH_PROJECTS })
    const projects = await fetch(`${process.env.REACT_APP_MARKETPLACE_API}/projects`)
        .then(res => res.json())
    return dispatch(saveProjects(projects))
};
export const saveProjects = projects => ({ type: SAVE_PROJECTS, payload: projects })

export const fetchProjectDetail = id => async dispatch => {
    dispatch({ type: FETCH_PROJECT_DETAILS })
    const details = await fetch(`${process.env.REACT_APP_MARKETPLACE_API}/project/${id}`)
        .then(res => res.json())
    return dispatch(saveProjectDetails(details))
}
export const saveProjectDetails = details => ({ type: SAVE_PROJECT_DETAILS, payload: details });

export const fetchBids = id => async dispatch => {
    dispatch({ type: FETCH_BIDS })
    const bids = await fetch(`${process.env.REACT_APP_MARKETPLACE_API}/bids-by-project/${id}`)
        .then(res => res.json())
    return dispatch(saveBids(bids));
}
export const saveBids = bids => ({ type: SAVE_BIDS, payload: bids });

export const postNewProject = values => async (dispatch, getState) => {
    dispatch({ type: POST_NEW_PROJECT })
    const { userId } = getState().userReducer;
    const newProject = { ...values, clientId: userId, projectStatus: 0 }
    try {
        await fetch(`${process.env.REACT_APP_MARKETPLACE_API}/project`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        })
        dispatch({ type: POST_NEW_PROJECT_SUCCESS })
        dispatch(fetchProjects());

    } catch (e) {
        dispatch({ type: POST_NEW_PROJECT_ERROR, payload: e })
        console.log(e);
    }
}
export const clearProjectPostingSuccess = () => ({ type: CLEAR_POST_NEW_PROJECT_SUCCESS });

export const postNewBid = values => async dispatch => {
    dispatch({ type: POST_NEW_BID });
    try {
        await fetch(`${process.env.REACT_APP_MARKETPLACE_API}/bid`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        dispatch({ type: POST_NEW_BID_SUCCESS })
        dispatch(fetchBids(values.projectId))

    } catch (e) {
        dispatch({ type: POST_NEW_BID_ERROR, payload: e })
        console.log(e);
    }

}
export const clearBidPostingSuccess = () => ({ type: CLEAR_POST_NEW_BID_SUCCESS });


