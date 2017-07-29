import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes';

import {SERVER_ADDRESS} from "../../config/config.js";

export const gossipStarted = () => ({
    type: FETCH_STARTED
});

export const gossipSuccess = (gossips, total) => ({
    type: FETCH_SUCCESS,
	gossips,
	total
});

export const gossipFailure = (message) => ({
    type: FETCH_FAILURE,
    message
});

export const getGossip = (current = 1, count = 30) => {
    return (dispatch) => {
        const apiUrl = `${SERVER_ADDRESS}/get-gossip?current=${current}&count=${count}`;
        dispatch(gossipStarted());

        fetch(apiUrl).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
                dispatch(gossipFailure("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(gossipFailure(responseJson.message));
                }
                dispatch(gossipSuccess(responseJson.gossips, responseJson.total));
            }).catch((error) => {
                dispatch(gossipFailure(error));
            })
        }).catch((error) => {
            dispatch(gossipFailure(error));
        });
    }
}