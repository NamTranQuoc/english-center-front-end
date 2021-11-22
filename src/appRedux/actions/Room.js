import {
    ADD_ROOM,
    DELETE_ROOM,
    GET_ROOM,
    UPDATE_ROOM
} from "../../constants/ActionTypes";

export const getListRoom = (param) => {
    return {
        type: GET_ROOM,
        payload: param
    };
};

export const addRoom = (param) => {
    return {
        type: ADD_ROOM,
        payload: param
    };
};

export const updateRoom = (room, param) => {
    return {
        type: UPDATE_ROOM,
        payload: {
            room: room,
            param: param
        }
    };
};

export const deleteRoom = (id, param) => {
    return {
        type: DELETE_ROOM,
        payload: {
            id: id,
            param: param
        }
    };
};