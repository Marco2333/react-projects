import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVERADDRESS} from "../../config/config.js";

export const noteStarted = () => ({
    type: FETCH_STARTED
});

export const noteSuccess = (notes, total) => ({
    type: FETCH_SUCCESS,
	notes,
	total
});

export const noteFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getNote = (current, count) => {
    return (dispatch) => {
        const apiUrl = `${SERVERADDRESS}/get-note?count=${count}&current=${current}`;
        dispatch(noteStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(noteFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(noteFailure(responseJson.message));
                }
                dispatch(noteSuccess(responseJson.notes, responseJson.total));
            }).catch((error) => {
                console.log(error);
                dispatch(noteFailure(error));
            })
        }).catch((error) => {
            console.log(error);
            dispatch(noteFailure(error));
        });
    }
}