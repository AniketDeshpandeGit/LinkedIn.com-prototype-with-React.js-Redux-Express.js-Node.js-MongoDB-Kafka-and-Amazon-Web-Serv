import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


class PersonProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            headline: '',
            current_position: '',
            location: '',
            industry: '',
            experience: [],
            education: [],
            contact: ''
        }

    }

    componentDidMount() {
        console.log("card in search for person" + this.props);
    }

    componentDidUpdate() {
        if (this.props.props !== undefined) {

            this.state.firstName = this.props.props.firstName;
            this.state.lastName = this.props.props.lastName;
            this.state.email = this.props.props.email;
            this.state.headline = this.props.props.headline;
            this.state.current_position = this.props.props.currentposition;
            this.state.location = this.props.props.location;
            this.state.industry = this.props.props.industry;
            this.state.experience = this.props.props.experience;
            this.state.education = this.props.props.education;
            this.state.contact = this.props.props.contact;
        }
    }

    render() {

        // var experiences = Object.values(this.state.experience);
        // console.log("my experiences", experiences);
        var eachexperience = [];
        for (var i = 0; i < this.state.experience.length; i++) {
            eachexperience.push(<p>
                Title: {this.state.experience[i].title} <br />
                Company: {this.state.experience[i].company}<br />
                From: {this.state.experience[i].fromMonth} {this.state.experience[i].fromYear} To: {this.state.experience[i].toMonth} {this.state.experience[i].toYear}<br />
                Location: {this.state.experience[i].location}
            </p>)
        }

        var eacheducation = [];
        for (var i = 0; i < this.state.education.length; i++) {
            eacheducation.push(<p>
                School: {this.state.education[i].school} <br />
                Degree: {this.state.education[i].degree} <br />
                Field: {this.state.education[i].field} <br />
                From: {this.state.education[i].fromYear} To: {this.state.education[i].toYear}
            </p>)
        }

        console.log(this.state);

        let showit=null;
        if(this.state.firstName!=='')
        {
        showit=<div class="card">
        <div class="card-body">
            <h4 class="card-title">{this.state.firstName} {this.state.lastName}</h4>
            <h5 class="card-subtitle mb-2">{this.state.headline}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{this.state.email}</h6>
            <h6 class="card-subtitle mb-2 text-muted">{this.state.contact}</h6>
            <h6 class="card-subtitle mb-2">{this.state.location}</h6>
            <h6 class="card-subtitle mb-2">{this.state.industry}</h6>
            <div class="card">
                <div class="card-header">
                    Experience
                </div>
                <div class="card-body">
                {eachexperience}
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    Education
                </div>
                <div class="card-body">
                {eacheducation}
                </div>
            </div>
        </div>
    </div>
        }
        return (
            <div>
                {showit}
            </div>
        )
    }
}

PersonProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default PersonProfile;