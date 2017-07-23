import * as Status from "../../../config/status";
import {ARTICALS_STARTED, ARTICALS_SUCCESS, ARTICALS_FAILURE} from "./actionType";

export default(state = {status: Status.LOADING}, action) => {
    switch(action.type) {
        case ARTICALS_STARTED: {
            return {
                status: Status.LOADING
            }
        }
        case ARTICALS_SUCCESS: {
            return {
                ...state,
                status: Status.SUCCESS,
                articals: action.articals,
                total: action.total
            }
        }
        case ARTICALS_FAILURE: {
            return {
                status: Status.FAILURE,
                error: Status.message
            }
        }
        default: {
            return state
        }
    }
}