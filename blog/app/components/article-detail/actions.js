import {fetchInfo} from "../common/actions";
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from './actionTypes';

export const getArticleDetail = (id) => {
	let url = `/get-article-detail/${id}`;
	return fetchInfo(url, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL])
}