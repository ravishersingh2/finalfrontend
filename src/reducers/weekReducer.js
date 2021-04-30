import constants from '../constants/actionTypes'

let initialState = {
      weekWiseData: [],
      eachDayData: {},
      fatsecretDetails:[]
}

const weekReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);
      switch(action.type) {
            case constants.GETEACHDAY:
                  updated = {
                        ...updated,
                        eachDayData:action.data
                  }   
                  return updated; 
                  case constants.GETFATSECRET:
                        updated = {
                              ...updated,
                              fatsecretDetails:action.data
                        }   
                        return updated;
                        case constants.GETWEEKWISE:
                        updated = {
                              ...updated,
                              weekWiseData:action.data
                        }   
                        return updated;             
            default:
                  return state;
      }
}

export default weekReducer;