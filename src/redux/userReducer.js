import { LOGIN, LOGOUT } from './actionTypes';

export const initialUserState = {
    userId: '',
    userRole: undefined
}

const userReducer = (state = initialUserState, action) => {
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