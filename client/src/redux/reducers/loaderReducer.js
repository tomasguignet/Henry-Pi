import { SET_LOADING } from "../actions";

const initialState = {
    loading: false
}

const loader = (state = initialState, action) => {
    if (action.type === SET_LOADING) {
        return {
            ...state,
            loading: action.payload
        };
    } else {
        return {
            ...state
        }
    }
};

export default loader;