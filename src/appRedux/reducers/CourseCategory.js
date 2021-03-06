import {
    GET_ALL_COURSE_CATEGORY,
    GET_ALL_COURSE_CATEGORY_ADD,
    GET_ALL_COURSE_CATEGORY_ADD_SUCCESS,
    GET_ALL_COURSE_CATEGORY_SUCCESS, SELECT_COURSE,
    VIEW_COURSE_CATEGORY_SUCCESS,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    courseCategoriesAdd: [],
    courseCategories: [],
    views: [],
    select: "",
};

const CourseCategoryReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SELECT_COURSE: {
            return {
                ...state,
                select: action.payload,
            }
        }
        case VIEW_COURSE_CATEGORY_SUCCESS: {
            return {
                ...state,
                views: action.payload,
            }
        }
        case GET_ALL_COURSE_CATEGORY: {
            return {
                ...state,
                courseCategories: []
            }
        }
        case GET_ALL_COURSE_CATEGORY_SUCCESS: {
            return {
                ...state,
                courseCategories: action.payload,
            }
        }
        case GET_ALL_COURSE_CATEGORY_ADD: {
            return {
                ...state,
                courseCategoriesAdd: []
            }
        }
        case GET_ALL_COURSE_CATEGORY_ADD_SUCCESS: {
            return {
                ...state,
                courseCategoriesAdd: action.payload,
            }
        }
        default:
            return state;
    }
}

export default CourseCategoryReducer;
