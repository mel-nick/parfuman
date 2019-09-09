import { CHANGE_INPUT_VALUE, CHANGE_SEARCH_DISPLAY_RESULT } from "./types";

export const changeDisplayResult = (flag) => {
    return { type: CHANGE_SEARCH_DISPLAY_RESULT, payload: flag }
}
export const changeInputValue = (value) => {
    return { type: CHANGE_INPUT_VALUE, payload: value }

}