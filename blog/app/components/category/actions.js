import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVER_ADDRESS} from "../../config/config.js";

export const categoryStarted = () => ({
    type: FETCH_STARTED
});

export const categorySuccess = (infos) => ({
    type: FETCH_SUCCESS,
    infos
});

export const categoryFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getCategory = (current, count, category) => {
    return (dispatch) => {
        const apiUrl = `${SERVER_ADDRESS}/get-category?category=${category}&count=${count}&current=${current}`;
        dispatch(categoryStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
                dispatch(categoryFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(categoryFailure(responseJson.message));
                }
                dispatch(categorySuccess(responseJson.infos));
            }).catch((error) => {
                console.log(error);
                dispatch(categoryFailure(error));
            })
        }).catch((error) => {
            console.log(error);
            dispatch(categoryFailure(error));
        });
    }
}