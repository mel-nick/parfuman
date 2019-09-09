import { LOAD_PRODUCT_DATA} from "../actions/types";

const initialState = {
}

  export default function (state = initialState, action) {
    switch (action.type) {
      case LOAD_PRODUCT_DATA:
        return action.payload
    }
    return state
  }
