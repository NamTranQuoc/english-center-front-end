import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import commonSagas from "./Common";
import memberSagas from "./Member";
import courseCategorySagas from "./CourseCategory";
import courseSagas from "./Course";
import roomSagas from "./Room";
import shiftSagas from "./Shift";
import documentSagas from "./Document";
import classSagas from "./Class";
import scheduleSagas from "./Schedule";
import examScheduleSagas from "./ExamSchedule";
import reportSagas from "./Report";
import registerSagas from "./Register"
import absentSagas from "./Absent"

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        commonSagas(),
        memberSagas(),
        courseCategorySagas(),
        courseSagas(),
        roomSagas(),
        shiftSagas(),
        documentSagas(),
        classSagas(),
        scheduleSagas(),
        examScheduleSagas(),
        reportSagas(),
        registerSagas(),
        absentSagas(),
    ]);
}
