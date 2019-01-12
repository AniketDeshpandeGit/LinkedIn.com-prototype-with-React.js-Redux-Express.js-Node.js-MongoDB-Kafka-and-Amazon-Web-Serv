import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Glyphicon } from "react-bootstrap";
import ProfileContact from './ProfileContact';
import { BACKEND_HOST } from '../../store/actions/host_config';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.edit_intro_toggle = this.edit_intro_toggle.bind(this);

    }

    edit_intro_toggle() {
        this.props.toggleEditIntro();
    }

    componentWillMount() {
        console.log("Will Mount Profile");

    }

    editIntro(values) {
        console.log("Enterting edit intro");
        values.username = "applicant1@mail.com";
        
        this.props.editIntro(values);
    }


    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" initialValue={field.initialValue} hidden={field.hidden} label={field.label} pattern={field.pattern} value="" placeholder={field.placeholder} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    render() {
        console.log("Inside Profile Render");
        const { handleSubmit } = this.props;

        var firstName, lastName, headline, location, current_position, industry, contact;

        if (this.props.firstName)
            firstName = this.props.firstName;
        else
            firstName = "";

        if (this.props.lastName)
            lastName = this.props.lastName;
        else
            lastName = "";

        if (this.props.headline)
            headline = this.props.headline;
        else
            headline = "";

        if (this.props.location)
            location = this.props.location;
        else
            location = "";



        if (this.props.current_position)
            current_position = this.props.current_position;
        else
            current_position = "";

        if (this.props.industry)
            industry = this.props.industry;
        else
            industry = "";

            if (this.props.contact)
            contact = this.props.contact;
        else
        contact = "";


        const EditIntroButton = <button className="btn btn-link float-right" onClick={this.edit_intro_toggle}>Edit</button>;
        const closeEditIntro = <button className="close" onClick={this.edit_intro_toggle}>&times;</button>;


        return (

            <Modal isOpen={this.props.modal_edit_intro} toggle={this.edit_intro_toggle} >
                <ModalHeader toggle={this.edit_intro_toggle} close={closeEditIntro}>Edit intro</ModalHeader>
                <ModalBody>

                    <form name={"edit_intro_form"} onSubmit={handleSubmit(this.editIntro.bind(this))} >
                {/*     <input type="file" name="images" onChange={this.onChangeimages} />
                                                       Image
                        <Field
                            name="photo"
                            type="file"
                            component={this.renderField}
                        /> */}

                        First Name
                        <Field
                            placeholder={firstName}
                            name="firstName"
                            type="text"
                            component={this.renderField}
                        />

                        Last Name
                        <Field
                            placeholder={lastName}
                            name="lastName"
                            type="text"
                            component={this.renderField}
                        />

                        Headline
                        <Field
                            placeholder={headline}
                            name="headline"
                            type="text"
                            component={this.renderField}
                        />

                        Current Position
                        <Field
                            placeholder={current_position}
                            name="current_position"
                            type="text"
                            component={this.renderField}
                        />

                        Industry
                        <Field
                            placeholder={industry}
                            name="industry"
                            type="text"
                            component={this.renderField}
                        />

                        Contact Information
                        <Field
                            placeholder={contact}
                            name="contact"
                            type="text"
                            component={this.renderField}
                        />

                        Country/Region
                        <Field
                            placeholder={location}
                            name="location"
                            type="text"
                            component={this.renderField}
                        />
                        {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                        <button type="submit" onClick={this.edit_intro_toggle} className="btn btn-primary">Save</button>
                    </form>
                </ModalBody>
            </Modal>
        )}
}

const mapStateToProps = state => {


    return {
        firstName       : state.reducer_profile.firstName,
        lastName        : state.reducer_profile.lastName,
        headline        : state.reducer_profile.headline,
        location        : state.reducer_profile.location,
        current_position: state.reducer_profile.current_position,
        education       : state.reducer_profile.education,
        experience      : state.reducer_profile.experience,
        industry        : state.reducer_profile.industry,
        modal_edit_intro: state.reducer_profile.modal_edit_intro,
    }
}
const mapDispatchStateToProps = dispatch => {

    return {
        editIntro: (values) => {
            console.log('Editing Intro');
            console.log("Dispatching Action EI");
            axios.put(BACKEND_HOST + '/profile/intro', values)
                .then((response) => {
                    console.log("Response", response.data);
                    dispatch({
                        type: "EDITINTRO", payload: response.data
                    });
                })
        },
        toggleEditIntro: () => {
            dispatch({type: "TOGGLE_EDIT_INTRO"});
        },

    }
}


function validate(values) {

    const errors = {};
    if (!values.school) {
        errors.school = "Enter School";
    }
    return errors;
}


export default reduxForm({
    validate,
    form: "ProfileForm",
    reducer: "ProfileReducer"
})(connect(mapStateToProps, mapDispatchStateToProps)(Profile));