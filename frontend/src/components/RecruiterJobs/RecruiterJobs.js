import React, {Component} from 'react';
import JobCard from '../JobCard/JobCard';
import NavBar from '../NavBar/NavBar';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import './RecruiterJobs.css';
import {getAllJobs, setJobtoDraft} from '../../store/actions/useraction';

class RecruiterJobs extends Component{

    constructor(props){
        super(props);

        this.state = {
            jobs: [],
            currentjob: {},
            redirectToJobPost: false,
        };

        this.handleGetAllJobs = this.handleGetAllJobs.bind(this);
        this.handleSetJobtoDraft = this.handleSetJobtoDraft.bind(this);
    }

    componentDidMount(){
        this.handleGetAllJobs();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.jobs){
            this.setState({
                jobs: nextProps.jobs
            });
        }
        if(nextProps.currentjob){
            this.setState({
                currentjob: nextProps.currentjob
            });
        if(nextProps.jobedit){
            this.setState({
                redirectToJobPost: true
            })
        }
        }
    }

    handleGetAllJobs(){
        const values = {
            username: this.props.user.email
        };
        this.props.getAllJobs(values, (res) => {
            //if callback needs to be defined
        });
    }

    handleSetJobtoDraft(){
        const values = {
            job: this.state.currentjob
        };
        this.props.setJobtoDraft(values, (res) => {
            //if callback needs to be defined
        });
    }


    render(){
        let jobs = this.state.jobs.map((job) => {
            return <JobCard job={job} />
        });
        let redirectVar = null;
        if(this.state.redirectToJobPost){
            redirectVar = <Redirect to="/JobPost" />
        }
        if(this.props.token === ""){
            redirectVar = <Redirect to="/" />; //it seems the user got logged out, so redirect them to landing
        }
        return(
            <div>
                {redirectVar}
                <NavBar />
                <div className="container search-result-page">
                    <div className="row">
                        <div className="col-sm-6 d-flex flex-column flex-nowrap searched-results border-right">
                            {jobs.length === 0 ? "You have not posted any jobs yet" : jobs}
                        </div>
                        <div className="col-sm-6" id="job_details">
                            <strong>Job Details</strong>
                            {/* //TODO: add details from props */}
                            <div className="job_details_div"  style={{display: Object.keys(this.state.currentjob).length === 0 ? "none" : 'block'}}>
                                <div className="job_title text-success my-2">
                                    {this.state.currentjob.jobtitle}
                                </div>
                                <div className="d-flex-inline flex-row align-items-left">
                                    <button className="btn btn-info m-2" onClick={this.handleSetJobtoDraft}>Edit</button> 
                                </div>
                                <div className="job_desc">
                                    {this.state.currentjob.jobdes}
                                </div>
                            </div>
                            <div style={{display: Object.keys(this.state.currentjob).length === 0 ? "block" : 'none'}} className="m-3 font-weight-light">
                                Please select a job on the left panel to view details
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        token: state.user.token,
        user: state.user.user,
        name: state.user.name,
        user_type: state.user.user_type,
        jobs: state.user.jobs,
        currentjob: state.user.currentjob,
        jobedit: state.user.jobedit,
    }    
};

export default connect(mapStateToProps, {getAllJobs, setJobtoDraft})(RecruiterJobs);