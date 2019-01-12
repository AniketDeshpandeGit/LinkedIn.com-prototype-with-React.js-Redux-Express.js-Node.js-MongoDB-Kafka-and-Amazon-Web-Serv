import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState ={
  showinit : true,
  show1stform : false,
  show2ndform : false,
  show3rdform :false,
  activeSteps : 0,
  jobid: '',
  company : '',
  jobtitle : '',
  address : '',
  jobfunc : '',
  emptype : '',
  industry : '',
  senlevel : '',
  jobdes : '',
  recapp : '',
  source : '',
  skills : '',
  explevel : '',
  edulevel: '',
  rate : '',
  easyapply: false,
  errorFlag : false,
  successFlag: false,
  draftSuccessFlag: false,
  draftFailFlag : false,
  
}


const showInit = (state ,action) => {
    return updateObject (state,{
        
        showinit:action.showinit,
        show1stform:false,
        show2ndform:false,
        show3rdform:false,
        errorFlag : false,
        successFlag: false,
        draftSuccessFlag:false,
        draftFailFlag:false,

    })
}
const showJobdesc = (state ,action) => {
    return updateObject (state,{
        
        showinit:false,
        show1stform:action.show1stform,
        show2ndform:false,
        show3rdform:false,
        activeSteps : action.activeSteps,
        errorFlag : false,
        successFlag: false,
        draftSuccessFlag:false,
        draftFailFlag:false,


    
    })
}
const showJobqual = (state ,action) => {
    return updateObject (state,{
        
        showinit:false,
        show1stform:false,
        show2ndform:action.show2ndform,
        show3rdform:false,
        activeSteps : action.activeSteps,
        errorFlag : false,
        successFlag: false,
        draftSuccessFlag:false,
        draftFailFlag:false,
    
    })
}
const showJobcheckout = (state ,action) => {
    return updateObject (state,{
        
        showinit:false,
        show1stform:false,
        show2ndform:false,
        show3rdform:action.show3rdform,
        activeSteps : action.activeSteps,
        errorFlag : false,
        successFlag: false,
        draftSuccessFlag:false,
        draftFailFlag:false,
    
    })
}

const initsubmit = (state ,action) => {
    return updateObject (state,{
       errorFlag : action.errorFlag,
       successFlag: action.successFlag,
       draftSuccessFlag:false,
       draftFailFlag:false,
       
    
    })
}

const continueJobdesc = (state ,action) => {
    return updateObject (state,{
    
       company : action.company,
       jobtitle : action.jobtitle,
       address : action.address,
       jobfunc : action.jobfunc,
       emptype : action.emptype,
       industry : action.industry,
       senlevel : action.senlevel,
       jobdes : action.jobdes,
       recapp : action.recapp,
       source : action.source,
       show1stform : action.show1stform,
       activeSteps : action.activeSteps,
       draftSuccessFlag:false,
       draftFailFlag:false,
    
    })
}

const continueJobqual = (state ,action) => {
    return updateObject (state,{
       skills : action.skills,
       explevel : action.explevel,
       edulevel : action.edulevel,
       show2ndform : action.show2ndform,
       activeSteps : action.activeSteps,
    
    })
}

const jobdraftSuccess = (state ,action) => {
    return updateObject (state,{
        jobid : action.jobid, 
       company : action.company,
       jobtitle : action.jobtitle,
       address : action.address,
       jobfunc : action.jobfunc,
       emptype : action.emptype,
       industry : action.industry,
       senlevel : action.senlevel,
       jobdes : action.jobdes,
       recapp : action.recapp,
       source : action.source,
       draftSuccessFlag: action.draftSuccessFlag,
       draftFailFlag : action.draftFailFlag
    })
}



const jobdraftFail = (state ,action) => {
    return updateObject (state,{
       draftSuccessFlag: action.draftSuccessFlag,
       draftFailFlag : action.draftFailFlag
    })
}


