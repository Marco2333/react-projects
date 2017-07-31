import * as Status from "../../config/status";

import {FETCH_START, FETCH_SUCCEED, FETCH_FAIL} from "./actionTypes";

import {generateReducer} from '../../common/reducer';

export const initialState = {gossips: [], total: 0};

export default generateReducer(initialState, [FETCH_START, FETCH_SUCCEED, FETCH_FAIL]);