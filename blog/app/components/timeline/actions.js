import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVERADDRESS} from "../../config/config.js";

export const fetchTimelineStarted = () => ({
    type: FETCH_STARTED
});

export const fetchTimelineSuccess = (infos) => ({
    type: FETCH_SUCCESS,
    infos
});

export const fetchTimelineFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getTimeline = (current = 1, count = 30, category = 0) => {
    return (dispatch) => {
        const apiUrl = `${SERVERADDRESS}/get-timeline?current=${current}&count=${count}&category=${category}`;
        dispatch(fetchTimelineStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get reaponse with status ' + response.status);
                dispatch(fetchTimelineFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(fetchTimelineFailure(responseJson.message));
                }
                dispatch(fetchTimelineSuccess(responseJson.infos));
            }).catch((error) => {
                dispatch(fetchTimelineFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchTimelineFailure(error));
        });
    }
}