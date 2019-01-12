import React, { Component } from 'react';
import '../../App.css';

import './drawer.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BACKEND_HOST } from '../../store/actions/host_config';
import { connect } from "react-redux";

class NormalApply extends Component {

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
            applicantaddress:'',
            applicantdisability:'',
            applicantcity:'',
            gender:'',
            hearabout:'',
            applicantzipcode:'',
            applicantstate:'',
            applicantrace:'',
            hasError: false,
            successPost:false,
            failPost:false,
            errorstatus:'',


           







      }

        this.applyJob = this.applyJob.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeResume =this.onChangeResume.bind(this);
        this.submitResume  = this.submitResume.bind(this);
    }

    applyJob = (e) => {
        // const url = "https://www.facebook.com/";
        // window.open(url, '_blank');
        console.log(this.state)
        const data = {
            jobtitle:this.state.jobtitle,
            company:this.state.company,
            address:this.state.address,
            poststatus:this.state.poststatus,
            jobdes:this.state.jobdes,
            senlevel:this.state.senlevel,
            jobid:this.state.jobid,
            _id:this.state._id,
            source:this.state.source,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phoneno : this.state.phoneno, 
            email : this.state.email,
            easy_apply:this.state.easy_apply,
            recruiterid:this.state.recruiterid,
            applicantaddress:this.state.applicantaddress,
            applicantdisability:this.state.applicantdisability,
            applicantcity:this.state.applicantcity,
            gender:this.state.gender,
            hearabout:this.state.hearabout,
            applicantzipcode:this.state.applicantzipcode,
            applicantstate:this.state.applicantstate,
            applicantrace:this.state.applicantrace,

        }
        axios.defaults.withCredentials = true;
        console.log(data);
        axios.post(BACKEND_HOST + '/applyjob',data)
            .then(response => {
                console.log("Status Code : ",response);
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

    onChangeResume = (e) => {
        e.preventDefault();
        console.log("Changing Resume in Props 1 - NA");
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

        axios.post(BACKEND_HOST + '/uploadresume/' + this.state.email, formData);
    }


    componentDidMount(){
        console.log("in normal apply")
        console.log(this.props)
        if (localStorage.getItem("pageData") !== null) {
            var datanew=JSON.parse(localStorage.pageData);
          }
      

        //console.log(datanew)
          if(datanew!==undefined)
          {
        this.setState({
            jobtitle:datanew.jobtitle,
            company:datanew.company,
            address:datanew.address,
            poststatus:datanew.poststatus,
            jobdes:datanew.jobdes,
            easy_apply:datanew.easy_apply,
            senlevel:datanew.senlevel,
            jobid:datanew.jobid,
            _id:datanew._id,
            source:datanew.source,
            recruiterid:datanew.recruiterid,
        })
        localStorage.removeItem("pageData");
    }
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
     

      }
   


    render() {
        const { applyJob } = this.props;
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
       
        
        return(

            <div>
                <div className="container">
                    <div className="apply-div">
                    
                        <form>
                            <div class="form-row">
                                <div class="col">
                                    <b><h4>Job Position - {this.state.jobid}</h4></b>
                                    <h3>{this.state.company}</h3>
                                    <h3>{this.state.address}</h3>
                                  
                                </div>
                                <div class="col">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" height="100" width="100"></img>
                                </div>
                            </div>

                            <br />
                            <br />
                            <b>Requirements</b><br />
                            <p class="text-justify">
                                Inside and out of the classroom, learning never stops. As University students, whether interns or new graduates, we grow quickly by taking on responsibility and making an impact on core projects. We’re students from across the world, from many different backgrounds, who have all come to Asana to continue our learning journeys.
                            </p>

                            <br />

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
                                    <label for="firstName">Email ID</label>
                                    <input type="text" class="form-control" name="email" placeholder="First name" onChange={this.handleChange('email')} />
                                </div>
                                <div class="col">
                                    <label for="firstName">Phone Number</label>
                                    <input type="text" class="form-control" placeholder="Phone Number" onChange={this.handleChange('phoneno')} />
                                </div>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" onChange={this.handleChange('applicantaddress')}  />
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputCity">City</label>
                                    <input type="text" class="form-control" id="inputCity" onChange={this.handleChange('applicantcity')} />
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputState">State</label>
                                    <select id="inputState" class="form-control" onChange={this.handleChange('applicantstate')} >
                                        <option selected>Choose...</option>
                                        <option >AL</option>
                                        <option >AK</option>
                                        <option >AR</option>	
                                        <option >AZ</option>
                                        <option >CA</option>
                                        <option >CO</option>
                                        <option >CT</option>
                                        <option >DC</option>
                                        <option >DE</option>
                                        <option >FL</option>
                                        <option >GA</option>
                                        <option >HI</option>
                                        <option >IA</option>	
                                        <option >ID</option>
                                        <option >IL</option>
                                        <option >IN</option>
                                        <option >KS</option>
                                        <option >KY</option>
                                        <option >LA</option>
                                        <option >MA</option>
                                        <option >MD</option>
                                        <option >ME</option>
                                        <option >MI</option>
                                        <option >MN</option>
                                        <option >MO</option>	
                                        <option >MS</option>
                                        <option >MT</option>
                                        <option >NC</option>	
                                        <option >NE</option>
                                        <option >NH</option>
                                        <option >NJ</option>
                                        <option >NM</option>			
                                        <option >NV</option>
                                        <option >NY</option>
                                        <option >ND</option>
                                        <option >OH</option>
                                        <option >OK</option>
                                        <option >OR</option>
                                        <option >PA</option>
                                        <option >RI</option>
                                        <option >SC</option>
                                        <option >SD</option>
                                        <option >TN</option>
                                        <option >TX</option>
                                        <option >UT</option>
                                        <option >VT</option>
                                        <option >VA</option>
                                        <option >WA</option>
                                        <option >WI</option>	
                                        <option >WV</option>
                                        <option >WY</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Zip</label>
                                    <input type="text" class="form-control" id="inputZip" onChange={this.handleChange('applicantzipcode')} />
                                </div>
                            </div>
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
                        <div class="form-group">
                            <label for="inputState">How Did You Hear About Us?:</label>
                            <select id="inputState" class="form-control" onChange={this.handleChange('hearabout')} >
                                <option selected>Choose...</option>
                                <option>Career Fair</option>
                                <option>University Recruiting</option>
                                <option>Referral</option>
                                <option>Friend</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <br />
                        <th />
                        <div class="form-row">
                            <label for="inputState">U.S. Equal Opportunity Employment Information (Completion is voluntary)</label>
                            <h5>
                                <p class="text-justify">
                                    Individuals seeking employment are considered without regards to race, color, religion, national origin, age, sex, marital status, ancestry, physical or mental disability, veteran status, gender identity, or sexual orientation. You are being given the opportunity to provide the following information in order to help us comply with federal and state Equal Employment Opportunity/Affirmative Action record keeping, reporting, and other legal requirements.
                            Completion of the form is entirely voluntary. Whatever your decision, it will not be considered in the hiring process or thereafter. Any information that you do provide will be recorded and maintained in a confidential file.</p>
                            </h5>
                            <div class="col">

                                <b>Gender:</b>
                                <select id="inputState" class="form-control" onChange={this.handleChange('gender')} >
                                    <option selected>Choose...</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Decline to Self Identify</option>
                                </select>
                                <br />
                            </div>
                            <div class="col">
                                <b>Please Identify your race:</b>
                                <select id="inputState" class="form-control" onChange={this.handleChange('applicantrace')} >
                                    <option selected>Choose...</option>
                                    <option>American Indian</option>
                                    <option>Asian</option>
                                    <option>Black or African American</option>
                                    <option>Hispanic or Latino</option>
                                    <option>White</option>
                                    <option>Decline to Self Identify</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputState">Voluntary Self-Identification of Disability</label>
                            <h5>
                                <p class="text-justify">
                                    You are considered to have a disability if you have a physical or mental impairment or medical condition that substantially limits a major life activity, or if you have a history or record of such an impairment or medical condition.</p>
                            </h5>
                            <b>Disability Status:</b>
                            <select id="inputState" class="form-control" onChange={this.handleChange('applicantdisability')} >
                                <option selected>Choose...</option>
                                <option>Yes, I have a disability</option>
                                <option>No, I do not have a disability</option>
                                <option>Decline to Self Identify</option>
                            </select>

                        </div>
                        <br />
                        
                        <button
                            disabled={this.state.successPost}
                            type="button"
                            class="btn btn-primary btn-lg btn-block"
                            onClick={this.applyJob}>
                            Submit Application
                        </button>
                        <br/>
                        {showSuccess}
                        {showError}
                       
                        <br/>

                    </div>
                    
                </div>
            </div>
        )
    }
}


function validate(values) {
    const errors = {};

    if (!values.FirstName) {
        errors.FirstName = "Please Enter Name";
    }

    return errors;
}


const mapStateToProps = state => {
    console.log("Mapping State To Props - NA");
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
            dispatch({ type: "UPLOADRESUME", payload: value });
        }

    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(NormalApply);