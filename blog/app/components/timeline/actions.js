import WOW from 'wowjs';

import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

import {fetchInfo} from "../../common/actions";
import {SERVER_ADDRESS} from "../../config/config.js";


export const getTimeline = (current = 1, count = 30, category = 0) => {
	return fetchInfo(`${SERVER_ADDRESS}/get-timeline?current=${current}&count=${count}&category=${category}`, 
			[FETCH_START, FETCH_SUCCEED, FETCH_FAIL], () => {new WOW.init()})
}