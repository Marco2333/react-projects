import WOW from 'wowjs';

import {fetchInfo} from "../common/actions";
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

export const getGossip = (current = 1, count = 30) => {
	let url = `/get-gossip?current=${current}&count=${count}`;
	return fetchInfo(url, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL], () => {new WOW.init()})
}