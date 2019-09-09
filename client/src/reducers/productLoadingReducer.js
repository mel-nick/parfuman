import { PRODUCT_LOADING} from "../actions/types";

  export default function (state = true, action) {
    switch (action.type) {
      case PRODUCT_LOADING:
        return action.payload
    
      }
    return state
  }
