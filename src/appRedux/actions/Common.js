import {
    CLEAR_ITEMS,
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_HIDE_LOADER_TABLE,
    ON_SHOW_LOADER,
    SHOW_MESSAGE
} from "../../constants/ActionTypes";

export const showMessage = (payload) => {
    return {
        type: SHOW_MESSAGE,
        payload: payload
    };
};

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const showLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};

export const hideLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};

export const hideLoaderTable = () => {
    return {
        type: ON_HIDE_LOADER_TABLE,
    };
};

export const clearItems = () => {
    return {
        type: CLEAR_ITEMS,
    }
}