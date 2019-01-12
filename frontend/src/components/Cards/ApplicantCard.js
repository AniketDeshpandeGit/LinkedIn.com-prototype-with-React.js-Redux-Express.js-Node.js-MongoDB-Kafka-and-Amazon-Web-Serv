import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
// import '../../drawer.css'

import { BACKEND_HOST } from '../../store/actions/host_config';
class ApplicantCard extends Component {
    constructor() {
        super();
        this.state = {
            easy_apply: 1,
            text: "Applicants and recruiters ",
        }
        this.routeToProfile = this.routeToProfile.bind(this);

    }

    componentDidMount() {

        //console.log("card in search for each card")
         //console.log(this.props)

      
    }

    routeToProfile = (e) => {
        console.log("in clicked");
        this.props.onClick(this.props.id);
        // console.log("this.props");
        // console.log(this.props);

        const data = {
            applicant_id: this.props.props._id,
        }
        //console.log("app" + applicant_id);

        axios.defaults.withCredentials = true;

        axios.post(BACKEND_HOST +'/viewapplicants', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("success")

                } else {
                    console.log("error")
                }
            });


    };

    render() {

        //console.log(this.props.props)
        const { classes, theme } = this.props;

        return (

            // <div class="card" >
            //     <div class="card-body">
            //         <h5 class="card-title"> {this.props.props.firstName} {this.props.props.lastName}</h5>
            //         <h6 class="card-subtitle mb-2 text-muted"> {this.props.props.headline}</h6>
            //         <p class="card-text">{this.props.props.location}</p>
            //         <a href="#" class="card-link" onClick={this.routeToProfile}>View Profile</a>
            //     </div>
            // </div>

            <div class="card" >
            <div class="card-body">
              <h5 class="card-title"> {this.props.props.firstname} {this.props.props.lastname}</h5>
              <h6 class="card-subtitle mb-2 text-muted"> {this.props.props.jobtitle}</h6>
              <p class="card-text">{this.props.props.company}</p>
              <a href="#" class="card-link" onClick={this.routeToProfile}>View Resume</a>
            </div>
          </div>

    );

    }
}

ApplicantCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(PeopleCard);
export default ApplicantCard;