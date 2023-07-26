import { call, takeEvery, put, select } from "redux-saga/effects";
import { sagaActions } from "./type";

import {getApi} from '../../helper/apiCalls'
import {userApi} from '../../helper/endPoints' 
import {setUsers,startLoading} from '../reducer';

export default function* rootSaga() {
    yield takeEvery(sagaActions.FETCH_USER_LIST, fetchUserList);
    yield takeEvery(sagaActions.START_LOADING, loading);
  }
  
export function* fetchUserList({payload}) {
    const oldState = yield select();

  try {
    let result = yield call(() =>getApi(userApi+payload));
    yield put(setUsers([...oldState?.users,...result?.data?.results] || []));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export function* loading() {
    try {
      yield put(startLoading());
    } catch (e) {
      yield put({ type: "TODO_FETCH_FAILED" });
    }
  }

