import {fetchInfo} from "../../common/actions";
import {SERVER_ADDRESS} from "../../config/config";
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

export const getArticleDetail = (id) => {
	let url = `${SERVER_ADDRESS}/get-article-detail/${id}`;
	return fetchInfo(url, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL])
}