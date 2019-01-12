import React,{Component} from 'react';
import {connect} from 'react-redux';
import {setCurrentJobDetail} from '../../store/actions/useraction';
import './JobCard.css';

class JobCard extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: undefined,
            // job: {
            //     desc: "This is such a long description that I am sure it will go to multiple lines, and make the card so big and hige that I will need to handle it properly",
            //     title: "Software Engineer",
            //     city: "San Jose",
            //     state: "CA",
            //     companyLogoURL: "./img/Google_logo.png"
            // }
            job: this.props.job
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.setCurrentJobDetail(this.state.job);
    }

    render(){
        return(
            <div>
                <div className="card card-body m-2 p-2 job_card">
                    <div className="d-flex row">
                        <div className="col-sm-3 p-4">
                            <img src="./img/company_logo.png" width="100%" alt="companyLogo"/>
                        </div>
                        <div className="col-sm-9">
                            <a className="job_title" href="#" onClick={this.handleClick}>
                                {this.state.job.jobtitle}
                            </a>
                            <div className="job_desc text-truncate my-2">
                                {this.state.job.jobdes}
                            </div>
                            <div className="job_location">
                                {this.state.job.company}, {this.state.job.address}
                            </div>
                            {/* <div>
                                <button className="btn btn-info p-1">View details</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        jobs: state.user.jobs,
        currentjob: state.user.currentjob,
    }    
};


export default connect(mapStateToProps, {setCurrentJobDetail})(JobCard);