import streams from "../apis/streams";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

// Create Record
export const createStream = (formValues) => async (dispatch) => {
    // In response we get back the data we sent in POST with its ID
    const response = await streams.post("/streams", formValues);

    // dispatching action data to reducer
    dispatch({ type: CREATE_STREAM, payload: response.data });
};

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get("/streams");

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// we need id and update that we want to provide to that stream
export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
};

// we get nothing back
export const deleteStream = (id) => async (dispatch) => {
    await streams.get(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
};
