import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BACKEND_HOST } from '../../store/actions/host_config';
import './drawer.css';
import { connect } from "react-redux";

import isNil from 'lodash/fp/isNil';

class EasyApply extends Component {


    constructor(props) {
        super(props);
        this.state = {
            
            jobtitle:'',
            company:'',
            address:'',
            poststatus:'',
            jobdes:'',
            senlevel:'',
            jobid:'',
            _id:'',
            source:'',
            firstname: '',
            lastname: '',
            phoneno : '', 
            email : '',
            easy_apply:'',
            recruiterid:'',
            successPost:false,
            failPost:false,
            errorstatus:''

      }
        this.handleChange = this.handleChange.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.onChangeResume =this.onChangeResume.bind(this);
        this.submitResume  = this.submitResume.bind(this);
    }

    onChangeResume = (e) => {
        e.preventDefault();
        console.log("Changing Resume in Props 1");
        console.log(e.target.files);
        this.props.uploadresume(e.target.files);
    }

    submitResume = (e) => {
        e.preventDefault();
        console.log("Submitting Resume");
        console.log(this.props.uploadedResume);
        
        var resume = this.props.uploadedResume;
        let formData = new FormData();

        for (var i = 0; i < resume.length; i++) {
            formData.append("resume", resume[i]);
        }

        axios.post(BACKEND_HOST + '/uploadresume/' + this.props.email, formData);
    }



    applyJob = (e) => {
        // const url = "https://www.facebook.com/";
        // window.open(url, '_blank');
        console.log("in submit")
        console.log(this.state)

        const data = {
            firstname: this.state.firstname,
            lastname:this.state.lastname,
            phoneno : this.state.phoneno, 
            recruiterid:this.state.recruiterid,
            email : this.state.email,
            jobtitle:this.props.props.jobtitle,
            company:this.props.props.company,
            address:this.props.props.address,
            poststatus:this.props.props.poststatus,
            jobdes:this.props.props.jobdes,
            easy_apply:this.props.props.easy_apply,
            senlevel:this.props.props.senlevel,
            jobid:this.props.props.jobid,
            _id:this.props.props._id,
            source:this.props.props.source,
        }
    
        axios.defaults.withCredentials = true;
        console.log(data);
        axios.post(BACKEND_HOST + '/applyjob',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("success")
                    this.setState({
                        successPost:true,
                    })
                    // window.location = '/ownerlogin'
                }else{
                   console.log("error")

                   this.setState({
                    failPost:true,
                })
                }
            })
            .catch(err => {
                if(err.response){
                   
                    this.setState({
                        failPost:true,
                        errorstatus:err.response.data.msg
                    })
                    //dispatch(getinitdataFail(err.response));
                    console.log(err);
                }   
            });

            
            axios.post(BACKEND_HOST + '/applyjobclick',data)
                .then(response => {
                    console.log("Status Code : ",response);
                    if(response.status === 200){
                        console.log("success")
                    
                        
                        // window.location = '/ownerlogin'
                    }else{
                    console.log("error")
                    
                    
                    }
                });
            

    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    cancelApplication(e) {
        
        console.log("in here")
      }
    componentDidMount(){
        console.log("in easy apply")
        console.log(this.props)
        this.setState({
            jobtitle:this.props.props.jobtitle,
            company:this.props.props.company,
            address:this.props.props.address,
            poststatus:this.props.props.poststatus,
            jobdes:this.props.props.jobdes,
            easy_apply:this.props.props.easy_apply,
            senlevel:this.props.props.senlevel,
            jobid:this.props.props.jobid,
            _id:this.props.props._id,
            source:this.props.props.source,
            recruiterid:this.props.props.recruiterid,
        })
    }
   

    render() {
        const { applyJob,   } = this.props;
        let showSuccess = null;
        let showError = null;
        if(this.state.successPost){
            showSuccess = <div className="alert alert-success" role="alert">
        <h4>Apply Successful</h4>
        
          </div>
        }
        if(this.state.failPost){
            showError = <div className="alert-danger">
        <h4>Application failed- {this.state.errorstatus}, Try Again Later !!</h4>
        
          </div>
        }
        return (

            <div>
                <div className="container">
                    <div className="eapply-div">

                        <form>
                            <div class="form-row">
                                <div class="col">
                                    <b><h5>Apply to Job Position - {this.state.jobid}</h5></b>
                                    <h3>{this.state.company}</h3>
                                    <h3>{this.state.address}</h3>
                                </div>
                            </div>

                            <br />

                            {/* <div class="form-row">
                                <div class="col">
                                    <h4>
                                        <label for="firstName">FirstName LastName</label>
                                    </h4>

                                    <button type="button" class="btn btn-primary">View Profile</button>
                                </div>
                            </div> */}

                            <b>Apply for this Job:</b><br /><br />
                            <div class="form-row">
                                <div class="col">
                                    <label for="firstName">First Name</label>
                                    <input type="text" class="form-control" name="FirstName" placeholder="First name" onChange={this.handleChange('firstname')} />
                                </div>
                                <div class="col">
                                    <label for="firstName">Last Name</label>
                                    <input type="text" class="form-control" placeholder="Last name" onChange={this.handleChange('lastname')} />
                                </div>
                            </div>
                            <br />

                            <div class="form-row">
                                <div class="col">
                                    <label for="firstName">Email</label>
                                    <input type="text" class="form-control" name="FirstName" placeholder="Email"  onChange={this.handleChange('email')}/>
                                </div>
                                <div class="col">
                                    <label for="firstName">Phone</label>
                                    <input type="text" class="form-control" placeholder="Phone" onChange={this.handleChange('phoneno')}/>
                                </div>
                            </div>

                            <br />
                        </form>
                        <th />
                        <div class="form-row">
                            <div class="col">
                             <form onSubmit={this.submitResume}>
                                <label for="exampleFormControlFile1">Upload Resume:</label>
                                <input type="file" multiple name = "resume" class="form-control-file" id="exampleFormControlFile1" onChange = {this.onChangeResume}/>
                                <button type="submit" className="btn btn-primary">Upload</button>
                       </form>
                            </div>
                            <div class="col">
                                <label for="exampleFormControlFile1">Upload Cover Letter: (Optional)</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                            </div>
                        </div>
                        <br />
                        <th />

                        <br />

                        <div class="form-row">
                            {/* <div class="col">
                                <center>
                                    <object align="right">
                                    <button
                                        type="button"
                                        class="btn btn-danger btn-lg"
                                        onClick={this.cancelApplication}>
                                        Cancel
                                    </button></object>
                                </center>

                            </div> */}
                            <div class="col">
                                <center>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-lg btn-block"
                                        
                                        onClick={this.applyJob}>
                                        Submit Application
                                    </button>
                                </center>
                                {showSuccess}
                                {showError}
                                <br/>
                               
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log("Mapping State To Props");
    console.log(state.reducer.uploadedResume);
    return {
        email: state.user.user.email,
        user_type       : state.user.user_type,
        name            : state.user.name,
        token           : state.user.token,
        uploadedResume: state.reducer.uploadedResume
    }
}

const mapDispatchStateToProps = dispatch => {

    return {

        uploadresume: (value) => {
            console.log("Uploading Resume To Props 2");
            console.log(value);
            dispatch({ type: "UPLOADRESUME", payload: value });
        }

    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(EasyApply);