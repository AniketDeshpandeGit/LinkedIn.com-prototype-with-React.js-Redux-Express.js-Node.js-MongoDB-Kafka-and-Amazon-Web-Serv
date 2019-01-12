import React, { Component } from 'react';
import './JobStats.css';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import {Redirect} from 'react-router';
//import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import NavBar from '../NavBar/NavBar';


class JobStats extends Component {
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {

      company: '',
      appmonData : [],
      appmonSelectState : [],
      appmonSel : this.props.appmonSelect?this.props.appmonSelect[0]:null,
      appstatusSel : this.props.appstatusSelect?this.props.appstatusSelect[0]:null,
      appbycitySel : this.props.appbycitySelect?this.props.appbycitySelect[0]:null
    }
    


  }
  componentDidMount() {

    if(this.props.token){
      
    this.props.getgraphData(this.props.username);
    //this.props.getgraphData('recruiter1@mail.com');
    }


  }

  handleChange = name => value => {
   
        this.setState({
          [name] : value,
            
      })
      
      

    }

render() {
var showappclicks = '';
var showmonthapp = '';
var showappstatus = '';
var showsaveapp = '';
let showtoplowapp = '';
let showappbycity = '';
let statuspiedata = [];
let appmonbardata = [];
let appbycitydata = [];
let showalldata = '';

let redirectVar = '';
let shownoData = '';

if(!this.props.token){
        
   redirectVar = <Redirect to= "/"/>
}



if(this.props.apppermonth){
  
if(this.state.appmonSel){
  let val = this.state.appmonSel.value;
  let temp = this.props.apppermonth;
  let j = 0;
  for(var i=0;i<temp.length ;i++){
    if(val === temp[i].jobid) {
      j = i;
    }
    
     
  } 
  
  appmonbardata = Object.values(this.props.apppermonth[j]);  
  




}
else{

  appmonbardata = Object.values(this.props.apppermonth[0]);  
    
}

var appmonthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'],
  datasets: [
    {
      label: 'Applications',
      backgroundColor: 'blue',
      borderWidth: 1,
      data: appmonbardata.splice(2,12),
    }
  ]
};

  showmonthapp =   
  <Bar
  data={appmonthData}
  width={220}
  height={400}
  options={{
    maintainAspectRatio: false
  }}
/>



}else{

  showmonthapp = <h4>No Data Found</h4>
}

if(this.props.appstatus){
  

  //console.log("apppermonth", this.props.apppermonth)
  if(this.state.appstatusSel){
    let val = this.state.appstatusSel.value;
    let temp = this.props.apppermonth;
    let j = 0;
    for( i=0;i<temp.length ;i++){
      if(val === temp[i].jobid) {
        j= i;
      }
      
       
    } 
    
     statuspiedata = Object.values(this.props.appstatus[j]);  
    

  }
  else{
  
      statuspiedata = Object.values(this.props.appstatus[0]);  
      
  
  }
  
  var appstatusData = 
      {

          datasets: [{
            data: statuspiedata.splice(2,5),
            backgroundColor: ['green','purple', 'red',]
          }],
          labels: ['Completed','Half Filled','Read',],
        };
  
  
  showappstatus =   
     <Pie
              data={appstatusData}
              width={220}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
            /> 
  
  
  
  }else{
  
    showappstatus = <h4>No Data Found</h4>
  }

if(this.props.appsaves){
var propsave =  this.props.appsaves; 
var appsavelabel =[];
var appsavedata = [];
  for(i =0;i < propsave.length;i++){

    appsavedata.push(propsave[i].saves);
    appsavelabel.push(propsave[i].jobtitle);

  }  
// console.log("appsavelabel", appsavelabel);
// console.log("appsavedata", appsavedata);

  var appsaveData = {

      datasets: [{
        data: appsavedata,
        backgroundColor: ['purple', 'coral','blue','burlyWood','darkOrchid','fuchsia','hotPink','orange','violet','cyan','olive','green']
      }],
      labels: appsavelabel,
    };
  
  showsaveapp =  
    <Pie
    data={appsaveData}
    width={220}
    height={400}
    options={{
      maintainAspectRatio: false
    }}
  />

}
else{

  showsaveapp = <h4>No Data Found</h4>
}
    
