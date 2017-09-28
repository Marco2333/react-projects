import * as Status from "./status";

export const generateReducer = (initialState, actionTypes) => {
	return (state = initialState, action) => {
		switch(action.type) {
			case actionTypes[0]: {
				return {
					...state,
					status: Status.LOADING
				}
			}
			case actionTypes[1]: {
				return {
					...state,
					status: Status.SUCCESS,
					...action.info
				}
			}
			case actionTypes[2]: {
				return {
					...state,
					status: Status.FAILURE,
					error: action.message
				}
			}
			default: {
				return state
			}
		}
	}
}