import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVERADDRESS} from "../../config/config.js";

export const fetchArticalsStarted = () => ({
    type: FETCH_STARTED
});

export const fetchArticalsSuccess = (articals) => ({
    type: FETCH_SUCCESS,
    articals
});

export const fetchArticalsFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getArticalList = (current = 1, count = 20, type = 0) => {
    return (dispatch) => {
        const apiUrl = `${SERVERADDRESS}/get-artical-list?current=${current}&count=${count}&type=${type}`;
        dispatch(fetchArticalsStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(fetchArticalsFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(fetchArticalsFailure(responseJson.message));
                }
                dispatch(fetchArticalsSuccess(responseJson.articals));
            }).catch((error) => {
                dispatch(fetchArticalsFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchArticalsFailure(error));
        });
    }
}