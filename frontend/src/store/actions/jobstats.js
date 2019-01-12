import axios from '../../axios-setup';

import * as actionTypes from './actionTypes';

export const getgraphSuccess = (result,appmonSelect, appstatusSelect,appbycitySelect) => {
    return {
        type: actionTypes.GET_GRAPH_DATA_SUCCESS,
        grapherrFlag : false,
        graphsuccFlag:true,
        apppermonth : result[0],
        appmonSelect : appmonSelect,
        appsaves : result[1],
        appstatus : result[2],
        toplowapps : result[3],
        appbycity : result[4],
        appclicks : result[5],
        appbycitySelect: appbycitySelect,
        appstatusSelect : appstatusSelect,
    };
};


export const getgraphFail = () => {
    return {
        type: actionTypes.GET_GRAPH_DATA_FAIL,
        grapherrFlag : true,
        graphsuccFlag : false,
    };
};


export const getgraphdata = (username) => {
    return dispatch => {
          
   
     
    let appmonSelect =  [];
    let appstatusSelect = [];
    let appbycitySelect =[];
        axios.get('/graphdata',{
           params: {
               username : username,
               
               
             }
        }) 
       .then((response) => {
    
          
          
           console.log("Status Code : ",response.status);
           if(response.status === 200){
                   
            console.log("Success Graph data fetch");
                   console.log(response.data);
            
            
            if(response.data.results[0].length){
                for(var i =0;i < response.data.results[0].length;i++){
                    appmonSelect.push({
                    label:response.data.results[0][i].jobtitle,
                    value:response.data.results[0][i].jobid,
                })
       
            }

            }
            else{
                response.data.results[0] = null;
            }
            
            if(response.data.results[1].length){
                for(i=0;i < response.data.results[1].length;i++){
                    appstatusSelect.push({
                    label:response.data.results[1][i].jobtitle,
                    value:response.data.results[1][i].jobid,
                    })
   
                }
            }
            else{
                response.data.results[1] = null;
            }    
            if(!response.data.results[2].length){
                response.data.results[2] = null;
            
            }
            if(!response.data.results[3].length){
                response.data.results[3] = null;
            
            }
            
            if(response.data.results[4].length){
                for(i=0;i < response.data.results[4].length;i++){
                    appbycitySelect.push({
                    label:response.data.results[4][i].location,
                    value:response.data.results[4][i].location,
                   })
       
                }
            
            }
            else{
                response.data.results[4] = null;
            }
            if(!response.data.results[5].length){
                response.data.results[5] = null;
            
            }



      
            dispatch(getgraphSuccess(response.data.results, appmonSelect, appstatusSelect, appbycitySelect));
               
                  
                  
                
                  
           }else{
                   
                  
                  console.log("Error in Response");
    
               }
          
           
           })
           .catch((error) => {
            
            //dispatch(getgraphSuccess(result)); 
            dispatch(getgraphFail());
            
        });    
       
       
    };
};