import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

import {fetchInfo} from "../../common/actions";
import {SERVER_ADDRESS} from "../../config/config.js";

export const getNavInfo = () => {
	let url = `${SERVER_ADDRESS}/get-navside-info`;
    return fetchInfo(url, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL]);
}