import WOW from 'wowjs';

import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

import {fetchInfo} from "../../common/actions";
import {SERVER_ADDRESS} from "../../config/config.js";


export const getNote = (current, count) => {
	return fetchInfo(`${SERVER_ADDRESS}/get-note?count=${count}&current=${current}`, 
		[FETCH_START, FETCH_SUCCEED, FETCH_FAIL], () => {new WOW.init()})
}