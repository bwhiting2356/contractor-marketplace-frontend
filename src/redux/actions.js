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
    CLEAR_POST_NEW_BID_SUCCESS
} from './actionTypes';

export const login = payload => ({ type: LOGIN, payload });
export const logout = () => ({ type: LOGOUT });

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
    const { userId } = getState();
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
        console.log(e);
    }

}
export const clearBidPostingSuccess = () => ({ type: CLEAR_POST_NEW_BID_SUCCESS });