const jobpostSuccess = (state ,action) => {
    return updateObject (state,{
        errorFlag : action.errorFlag,
        successFlag: action.successFlag,
        activeSteps : action.activeSteps,
    })
}



const jobpostFail = (state ,action) => {
    return updateObject (state,{
        errorFlag : action.errorFlag,
        successFlag: action.successFlag,
        activeSteps : action.activeSteps,
    })
}
const jobResetErrors = (state ,action) => {
    return updateObject (state,{
        errorFlag : action.errorFlag,
        successFlag: action.successFlag,
        draftSuccessFlag: action.draftSuccessFlag,
       draftFailFlag : action.draftFailFlag
    })
}


const setpropsval = (state ,action) => {
   
    return updateObject (state,{
        [action.data.name] : action.data.value,
       
    })
}


const getinitdataSuccess = (state ,action) => {
    return updateObject (state,{
        jobid : action.jobid, 
       company : action.company,
       jobtitle : action.jobtitle,
       address : action.address,
       jobfunc : action.jobfunc,
       emptype : action.emptype,
       industry : action.industry,
       senlevel : action.senlevel,
       jobdes : action.jobdes,
       recapp : action.recapp,
       source : action.source,
       skills : action.skills,
       explevel : action.explevel, 
       edulevel : action.edulevel,
       rate : action.rate,
       poststatus : action.poststatus,
       easyapply : action.easyapply,
    })
}
const getinitdataFail = (state ,action) => {
    return updateObject (state,{
        errorFlag : action.errorFlag,
        successFlag: action.successFlag,
        draftSuccessFlag: action.draftSuccessFlag,
       draftFailFlag : action.draftFailFlag
    })
}

const postjobResetAll = (state ,action) => {
    return updateObject (state,{
        showinit : true,
  show1stform : false,
  show2ndform : false,
  show3rdform :false,
  activeSteps : 0,
  jobid: '',
  company : '',
  jobtitle : '',
  address : '',
  jobfunc : '',
  emptype : '',
  industry : '',
  senlevel : '',
  jobdes : '',
  recapp : '',
  source : '',
  skills : '',
  explevel : '',
  edulevel: '',
  rate : '',
  easyapply: false,
  errorFlag : false,
  successFlag: false,
  draftSuccessFlag: false,
  draftFailFlag : false,
    })
}



 const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_GET_JOB_SUCCESS: return getinitdataSuccess(state, action);
        case actionTypes.INIT_GET_JOB_FAIL: return getinitdataFail(state, action);
        case actionTypes.SHOW_INIT_JOB: return showInit(state, action);
        case actionTypes.SHOW_JOB_DESC: return showJobdesc(state, action);
        case actionTypes.SHOW_JOB_QUAL: return showJobqual(state, action);
        case actionTypes.SHOW_JOB_CHECKOUT: return showJobcheckout(state, action);
        case actionTypes.SHOW_INIT_JOB_POST: return initsubmit(state,action);
        case actionTypes.POST_JOB_DESC: return continueJobdesc(state,action);
        case actionTypes.POST_JOB_QUAL: return continueJobqual(state,action);
        case actionTypes.POST_JOB_CHECKOUT_SUCCESS : return jobpostSuccess(state, action);
        case actionTypes.POST_JOB_CHECKOUT_FAIL: return jobpostFail(state, action);
        case actionTypes.POST_JOB_DRAFT_SUCCESS : return jobdraftSuccess(state, action);
        case actionTypes.POST_JOB_DRAFT_FAIL: return jobdraftFail(state, action);
        case actionTypes.POST_JOB_RESET_ERRORS: return jobResetErrors(state, action);
        case actionTypes.SET_PROPS_VALUE: return setpropsval(state, action);
        case actionTypes.POST_JOB_RESET_ALL: return postjobResetAll(state, action);
        default :   
            return state;
    }
};

export default reducer;