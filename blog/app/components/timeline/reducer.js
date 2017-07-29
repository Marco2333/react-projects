import * as Status from "../../config/status";
import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from "./actionTypes";

export default(state = {status: Status.LOADING}, action) => {
    switch(action.type) {
        case FETCH_STARTED: {
            return {
                ...state,
                status: Status.LOADING
            }
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                status: Status.SUCCESS,
                ...action.info
            }
        }
        case FETCH_FAILURE: {
            return {
                ...state,
                status: Status.FAILURE,
                error: Status.message
            }
        }
        default: {
            return state
        }
    }
}