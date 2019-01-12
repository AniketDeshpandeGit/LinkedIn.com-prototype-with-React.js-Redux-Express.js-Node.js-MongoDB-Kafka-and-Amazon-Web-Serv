import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BACKEND_HOST } from '../../store/actions/host_config';



class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobdesc: '',
            joblocation: '',
            jobtype: 'null',
            jobapplytype: 'null',
            // applicant key get from rajas = ''
            // visit counter = '' ...compodidmount cnt++
            // submit counter = ''
            job_list : [],
        }
        this.searchJob = this.searchJob.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchJob = (e) => {
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
                        job_list : this.state.job_list.concat(response.data) 
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


    render() {
        const { applyJob, resume, coverletter } = this.props;
        return (

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" height="30" width="30" hspace="20" class="d-inline-block align-top" alt="" />
                </a>
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
                            <option selected>Job Type:</option>
                            <option>Internship</option>
                            <option>Co-op</option>
                            <option>Full-time</option>
                            <option>Contractor</option>
                        </select>
             
                </div>
                <div class="col">

                        <select id="inputState" class="form-control"
                            value={this.state.jobapplytype}
                            onChange={this.handleChange('jobapplytype')}>
                            <option selected>LinkedIn Features</option>
                            <option>Normal Apply</option>
                            <option>Easy Apply</option>
                        </select>
                  
                </div>
                <button class="btn btn-primary my-2 my-lg-0" type="submit" onClick={this.searchJob}>Search</button>

            </nav>

        )
    }
}

export default Search;