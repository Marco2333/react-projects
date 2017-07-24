import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVERADDRESS} from "../../config/config.js";

export const searchStarted = () => ({
    type: FETCH_STARTED
});

export const searchSuccess = (articals, total) => ({
    type: FETCH_SUCCESS,
    articals,
    total
});

export const searchFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const search = (current, count, keyword) => {
    return (dispatch) => {
        const apiUrl = `${SERVERADDRESS}/search?keyword=${keyword}&count=${count}&current=${current}`;
        dispatch(searchStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(searchFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(searchFailure(responseJson.message));
                }
                dispatch(searchSuccess(responseJson.articals, responseJson.total));
            }).catch((error) => {
                dispatch(searchFailure(error));
            })
        }).catch((error) => {
            dispatch(searchFailure(error));
        });
    }
}