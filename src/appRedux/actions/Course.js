import {
    ADD_COURSE,
    DELETE_COURSE,
    GET_ALL_COURSE,
    GET_ALL_COURSE_ADD,
    GET_ALL_COURSE_ADD_SUCCESS,
    GET_ALL_COURSE_BY_CATEGORY,
    GET_ALL_COURSE_BY_CATEGORY_SUCCESS,
    GET_ALL_COURSE_SUCCESS,
    GET_COURSE, GET_COURSE_SUGGEST,
    UPDATE_COURSE
} from "../../constants/ActionTypes";

export const getListCourse = (param) => {
    return {
        type: GET_COURSE,
        payload: param
    };
};

export const getAllCourse = () => {
    return {
        type: GET_ALL_COURSE
    };
};

export const getAllSuccessCategory = (param) => {
    return {
        type: GET_ALL_COURSE_SUCCESS,
        payload: param
    };
};

export const addCourse = (param) => {
    return {
        type: ADD_COURSE,
        payload: param
    };
};

export const updateCourse = (course, param) => {
    return {
        type: UPDATE_COURSE,
        payload: {
            course: course,
            param: param
        }
    };
};

export const deleteCourse = (id, param) => {
    return {
        type: DELETE_COURSE,
        payload: {
            id: id,
            param: param
        }
    };
};

export const getAllCourseByStatus = (param) => {
    return {
        type: GET_ALL_COURSE_ADD,
        payload: {
            status:param,
        }
    };
};

export const getAllSuccessCourseByStatus = (param) => {
    return {
        type: GET_ALL_COURSE_ADD_SUCCESS,
        payload: param
    };
};

export const getAllCourseByCategoryId = (id) => {
    return {
        type: GET_ALL_COURSE_BY_CATEGORY,
        payload: {
            id:id,
        }
    };
};

export const getAllSuccessCourseByCategoryId = (param) => {
    return {
        type: GET_ALL_COURSE_BY_CATEGORY_SUCCESS,
        payload: param
    };
};

export const getCourseSuggest = () => {
    return {
        type: GET_COURSE_SUGGEST
    };
};
