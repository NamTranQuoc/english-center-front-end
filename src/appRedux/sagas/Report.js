import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    REPORT_ACTION_RECENT,
    REPORT_COUNT,
    REPORT_STATISTICAL_BY_PAID,
    REPORT_STATISTICAL_BY_REGISTER
} from "../../constants/ActionTypes";
import {
    reportActionRecentSuccess,
    reportCountSuccess,
    reportStatisticalByPaidSuccess,
    reportStatisticalByRegisterSuccess,
    showMessage
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/report`;

export function* reportCount() {
    yield takeEvery(REPORT_COUNT, reportCountGenerate);
}

function* reportCountGenerate() {
    try {
        const response = yield call(reportCountRequest);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(reportCountSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const reportCountRequest = async () =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/count_member`,
    }).then(response => response)
        .catch(error => error)

export function* reportActionRecent() {
    yield takeEvery(REPORT_ACTION_RECENT, reportActionRecentGenerate);
}

function* reportActionRecentGenerate() {
    try {
        const response = yield call(reportActionRecentRequest);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(reportActionRecentSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const reportActionRecentRequest = async () =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/get_recent`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* reportStatisticalByPaid() {
    yield takeEvery(REPORT_STATISTICAL_BY_PAID, reportStatisticalByPaidGenerate);
}

function* reportStatisticalByPaidGenerate() {
    try {
        const response = yield call(reportStatisticalByPaidRequest);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(reportStatisticalByPaidSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const reportStatisticalByPaidRequest = async () =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/statistical_by_paid`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export function* reportStatisticalByRegister() {
    yield takeEvery(REPORT_STATISTICAL_BY_REGISTER, reportStatisticalByRegisterGenerate);
}

function* reportStatisticalByRegisterGenerate() {
    try {
        const response = yield call(reportStatisticalByRegisterRequest);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(reportStatisticalByRegisterSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

const reportStatisticalByRegisterRequest = async () =>
    await axios({
        method: "GET",
        url: `${INSTRUCTOR_API_URL}/statistical_by_register`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([
        fork(reportCount),
        fork(reportActionRecent),
        fork(reportStatisticalByPaid),
        fork(reportStatisticalByRegister),
    ]);
}
