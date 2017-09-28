import WOW from 'wowjs';

import {fetchInfo} from "../common/actions";
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

export const getTimeline = (current = 1, count = 30, category = 0) => {
	let url = `/get-timeline?current=${current}&count=${count}&category=${category}`;
	return fetchInfo(url, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL], () => {new WOW.init()});
}