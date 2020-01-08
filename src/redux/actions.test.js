import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import { postNewProject } from './actions';
import { POST_NEW_PROJECT, POST_NEW_PROJECT_SUCCESS, FETCH_PROJECTS } from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { initialUserState } from './userReducer';
import { initalProjectsState } from './projectsReducer';
import { initialProjectDetailsState } from './projectDetailsReducer';

describe('actions tests', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('should post a new project to the backend with the user\'s userId, set initial project status to 0, refresh projects on success', async () => {
        const projectValues = {
            deadline: new Date(), 
            description: 'laundry', 
            maxiumumBudget: 10.00
        };
        fetchMock.postOnce(`${process.env.REACT_APP_MARKETPLACE_API}/project`, {
            body: { ...projectValues, clientId: 'mock-uid-1', projectStatus: 0 },
            headers: { 'content-type': 'application/json' }
        })
        fetchMock.getOnce(`${process.env.REACT_APP_MARKETPLACE_API}/projects`, [])

        const store = mockStore({
            projectsReducer: initalProjectsState,
            projectDtailsReducer: initialProjectDetailsState,
            userReducer: {
                ...initialUserState,
                userId: 'mock-user-1',
                userRole: 'Client'
            }
        });

        const expectedActions = [
            { type: POST_NEW_PROJECT },
            { type: POST_NEW_PROJECT_SUCCESS },
            { type: FETCH_PROJECTS }
        ];

        await store.dispatch(postNewProject(projectValues))
        expect(store.getActions()).toEqual(expectedActions);
    });
})
