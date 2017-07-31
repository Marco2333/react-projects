import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

import {fetchInfo} from "../../common/actions";
import {SERVER_ADDRESS} from "../../config/config.js";

export const getArticleDetail = (id) => {
   return fetchInfo(`${SERVER_ADDRESS}/get-article-detail/${id}`, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL])
}