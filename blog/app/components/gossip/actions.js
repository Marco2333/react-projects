import WOW from 'wowjs';

import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

import {fetchInfo} from "../../common/actions";
import {SERVER_ADDRESS} from "../../config/config.js";

export const getGossip = (current = 1, count = 30) => {
	return fetchInfo(`${SERVER_ADDRESS}/get-gossip?current=${current}&count=${count}`, 
			[FETCH_START, FETCH_SUCCEED, FETCH_FAIL], () => {new WOW.init()})
}