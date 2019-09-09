import { CHANGE_INPUT_VALUE, CHANGE_SEARCH_DISPLAY_RESULT } from "../actions/types";
const initialState = {
    value: '',
    display: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT_VALUE:
            return {
                display: true, value: action.payload
            }
        case CHANGE_SEARCH_DISPLAY_RESULT:
            return {
                ...state, display: action.payload
            }
        default:
            return state;
    }
}