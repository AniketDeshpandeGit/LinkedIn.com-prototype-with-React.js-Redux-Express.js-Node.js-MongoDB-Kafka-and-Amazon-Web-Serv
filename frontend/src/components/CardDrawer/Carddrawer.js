
import React, {Component} from 'react';

import { BACKEND_HOST } from '../../store/actions/host_config';
import axios from 'axios';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Card } from '@material-ui/core';
import Jobcard from '../Cards/Jobcard';
import Jobopen from '../Jobopen/Jobopen';
import Search from '../Search/Search';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';

class Carddrawer extends Component{
    
    constructor(props){
        
        super(props);
        
        this.state = {
          
            jobdesc: '',
            joblocation: '',
            jobtype: 'null',
            jobapplytype: 'null',
            authFlag:'',
            job_list : [],
            tosendjobpaper:'',
            cardsin:false,
            email:'',
        }
        this.searchJob = this.searchJob.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.routeTo = this.routeTo.bind(this);
     
       
    }

    componentDidMount(){
        this.setState({
            email:this.props.email,
            //job_list : this.state.job_list.concat(this.props.email) ,
            //job_list: [...this.state.job_list, this.props.email],
            authFlag : false
        })

        
    }
   


    searchJob = (e) => {
        console.log(this.state)
        const jobdata = {
            jobdesc: this.state.jobdesc,
            joblocation: this.state.joblocation,
            jobtype: this.state.jobtype,
            jobapplytype: this.state.jobapplytype
        }

        e.preventDefault();

        console.log("Form Data", jobdata);
        // const url = "https://www.facebook.com/";
        // window.open(url, '_blank');

        axios.defaults.withCredentials = true;
        axios.get(BACKEND_HOST + '/searchjob',{ params: jobdata})
            //also send counters with axios on a different route 
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    this.setState({
                        job_list : this.state.job_list.concat(response.data.job) ,
                        authFlag : true
                        });
                    //window.location = '/travellerlogin'
                } else {
                    
                }
            });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    routeTo =(e) =>  {
        console.log("in clicked");
      
        console.log("here is"+e);
        console.log(this.state.job_list[e])
        this.setState({
            tosendjobpaper:e,
            cardsin : true
        })
        const data={
            applicantid:this.props.email,
            recruterid:this.state.job_list[e].username,
            jobtitile:this.state.job_list[e].jobtitle,
            jobid:this.state.job_list[e].jobid
        }
        axios.defaults.withCredentials = true;

        axios.post(BACKEND_HOST + '/viewjobcard', data)
          .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
              console.log("success")
    
            } else {
              console.log("error")
            }
          });
       
    };

    handleClick = (evt) => {
        console.log("in clicked out");
        console.log(this.props);
    }
    


    render(){
        let jobs=null;
        if(this.state.authFlag==true)
        {
        var arr = Object.values(this.state.job_list);
       // console.log(arr)
        
        // console.log(this.state.property_list.length)
        var elements=[];
       // console.log(arr.length)
        for(var i=0;i<arr.length;i++){
            
            elements.push(<Jobcard id={i} props={arr[i]} onClick={this.routeTo}/>);
        
            }
        }
        
       

        // let jobopen=null;
        // if(this.state.cardsin===true)
        // {
        //    return	<div class="col-md-6 map-box mx-0 px-0"><Jobopen props={this.state.job_list[this.state.tosendjobpaper]}/> </div>
        // }
      
        return(
            <div>
                <NavBar />
            {jobs}
                 <nav class="navbar navbar-expand-lg navbar-light bg-light">
                {/* <a class="navbar-brand" href="#">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" height="30" width="30" hspace="20" class="d-inline-block align-top" alt="" />
                </a> */}
                
                <div class="col">
                    <input type="text" class="form-control" name="FirstName" placeholder="Job Description"
                        value={this.state.jobdesc}
                        onChange={this.handleChange('jobdesc')}
                    />
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Location"
                        value={this.state.joblocation}
                        onChange={this.handleChange('joblocation')}
                    />
                </div>
                <div class="col">

                        <select id="inputState" class="form-control"
                            value={this.state.jobtype}
                            onChange={this.handleChange('jobtype')}>
                            <option selected >Job Type:</option>
                            <option >Internship</option>
                            <option>Temporary</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Volunteer</option>
                            <option>Other</option>
                        </select>
             
                </div>
                <div class="col">

                        <select id="inputState" class="form-control"
                            value={this.state.jobapplytype}
                            onChange={this.handleChange('jobapplytype')}>
                            <option selected>LinkedIn Features</option>
                            <option value="false">Normal Apply</option>
                            <option value="true">Easy Apply</option>
                        </select>
                  
                </div>
                <button class="btn btn-primary my-2 my-lg-0" type="submit" onClick={this.searchJob}>Search</button>
                
            </nav>
            <section class="search-box">
            <div class="clearfix"></div>
    <div class="container-fluid">
	<div class="row">
		<div class="col-md-6 listing-block">

      
      {elements}
		</div>
	
        <div class="col-md-6 map-box mx-0 px-0">
        <Jobopen props={this.state.job_list[this.state.tosendjobpaper]} id={this.state.email}/>
        {/* {jobopen} */}
        </div>
       
	</div>
</div>
</section>
 
            </div>
           
        )
    }
}

const mapStateToProps = state => {
    
    return {
      name: state.user.name,
      email:state.user.email
    };
  };

export default connect(mapStateToProps)(Carddrawer);