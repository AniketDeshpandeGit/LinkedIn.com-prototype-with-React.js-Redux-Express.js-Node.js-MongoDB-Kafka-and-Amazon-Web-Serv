import axios from 'axios';
import {LOGIN_USER, SIGNUP_USER, LOGOUT_USER, GET_ALL_JOBS, SET_CURRENT_JOB, SET_JOB_TO_DRAFT} from './actionTypes';
import {BACKEND_HOST} from './host_config';

//function/ action to post the login form
export const login = (values, callback) => dispatch =>  {    
    axios.post(BACKEND_HOST + '/login', values)
        .then((res) => {
            if(res.data.status === 'SUCCESS'){  
                localStorage.setItem('jwt_token', res.data.token);
                dispatch({
                    type : LOGIN_USER,
                    payload: res.data
                });
                //callback(res.data);
            }
            else{
                console.log("Some error")
                //callback(res.data);
            }
            callback(res.data);            
        })
        .catch( (err) => {
            callback({status: "ERROR", message: err});
        });        
}

//function/ action to post the user sign up form
export const signup = (values, callback) => dispatch => {        
    axios.post(BACKEND_HOST+ '/userSignup', values)
        .then((res) => {
            if(res.data.status === 'SUCCESS'){  
                dispatch({
                    type : SIGNUP_USER,
                    payload: res.data
                });
            }
            callback(res.data);
           
        });
} 

//function/ action to logout user
export const logout = (callback) => dispatch =>  {
    console.log("Logging out the user. Will clean up tokens")
    localStorage.removeItem('jwt_token');
    dispatch({
        type : LOGOUT_USER,
    });
    callback({status: 'SUCCESS', message: 'You have been logged out.'});
}

export const getAllJobs = (values, callback) => dispatch => {
    axios.get(BACKEND_HOST+ '/getalljobsforrecruiter', {
        params: {
            ...values
        }
    })
        .then((res) => {
            if(res.data.status === 'SUCCESS'){  
                dispatch({
                    type : GET_ALL_JOBS,
                    payload: res.data
                });
            }
            callback(res.data);
           
        });
}

export const setCurrentJobDetail = (values) => dispatch => {

    dispatch({
        type : SET_CURRENT_JOB,
        payload: values,
    });
}

export const setJobtoDraft = (values) => dispatch => {

    dispatch({
        type : SET_JOB_TO_DRAFT,
        payload: values,
    });
}