import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import './apply.css'

import Iframe from 'react-iframe'

class PersonProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            applicantid: '',
            jobtitle: '',
            phoneno: '',
            gotit:false
        }

    }

    componentDidMount() {
        console.log("card in search for person" + this.props);
    }

    componentDidUpdate() {
        if (this.props.props !== undefined) {

            this.state.firstname = this.props.props.firstname;
            this.state.lastname = this.props.props.lastname;
            this.state.applicantid = this.props.props.applicantid;
            this.state.jobtitle = this.props.props.jobtitle;
            this.state.phoneno = this.props.props.phoneno;
            this.state.gotit=true
        }
    }

    render() {



       // console.log(this.state);
       if(this.state.gotit===true)
       {
        var url="https://s3.us-east-2.amazonaws.com/projectli-bucket/"+this.state.applicantid+"_resume.pdf"
       }
       // console.log(url)
        return (
            <div>
               
                <Iframe url=  {url}
               //<Iframe url="https://s3.us-east-2.amazonaws.com/projectli-bucket/aakash.alurkar95%40gmail.com_resume.pdf" 
                    width="600px"
                    height="1000px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen />
            </div>
        )
    }
}

PersonProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default PersonProfile;