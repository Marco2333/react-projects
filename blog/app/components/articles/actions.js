import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

import {SERVER_ADDRESS} from '../../config/config';

export const fetchStart = () => ({
	type: FETCH_START
});

export const fetchSucceed = (info) => ({
	type: FETCH_SUCCEED,
	info
});

export const fetchFail = (message) => ({
	type: FETCH_FAIL,
	message
});

const getUrl = ({current, count = 15, type, category, keyword, tag}) => {
	let url = `${SERVER_ADDRESS}/get-articles?count=${count}`;
	
	if(current != null) {
		url += `&current=${current}`;
	}
	if(tag != null) {
		url += `&tag=${tag}`;
	}
	if(keyword != null) {
		url += `&keyword=${keyword}`;
	}
	if(category != null) {
		url += `&category=${category}`;
	}
	if(type != null && +type !== 0) {
		url += `&type=${type}`;
	}

	return url;
}

export const getArticles = (params) => {
	return (dispatch) => {
		let url = getUrl(params);

		dispatch(fetchStart());

        fetch(url).then((response) => {
            
            if(response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
                dispatch(fetchFail("LOADING FAILED! Error code: " + response.status));
            }

            response.json().then((responseJson) => {
                if(responseJson.status == 0) {
                    dispatch(fetchFail(responseJson.message));
                }
                dispatch(fetchSucceed(responseJson.info));
            }).catch((error) => {
                dispatch(fetchFail(error));
			})
			
        }).catch((error) => {
            dispatch(fetchFail(error));
        });
	}
}