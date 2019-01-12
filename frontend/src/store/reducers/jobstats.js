import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState ={

  errorFlag : null,
  successFlag:null,
  apppermonth : null,
  appsaves : null,
  appstatus : null,
  toplowapps : null,
  appmonSelect : null,
  appstatusSelect : null,
  appbycity : null,
  appclicks : null,
  appbycitySelect: null,
  
}



const getgraphSuccess = (state, action) => {
    
    return updateObject (state,{
        grapherrFlag : action.grapherrFlag,
        graphsuccFlag : action.graphsuccFlag,
        result : action.result,
        apppermonth : action.apppermonth,
        appmonSelect : action.appmonSelect,
        appsaves : action.appsaves,
        appstatus : action.appstatus,
        toplowapps : action.toplowapps,
        appstatusSelect : action.appstatusSelect,
        appbycity : action.appbycity,
        appclicks : action.appclicks,
        appbycitySelect: action.appbycitySelect,
 
    })
 
 
 }

 const getgraphFail = (state, action) => {
    
    return updateObject (state,{
        grapherrFlag : action.grapherrFlag,
        graphsuccFlag : action.graphsuccFlag,
 
    })
 
 
 }


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.GET_GRAPH_DATA_SUCCESS: return getgraphSuccess(state, action);
        case actionTypes.GET_GRAPH_DATA_FAIL: return getgraphFail(state, action);
        
        default:
            return state;
    }
};

export default reducer;