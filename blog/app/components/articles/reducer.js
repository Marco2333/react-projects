import * as Status from "../../config/status";
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from "./actionTypes";

import {initialState} from './view';

export default(state = initialState, action) => {
    switch(action.type) {
        case FETCH_START: {
            return {
                ...state,
                status: Status.LOADING
            }
        }
        case FETCH_SUCCEED: {
            return {
                ...state,
                status: Status.SUCCESS,
                ...action.info
            }
        }
        case FETCH_FAIL: {
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