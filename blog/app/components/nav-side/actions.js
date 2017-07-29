import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVER_ADDRESS} from "../../config/config.js";

export const fetchNavInfoStarted = () => ({
    type: FETCH_STARTED
});

export const fetchNavInfoSuccess = (infos) => ({
    type: FETCH_SUCCESS,
    infos
});

export const fetchNavInfoFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getNavInfo = () => {
    return (dispatch) => {
        const apiUrl = `${SERVER_ADDRESS}/get-navside-info`;
        dispatch(fetchNavInfoStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get resWponse with status ' + response.status);
                dispatch(fetchNavInfoFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(fetchNavInfoFailure(responseJson.message));
                }
                dispatch(fetchNavInfoSuccess(responseJson.infos));
            }).catch((error) => {
				console.log(error);
                dispatch(fetchNavInfoFailure(error));
            })
        }).catch((error) => {
			console.log(error);
            dispatch(fetchNavInfoFailure(error));
        });
    }
}