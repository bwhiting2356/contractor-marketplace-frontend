import { LOGIN, LOGOUT } from './actionTypes';

const initialState = {
    userId: 'abc',
    userRole: 'Contractor',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state, userId: '', userRole: undefined };
        case LOGIN:
            return { ...state, userId: action.payload.userId, userRole: action.payload.userRole }
        default:
            return { ...state };
    }
}

export default userReducer;