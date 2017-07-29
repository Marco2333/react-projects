import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVER_ADDRESS} from "../../config/config.js";

export const fetchADetailStarted = () => ({
    type: FETCH_STARTED
});

export const fetchADetailSuccess = (infos) => ({
    type: FETCH_SUCCESS,
    infos
});

export const fetchADetailFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getArticleDetail = (id) => {
    return (dispatch) => {
        const apiUrl = `${SERVER_ADDRESS}/get-article-detail/${id}`;
        dispatch(fetchADetailStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
                dispatch(fetchADetailFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(fetchADetailFailure(responseJson.message));
                }
                dispatch(fetchADetailSuccess(responseJson.infos));
            }).catch((error) => {
                dispatch(fetchADetailFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchADetailFailure(error));
        });
    }
}