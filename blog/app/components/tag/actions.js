import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVERADDRESS} from "../../config/config.js";

export const tagStarted = () => ({
    type: FETCH_STARTED
});

export const tagSuccess = (articals) => ({
    type: FETCH_SUCCESS,
    articals
});

export const tagFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getTag = (tag) => {
    return (dispatch) => {
        const apiUrl = `${SERVERADDRESS}/get-tag?tag=${tag}`;
        dispatch(tagStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(tagFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(tagFailure(responseJson.message));
                }
                dispatch(tagSuccess(responseJson.articals));
            }).catch((error) => {
                console.log(error);
                dispatch(tagFailure(error));
            })
        }).catch((error) => {
            console.log(error);
            dispatch(tagFailure(error));
        });
    }
}