if(this.props.toplowapps){
  var toplowapp =  this.props.toplowapps; 
  var toplowapplabel =[];
  var toplowappdata = [];
    for( i =0;i < toplowapp.length;i++){
  
      toplowappdata.push(toplowapp[i].count);
      toplowapplabel.push(toplowapp[i].jobtitle);
  
    }    
    var apptoplowData = {
  
        datasets: [{
          data: toplowappdata,
          backgroundColor: ['orange','violet','cyan','olive','green','purple', 'coral','blue','burlyWood','darkOrchid','fuchsia','hotPink']
        }],
        labels: toplowapplabel ,
      };
    
    showtoplowapp =  
      <Pie
      data={apptoplowData}
      width={220}
      height={400}
      options={{
        maintainAspectRatio: false
      }}
    />
  
  }
  else{
  
    showtoplowapp = <h4>No Data Found</h4>
  }

  if(this.props.appbyCity){
  
    if(this.state.appbycitySel){
       let val = this.state.appbycitySel.value;
       let temp = this.props.appbyCity;
       let j = 0;
      for(var i=0;i<temp.length ;i++){
        if(val === temp[i].location) {
          j = i;
        }
        
         
      } 
      
      appbycitydata = Object.values(this.props.appbyCity[j]);  
    
    }
    else{
    
      appbycitydata = Object.values(this.props.appbyCity[0]);  
        
    }
    
    var appbycityData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          label: 'Applications',
          backgroundColor: 'coral',
          borderWidth: 1,
          data: appbycitydata.splice(1,12),
        }
      ]
    };
    
    showappbycity =   
      <Bar
      data={appbycityData}
      width={220}
      height={400}
      options={{
        maintainAspectRatio: false
      }}
    />
    
    
    
    }else{
    
      showappbycity = <h4>No Data Found</h4>
    }


    if(this.props.appClicks){
      var propclicks =  this.props.appClicks; 
      var appclicksabel =[];
      var appclicksdata = [];
        for(i =0;i < propsave.length;i++){
      
          appclicksdata.push(propclicks[i].Clicks);
          appclicksabel.push(propclicks[i].jobtitle);
      
        }  
      
      
        var appclicksData = {
      
            datasets: [{
              data: appclicksdata,
              backgroundColor: ['purple', 'coral','blue','burlyWood','darkOrchid','fuchsia','hotPink','orange','violet','cyan','olive','green']
            }],
            labels: appclicksabel,
          };
        
        showappclicks =  
          <Pie
          data={appclicksData}
          width={220}
          height={400}
          options={{
            maintainAspectRatio: false
          }}
        />
      
      }
      else{
      
        showappclicks = <h4>No Data Found</h4>
      }

      if (!this.props.apppermonth && !this.props.appstatus && !this.props.appsaves && 
        !this.props.toplowapps && !this.props.appbyCity && !this.props.appClicks){
           showappclicks = null;
           showmonthapp = null;
           showappstatus = null;
           showsaveapp = null;
           showtoplowapp = null;
           showappbycity = null;
          
          
          shownoData = <div className="container" style={{textAlign:'center', margin:'100px' ,minWidth: '600px', padding:'5px'}}>
          
          <div className="alert-danger">
          <h2>No Data Found ...</h2>
            </div>
            
            </div> 
        }else
        {
            showalldata = <div>
                    <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
          <div className="row">
        
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>  
          <h4>Applications per month</h4>
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
           <h4>Application Status by Job</h4>
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
               <h4>Applications by City </h4>
          </div>
        </div>
       </div>

        <div className="container" style={{ minWidth : '1300px', padding:'5px'}}>
     
        <div className="row">
        
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>  
          
          {showmonthapp}

          </div>

          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' , borderWidth: '1px', borderStyle: 'groove' }}>

            {showappstatus}
            
           
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>
            
          
          {showappbycity}

          </div>
        </div>
       </div>
       
       <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
        <div className="row">
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>  
          <label >Select Job Title to View Graph</label>
          <CreatableSelect options={this.props.appmonSelect?this.props.appmonSelect:''}  name="appmonSel" onChange={this.handleChange('appmonSel')} />
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
          <label >Select Job Title to View Graph</label>
          <CreatableSelect options={this.props.appstatusSelect?this.props.appstatusSelect:''}  name="appstatusSel" onChange={this.handleChange('appstatusSel')} />
          
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
          <label >Select City to View Graph</label>
          <CreatableSelect options={this.props.appbyCitySelect?this.props.appbyCitySelect:''}  name="appbycitySel" onChange={this.handleChange('appbycitySel')}  />
          </div>
        </div>
       </div>  

        <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
        <div className="row">
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>  
          <h4>Top 5 Lowest Applications</h4>
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
           <h4>Applications Saves</h4>
          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px'}}>
               <h4>Total Clicks</h4>
          </div>


        </div>

       </div>
        
        <div className="container" style={{ minWidth: '1300px', padding:'5px'}}>
        <div className="row">
        
          <div className="col-sm-5" style={{ maxWidth: '400px', margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>  
          
          {showtoplowapp}

          </div>

          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' , borderWidth: '1px', borderStyle: 'groove' }}>

           {showsaveapp}

          </div>
          <div className="col-sm-5" style={{ maxWidth: '400px',margin:'10px' ,borderWidth: '1px', borderStyle: 'groove' }}>
            
            {showappclicks}
            
           
          </div>


        </div>

       </div>




            </div>

        }





    return (
      <div>
        <NavBar />

        {redirectVar}

        {shownoData}  
         {showalldata}


        
        



      </div>

    )
  }
}



const mapStateToProps = state => {
  return {

    username: state.user.user.email,
    user_type: state.user.user_type,
    name: state.user.name,
    token: state.user.token,
    apppermonth : state.jobstats.apppermonth,
    appmonSelect : state.jobstats.appmonSelect,
    appsaves : state.jobstats.appsaves,
    appstatus : state.jobstats.appstatus, 
    toplowapps : state.jobstats.toplowapps,
    appstatusSelect : state.jobstats.appstatusSelect,
    appbyCity : state.jobstats.appbycity,
    appbyCitySelect : state.jobstats.appbycitySelect,
    appClicks : state.jobstats.appclicks,
    token : state.user.token,
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    getgraphData : (username) => dispatch( actions.getgraphdata(username) ),
    
  };
};

export default connect(mapStateToProps, mapDispatchStateToProps)(JobStats);