import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    FORGET_PASSWORD,
    REQUEST_FORGET_PASSWORD,
    RESET_PASSWORD,
    SIGNIN_USER,
    SIGNOUT_USER,
} from "../../constants/ActionTypes";
import {
    hideLoader,
    setInitUrl,
    setMember,
    showLoader,
    showMessage,
    userSignInSuccess,
    userSignOutSuccess,
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";
import {getRoleCurrent} from "../../util/ParseUtils";

const INSTRUCTOR_API_URL = `${host}/auth`;

const signOutRequest = async () => {}
    // await auth.signOut()
    //     .then(authUser => authUser)
    //     .catch(error => error);

const signInUserWithEmailPasswordRequest = async (payload) =>
    await axios.post(`${INSTRUCTOR_API_URL}/login`, {
        username: payload.email,
        password: payload.password,
    }).then(response => response)
        .catch(error => error)

const resetPasswordRequest = async (payload) =>
    await axios({
        method: "PUT",
        url: `${INSTRUCTOR_API_URL}/reset`,
        data: {
            username: payload.username,
            new_password: payload.newPassword,
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

function* signInUserWithEmailPassword({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(signInUserWithEmailPasswordRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            localStorage.setItem('token', response.data.payload);
            yield put(userSignInSuccess(response.data.payload));
            const role = getRoleCurrent();
            if (role === "admin" || role === "receptionist") {
                yield put(setInitUrl("/admin/dashboard"));
            } else {
                yield put(setInitUrl("/home"));
            }
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

function* signOut() {
    try {
        const signOutUser = yield call(signOutRequest);
        if (signOutUser === undefined) {
            localStorage.removeItem('token');
            yield put(setMember(null));
            yield put(userSignOutSuccess(signOutUser));
        } else {
            yield put(showMessage(signOutUser.message));
        }
    } catch (error) {
        yield put(showMessage(error));
    }
}

function* resetPassword({payload}) {
    try {
        yield put(showLoader());
        const response = yield call(resetPasswordRequest, payload);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_reset"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export function* resetPasswordUser() {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}

export function* requestForgetPasswordUser() {
    yield takeEvery(REQUEST_FORGET_PASSWORD, requestForgetPassword);
}

function* requestForgetPassword({payload}) {
    try {
        const {email, history} = payload;
        yield put(showLoader());
        const response = yield call(requestForgetPasswordPasswordRequest, email);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("check_mail"));
            history.push('/signin');
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const requestForgetPasswordPasswordRequest = async (payload) =>
    await axios.get(`${INSTRUCTOR_API_URL}/request_forget_password/` + payload)
        .then(response => response)
        .catch(error => error)

export function* forgetPasswordUser() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* forgetPassword({payload}) {
    try {
        const {values, history} = payload;
        yield put(showLoader());
        const response = yield call(forgetPasswordPasswordRequest, values);
        if (response.status !== 200) {
            yield put(showMessage("bad_request"));
        } else if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(showMessage("success_update"));
            history.push('/signin');
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

const forgetPasswordPasswordRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/forget_password`,
        data: {
            confirm_password: payload.confirmPassword,
            new_password: payload.password,
        },
        headers: {
            Authorization: "Bearer " + payload.token,
        },
    }).then(response => response)
        .catch(error => error)

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(signOutUser),
        fork(resetPasswordUser),
        fork(requestForgetPasswordUser),
        fork(forgetPasswordUser)
    ]);
}
