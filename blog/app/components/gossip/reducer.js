import * as Status from "../common/status";
import {generateReducer} from '../common/reducer';
import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from "./actionTypes";

export const initialState = {gossips: [], total: 0};

export default generateReducer(initialState, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL]);