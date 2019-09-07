
export default (state = {filter:()=>true,brand:false},action)=>{
    switch(action.type){
        case "SET_FILTER":
            return action.payload

        default:
            return state;
    }
};