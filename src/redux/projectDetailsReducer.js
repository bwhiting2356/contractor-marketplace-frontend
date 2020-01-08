import {
    SAVE_PROJECT_DETAILS,
    SAVE_BIDS,
    FETCH_PROJECT_DETAILS,
    FETCH_BIDS,
    POST_NEW_BID,
    POST_NEW_BID_SUCCESS,
    CLEAR_POST_NEW_BID_SUCCESS
} from "./actionTypes";

const initialProjectDetailsState = {
    details: {},
    detailsFetching: false,
    bids: [],
    bidsFetching: true,
    postingNewBid: false,
    showBidPostingSuccess: false,
}
const projectDetailsReducer = (state = initialProjectDetailsState, action) => {
    switch (action.type) {
        case FETCH_PROJECT_DETAILS:
            return { ...state, detailsFetching: true }
        case SAVE_PROJECT_DETAILS:
            return {  ...state, details: action.payload, detailsFetching: false }
        case FETCH_BIDS:
            return { ...state, bidsFetching: true }
        case SAVE_BIDS:
            return { ...state, bids: action.payload, bidsFetching: false};
        case POST_NEW_BID:
            return { ...state, postingNewBid: true };
        case POST_NEW_BID_SUCCESS:
            return { ...state, postingNewBid: false, showBidPostingSuccess: true };
        case CLEAR_POST_NEW_BID_SUCCESS:
            return { ...state, showBidPostingSuccess: false }
        default:
            return { ...state };
    }
}

export default projectDetailsReducer;