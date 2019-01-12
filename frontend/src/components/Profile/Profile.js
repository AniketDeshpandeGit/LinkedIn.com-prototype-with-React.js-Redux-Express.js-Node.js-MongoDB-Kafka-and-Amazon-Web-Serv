import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BACKEND_HOST } from '../../store/actions/host_config';
import NavBar from '../NavBar/NavBar';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.contact_toggle         = this.contact_toggle.bind(this);
        this.add_education_toggle = this.add_education_toggle.bind(this);
        this.add_experience_toggle = this.add_experience_toggle.bind(this);
        this.add_skills_toggle = this.add_skills_toggle.bind(this);
        this.edit_intro_toggle = this.edit_intro_toggle.bind(this);
        this.edit_education_toggle = this.edit_education_toggle.bind(this);
        this.edit_experience_toggle = this.edit_experience_toggle.bind(this);
        this.editEducation = this.editEducation.bind(this);
        this.editExperience = this.editExperience.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.onChangeresume =this.onChangeresume.bind(this);
        this.submitResume  = this.submitResume.bind(this);

    }

    componentWillMount() {
        this.props.getprofile(this.props.email);
      
    }
    onChangeimages = (e) => {
        this.props.uploadimages(e.target.files);
    }


    onChangeresume = (e) => {
        e.preventDefault();
        this.props.uploadresume(e.target.files);
    }


    submitResume = (e) => {
        e.preventDefault();

        var resume = this.props.uploadedResume;
        let formData = new FormData();

        for (var i = 0; i < resume.length; i++) {
            formData.append("resume", resume[i]);
        }

        axios.post(BACKEND_HOST + '/uploadresume/' + this.props.email, formData);
    }

    contact_toggle() {
        this.props.toggleContact();
    }


    add_education_toggle() {
        this.props.toggleAddEducation();
    }
    add_experience_toggle() {
        this.props.toggleAddExperience();
    }

    add_skills_toggle() {
        this.props.toggleAddSkills();
    }

    edit_intro_toggle() {
        
        this.props.toggleEditIntro();
    }

    editIntro (values) {
       // values.preventDefault();
       this.props.toggleEditIntro();
        var image = this.props.uploadedImage;
        let formData = new FormData();
        if (image != null) {
            for (var i = 0; i < image.length; i++) {
                formData.append("images[]", image[i]);
            }

        }
        const data = {
            username: this.props.email,
            formData: formData,
            values: values
        }
        this.props.editPhoto(data);
        this.props.editIntro(data);
    }

    edit_education_toggle(selected) {
        var education = "";
        if (selected.target.name === "edit") {

            if (selected.target.value !== "" && selected.target.value !== null)
                education = JSON.parse(selected.target.value);

            this.props.editEduValues(education);
        }

        if (selected.target.name === "delete") {
            const data = {
                id: selected.target.id,
                username: this.props.email //this.props.email 
            }
            this.props.deleteEducation(data);
        }

        this.props.toggleEditEducation();
    }

    edit_experience_toggle(selected) {
        console.log("Toggle Experience Modal");
        var experience = "";
        if (selected.target.name === "edit") {
            if (selected.target.value !== "" && selected.target.value !== null) {
                experience = JSON.parse(selected.target.value);
            }
            this.props.editExpValues(experience);
        }

        if (selected.target.name === "delete") {
            const data = {
                id: selected.target.id,
                username: this.props.email //this.props.email
            }
            this.props.deleteExperience(data);

        }
        this.props.toggleEditExperience();
    }

    deleteSkill = (e) => {
        e.preventDefault();
        const data = {
            username: this.props.email, //this.props.email
            skill: e.target.value
        }
        this.props.deleteSkill(data);
    }
    addEducation(values) {
        values.username = this.props.email;
        this.props.addEducation(values);
    }

    addExperience(values) {
        values.username = this.props.email;
        this.props.addExperience(values);
    }

    addSkills(values) {
        values.username = this.props.email;
        this.props.addSkills(values);
    }


    editEducation = (values) => {
        values.preventDefault();
        const data = {
            id: this.props.edit_edu_id,
            username: this.props.email
        }
        if (values.target.school.value !== "")
            data['school'] = values.target.school.value;
        if (values.target.degree.value !== "")
            data['degree'] = values.target.degree.value;
        if (values.target.field.value !== "")
            data['field'] = values.target.field.value;
        if (values.target.fromYear.value !== "")
            data['fromYear'] = values.target.fromYear.value;
        if (values.target.toYear.value !== "")
            data['toYear'] = values.target.toYear.value;

        this.props.editEducation(data);
    }

    editExperience = (values) => {
        values.preventDefault();
        const data = {
            id: this.props.edit_exp_id,
            username: this.props.email /*this.props.email*/
        }
        if (values.target.title.value !== "")
            data['title'] = values.target.title.value;
        if (values.target.company.value !== "")
            data['company'] = values.target.company.value;
        if (values.target.location.value !== "")
            data['location'] = values.target.location.value;
        if (values.target.fromMonth.value !== "")
            data['fromMonth'] = values.target.fromMonth.value;
        if (values.target.toMonth.value !== "")
            data['toMonth'] = values.target.toMonth.value;
        if (values.target.fromYear.value !== "")
            data['fromYear'] = values.target.fromYear.value;
        if (values.target.toYear.value !== "")
            data['toYear'] = values.target.toYear.value;
        this.props.editExperience(data);
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" pattern = {field.pattern} initialValue={field.initialValue} hidden={field.hidden} label={field.label}  value="" placeholder={field.placeholder} type={field.type} onChange={field.onChange} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    } city

    render() {
        let redirectNotLoggedIn = null;
        if (this.props.token === "")
            redirectNotLoggedIn = <Redirect to="/" />;

        const { handleSubmit } = this.props;
        const closeEditEducation = <button className="close" onClick={this.edit_education_toggle}>&times;</button>;
        const closeEditExperience = <button className="close" onClick={this.edit_experience_toggle}>&times;</button>;

        var firstName, lastName, headline, location, education, experience, contact, current_position, industry, profile_summary, skills, address, city, userstate, zipcode;

        var imageView = null;

        if (this.props.image)
            imageView = 'data:image/jpg;base64, ' + this.props.image;

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

        if (this.props.city)
            city = this.props.city;
        else
            city = "";
        if (this.props.address)
            address = this.props.address;
        else
            address = "";
        if (this.props.userstate)
            userstate = this.props.userstate;
        else
            userstate = "";
        if (this.props.zipcode)
            zipcode = this.props.zipcode;
        else
            zipcode = "";
        if (this.props.profile_summary)
            profile_summary = this.props.profile_summary;
        else
            profile_summary = "";

        if (this.props.skills) {
            skills = this.props.skills.map(user_skill => {
                return (
                    <div>
                        <div className="row">
                            <div className="col-sm-10">
                                <p><b>{user_skill}</b></p>
                            </div>
                            <div className="col-sm-2">
                                <p> <button className="btn btn-link" value={user_skill} onClick={this.deleteSkill}>Delete</button>  </p>
                            </div>
                        </div>
                    </div>
                )
            })

        }
        else
            skills = "";
        if (this.props.education) {
            education = this.props.education.map(user_education => {

                const EditEducationButton = <button id={user_education._id} name="edit" value={JSON.stringify(user_education)} className="btn btn-link float-right" onClick={this.edit_education_toggle}>Edit</button>;
                return (
                    <div>
                        <div className="row">
                            <div className="col-sm-11">
                                <h6><b>{user_education.school}</b></h6>
                                <h6>{user_education.degree}, {user_education.field}</h6>
                                <h6>{user_education.fromYear} - {user_education.toYear}</h6>
                            </div>
                            <div className="col-sm-1">
                                <h5>{EditEducationButton}</h5>

                            </div>
                        </div>
                    </div>
                )
            })
        }
        else
            education = "";

        if (this.props.experience) {
            experience = this.props.experience.map(user_experience => {
                const EditExperienceButton = <button id={user_experience._id} name="edit" value={JSON.stringify(user_experience)} className="btn btn-link float-right" onClick={this.edit_experience_toggle}>Edit</button>;

                return (
                    <div>
                        <div className="row">
                            <div className="col-sm-11">
                                <h6><b>{user_experience.title}</b></h6>
                                <h6>{user_experience.company}</h6>
                                <h6>{user_experience.fromMonth} {user_experience.fromYear}  - {user_experience.toMonth} {user_experience.toYear}</h6>
                                <h6>{user_experience.location}</h6>
                            </div>
                            <div className="col-sm-1">
                                <h5>{EditExperienceButton}</h5>

                            </div>
                        </div>
                    </div>)
            })
        }

        else
            experience = "";
        if (this.props.contact)
            contact = this.props.contact;
        else
            contact = "";

        if (this.props.current_position)
            current_position = this.props.current_position;
        else
            current_position = "";

        if (this.props.industry)
            industry = this.props.industry;
        else
            industry = "";

        const closeAddEducation = <button className="close" onClick={this.add_education_toggle}>&times;</button>;
        const closeAddExperience = <button className="close" onClick={this.add_experience_toggle}>&times;</button>;
        const closeAddSkills = <button className="close" onClick={this.add_skills_toggle}>&times;</button>;

        const addEducationButton = <button className="btn btn-link float-right" onClick={this.add_education_toggle}>+</button>;
        const addExperienceButton = <button className="btn btn-link float-right" onClick={this.add_experience_toggle}>+</button>;
        const addSkillsButton = <button className="btn btn-link float-right" onClick={this.add_skills_toggle}>+</button>;


        const EditIntroButton = <button className="btn btn-link float-right" onClick={this.edit_intro_toggle}>Edit</button>;
        const closeEditIntro = <button className="close" onClick={this.edit_intro_toggle}>&times;</button>;

        var redirectVar = null, redirectModal = null;

        if (this.props.updated) {
            redirectVar = <Redirect to="/profile" />
        }

        if (this.props.modal_contact)
            redirectModal = <Redirect to="/profile/contact-information" />

        else if (this.props.modal_add_skills)
            redirectModal = <Redirect to="/profile/add-skills" />
        else
            redirectModal = <Redirect to="/profile" />

        return (
            <div>
                {redirectNotLoggedIn}
                {<NavBar />}

                <div className="container">

                    <div className="main-div">
                        <div className="panel">
                            <div className="bordered-div">
                                <div className="row">
                                    <img width={'200em'} height={'200em'} src={imageView} />
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <h5><b>{this.props.firstName} {" "} {this.props.lastName}</b></h5>
                                        <h6>{headline}</h6>
                                        <h6>{location}</h6>
                                        <h6>{address} {" "}{city}{" "} {userstate}{" "} {zipcode}</h6>
                                        <h6>{current_position}</h6>
                                        <h6>{industry}</h6>
                                    </div>

                                    <div className="col-sm-4">
                                    </div>

                                    <div className="col-sm-4">
                                        <div>
                                            <h5>{EditIntroButton}</h5>
                                            <Modal isOpen={this.props.modal_edit_intro} toggle={this.edit_intro_toggle} >
                                                <ModalHeader toggle={this.edit_intro_toggle} close={closeEditIntro}>Edit intro</ModalHeader>
                                                <ModalBody>

                                                    <form name={"edit_intro_form"} enctype="multipart/form-data" onSubmit={handleSubmit(this.editIntro.bind(this))} >
                                                        <div>
                                                            Upload Profile Photo
                                                    <input type="file" multiple name="images" onChange={this.onChangeimages} />
                                                        </div>

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

                                                        Location
                                                        <Field
                                                            placeholder={location}
                                                            name="location"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                         Address
                                                        <Field
                                                            placeholder={address}
                                                            name="address"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                         City
                                                        <Field
                                                            placeholder={city}
                                                            name="city"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                         State
                                                        <Field
                                                            placeholder={userstate}
                                                            name="userstate"
                                                            type="text"
                                                            component={this.renderField}
                                                        />
                                                         Zip Code
                                                        <Field
                                                            placeholder={zipcode}
                                                            name="zipcode"
                                                            type="text"
                                                          
                                                         pattern = {'^[0-9]{5}(?:-[0-9]{4})?$'}
                                                          component={this.renderField}
                                                        />
                                                        Profile Summary
                                                        <Field
                                                            placeholder={profile_summary}
                                                            name="profile_summary"
                                                            type="textarea"
                                                            component={this.renderField}
                                                        />
                                                        {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                                                        <button type="submit" /*onClick={this.edit_intro_toggle}*/ className="btn btn-primary">Save</button>
                                                    </form>
                                                </ModalBody>

                                            </Modal>
                                        </div>
                                        <div>
                                            <input className="float-right btn btn-link" onClick={this.contact_toggle} value="See contact info"></input>
                                            {redirectModal}
                                        </div>
                                        <div>
                                            <input className="float-right btn btn-link" /*onClick={this.toggle}*/ value="See connections"></input>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        {this.props.profile_summary}
                                    </div>
                                </div>

                            </div>

                            <div className="bordered-div">
                                {redirectVar}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h5>Experience</h5>
                                    </div>
                                    <div className="col-sm-6">
                                        <h5>{addExperienceButton}</h5>
                                        <Modal isOpen={this.props.modal_add_experience} toggle={this.add_experience_toggle} >
                                            <ModalHeader toggle={this.add_experience_toggle} close={closeAddExperience}>Add Experience</ModalHeader>
                                            <ModalBody>

                                                <form name={"add_experience_form"} onSubmit={handleSubmit(this.addExperience.bind(this))} >
                                                    Title
                                                        <Field
                                                        name="title"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    Company
                                                        <Field
                                                        name="company"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    Location
                                                        <Field
                                                        name="location"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    From
                                                        <Field
                                                        placeholder="Month"
                                                        name="fromMonth"
                                                        type="text"
                                                        component={this.renderField}
                                                    />

                                                    <Field
                                                        placeholder="Year"
                                                        name="fromYear"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    To
                                                        <Field
                                                        placeholder="Month"
                                                        name="toMonth"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    <Field
                                                        placeholder="Year"
                                                        name="toYear"
                                                        type="text"
                                                        component={this.renderField}
                                                    />

                                                    {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                                                    <button type="submit" onClick={this.add_experience_toggle} className="btn btn-primary">Save</button>
                                                </form>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>
                                <div>{experience}</div>

                                <Modal isOpen={this.props.modal_edit_experience} toggle={this.edit_experience_toggle} >
                                    <ModalHeader toggle={this.edit_experience_toggle} close={closeEditExperience}>Edit experience</ModalHeader>
                                    <ModalBody>

                                        <form id={this.props.edit_exp_id} name={"edit_experience_form"} onSubmit={this.editExperience.bind(this)} >
                                            Title
                                                <Field
                                                placeholder={this.props.edit_exp_title}
                                                name="title"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            Company
                                                <Field
                                                placeholder={this.props.edit_exp_company}
                                                name="company"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            Location
                                                <Field
                                                placeholder={this.props.edit_exp_location}
                                                name="location"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            From
                                                <Field
                                                placeholder={this.props.edit_exp_fromMonth}
                                                name="fromMonth"
                                                type="text"
                                                component={this.renderField}
                                            />


                                            <Field
                                                placeholder={this.props.edit_exp_fromYear}
                                                name="fromYear"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            To
                                                <Field
                                                placeholder={this.props.edit_exp_toMonth}
                                                name="toMonth"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            <Field
                                                placeholder={this.props.edit_exp_toYear}
                                                name="toYear"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            <button type="button" id={this.props.edit_exp_id} name="delete" onClick={this.edit_experience_toggle} className="btn btn-primary">Delete</button>
                                            <button type="submit" name="save" onClick={this.edit_experience_toggle} className="float-right btn btn-primary">Save</button>
                                        </form>
                                    </ModalBody>
                                </Modal>
                            </div>

                            <div className="bordered-div">
                                {redirectVar}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h5>Education</h5>
                                    </div>

                                    <div className="col-sm-6">
                                        <h5>{addEducationButton}</h5>
                                        <Modal isOpen={this.props.modal_add_education} toggle={this.add_education_toggle} >
                                            <ModalHeader toggle={this.add_education_toggle} close={closeAddEducation}>Add Education</ModalHeader>
                                            <ModalBody>

                                                <form name={"add_education_form"} onSubmit={handleSubmit(this.addEducation.bind(this))} >
                                                    School
                                                        <Field
                                                        name="school"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    Degree
                                                        <Field
                                                        name="degree"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    Field of Study
                                                        <Field
                                                        name="field"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    From Year
                                                        <Field
                                                        name="fromYear"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                    To Year
                                                        <Field
                                                        name="toYear"
                                                        type="text"
                                                        component={this.renderField}
                                                    />

                                                    {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                                                    <button type="submit" onClick={this.add_education_toggle} className="btn btn-primary">Save</button>
                                                </form>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>

                                <div>{education}</div>

                                <Modal isOpen={this.props.modal_edit_education} toggle={this.edit_education_toggle} >
                                    <ModalHeader toggle={this.edit_education_toggle} close={closeEditEducation}>Edit education</ModalHeader>
                                    <ModalBody>

                                        <form id={this.props.edit_edu_id} name={"edit_education_form"} onSubmit={this.editEducation.bind(this)} >
                                            School
                                                <Field
                                                placeholder={this.props.edit_edu_school}
                                                name="school"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            Degree
                                                <Field
                                                placeholder={this.props.edit_edu_degree}
                                                name="degree"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            Field
                                                <Field
                                                placeholder={this.props.edit_edu_field}
                                                name="field"
                                                type="text"
                                                component={this.renderField}
                                            />
                                            fromYear
                                                <Field
                                                placeholder={this.props.edit_edu_fromYear}
                                                name="fromYear"
                                                type="text"
                                                component={this.renderField}
                                            />

                                            toYear
                                                <Field
                                                placeholder={this.props.edit_edu_toYear}
                                                name="toYear"
                                                type="text"
                                                component={this.renderField}
                                            />

                                            <button type="button" id={this.props.edit_edu_id} name="delete" onClick={this.edit_education_toggle} className="btn btn-primary">Delete</button>

                                            <button type="submit" name="save" onClick={this.edit_education_toggle} className="float-right btn btn-primary">Save</button>
                                        </form>
                                    </ModalBody>
                                </Modal>
                            </div>
                        </div>
                        <div className="bordered-div">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h5>Skills</h5>
                                </div>
                                <div className="col-sm-6">
                                    <h5>{addSkillsButton}</h5>
                                    {redirectModal}

                                </div>
                            </div>
                            <div>{skills}</div>
                        </div>
                    </div>

                    <div className="bordered-div">
                        <h5>Add Resume</h5>
                        <form onSubmit={this.submitResume}>
                            <input type="file" multiple name="resume" onChange={this.onChangeresume} />
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>

                </div>

            </div >

        );
    }
}


const mapStateToProps = state => {
    return {
        email: state.user.user.email,
        user_type       : state.user.user_type,
         name            : state.user.name,
         token           : state.user.token,

        image: state.reducer_profile.image,
        firstName: state.reducer_profile.firstName,
        lastName: state.reducer_profile.lastName,
        headline: state.reducer_profile.headline,
        location: state.reducer_profile.location,
        current_position: state.reducer_profile.current_position,
        education: state.reducer_profile.education,
        experience: state.reducer_profile.experience,
        industry: state.reducer_profile.industry,
        address: state.reducer_profile.address,
        city: state.reducer_profile.city,
        userstate: state.reducer_profile.userstate,
        zipcode: state.reducer_profile.zipcode,
        contact: state.reducer_profile.contact,
        profile_summary: state.reducer_profile.profile_summary,
        education_id: state.reducer_profile.education_id,
        skills: state.reducer_profile.skills,
        updated: state.reducer_profile.updated,

        edit_edu_id: state.reducer_profile.edit_edu_id,
        edit_edu_school: state.reducer_profile.edit_edu_school,
        edit_edu_degree: state.reducer_profile.edit_edu_degree,
        edit_edu_field: state.reducer_profile.edit_edu_field,
        edit_edu_fromYear: state.reducer_profile.edit_edu_fromYear,
        edit_edu_toYear: state.reducer_profile.edit_edu_toYear,


        edit_exp_id: state.reducer_profile.edit_exp_id,
        edit_exp_title: state.reducer_profile.edit_exp_title,
        edit_exp_company: state.reducer_profile.edit_exp_company,
        edit_exp_location: state.reducer_profile.edit_exp_location,
        edit_exp_fromYear: state.reducer_profile.edit_exp_fromYear,
        edit_exp_toYear: state.reducer_profile.edit_exp_toYear,
        edit_exp_fromMonth: state.reducer_profile.edit_exp_fromMonth,
        edit_exp_toMonth: state.reducer_profile.edit_exp_Month,

        modal_contact: state.reducer_profile.modal_contact,
        modal_add_education: state.reducer_profile.modal_add_education,
        modal_add_experience: state.reducer_profile.modal_add_experience,
        modal_add_skills: state.reducer_profile.modal_add_skills,
        modal_edit_intro: state.reducer_profile.modal_edit_intro,
        modal_edit_education: state.reducer_profile.modal_edit_education,
        modal_edit_experience: state.reducer_profile.modal_edit_experience,

        uploadedImage: state.reducer_profile.uploadedImage,
        uploadedResume: state.reducer_profile.uploadedResume,

        validstateabr : state.reducer_profile.validstateabr,
        validstatenames : state.reducer_profile.validstatenames

    }
}
const mapDispatchStateToProps = dispatch => {

    return {

        getprofile: (username) => {
            axios.get(BACKEND_HOST + '/profile/' + username/*, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } }*/)
                .then((response) => {
                    console.log("Response: ", response);
                    dispatch({ type: "GETPROFILE", payload: response.data, statusCode: response.status })
                })
        },

        addEducation: (values) => {
            axios.post(BACKEND_HOST + '/profile/education', values)
                .then((response) => {
                    console.log("Dispacting ADDEDUCATION");
                    dispatch({ type: "ADDEDUCATION", payload: response.data });
                })

            axios.get(BACKEND_HOST + '/profile/education/' + values.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EDUCATION", payload: response.data, statusCode: response.status })
                })

        },

        addExperience: (values) => {
            axios.post(BACKEND_HOST + '/profile/experience', values)
                .then((response) => {
                    dispatch({ type: "ADDEXPERIENCE", payload: response.data });

                })
            axios.get(BACKEND_HOST + '/profile/experience/' + values.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EXPERIENCE", payload: response.data, statusCode: response.status })
                })
        },


        addSkills: (values) => {
            axios.post(BACKEND_HOST + '/profile/skills', values)
                .then((response) => {
                    dispatch({ type: "ADDSKILLS", payload: response.data });

                })
            axios.get(BACKEND_HOST + '/profile/skills/' + values.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_SKILLS", payload: response.data, statusCode: response.status })
                })
        },

        editEducation: (values) => {
            axios.put(BACKEND_HOST + '/profile/education', values)
                .then((response) => {
                    dispatch({
                        type: "EDITEDUCATION", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/education/' + values.username, { headers: { authorization: "Bearer" + localStorage.getItem("jwt_token") } })
                .then((response) => {
                    dispatch({ type: "GETPROFILE_EDUCATION", payload: response.data, statusCode: response.status });
                })
        },

        editEducationID: (value) => {
            dispatch({
                type: "EDITEDUCATION_ID", payload: value
            });

        },
        editEduValues: (values) => {
            dispatch({
                type: "EDITEDUCATION_VALUES", payload: values
            });
        },

        editExperience: (values) => {

            console.log('Editing Experience');

            axios.put(BACKEND_HOST + '/profile/experience', values)
                .then((response) => {
                    dispatch({

                        type: "EDITEXPERIENCE", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/experience/' + values.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
                .then((response) => {
                    dispatch({ type: "GETPROFILE_EXPERIENCE", payload: response.data, statusCode: response.status })
                });
        },

        editExpValues: (values) => {
            dispatch({
                type: "EDITEXPERIENCE_VALUES", payload: values
            });
        },

        deleteEducation: (value) => {
            axios.delete(BACKEND_HOST + '/profile/education', { data: value })
                .then((response) => {
                    dispatch({
                        type: "DELETE_EDUCATION", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/education/' + value.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EDUCATION", payload: response.data, statusCode: response.status })
                })
        },

        deleteExperience: (value) => {
            console.log(value);
            axios.delete(BACKEND_HOST + '/profile/experience', { data: value })
                .then((response) => {
                    dispatch({
                        type: "DELETE_EDUCATION", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/experience/' + value.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_EXPERIENCE", payload: response.data, statusCode: response.status })
                })
        },
        toggleContact: () => {
            dispatch({ type: "TOGGLE_CONTACT" });
        },
        toggleEditIntro: () => {
            dispatch({ type: "TOGGLE_EDIT_INTRO" });
        },

        toggleAddEducation: () => {
            dispatch({ type: "TOGGLE_ADD_EDUCATION" });
        },

        toggleEditEducation: () => {
            dispatch({ type: "TOGGLE_EDIT_EDUCATION" });
        },

        toggleAddExperience: () => {
            dispatch({ type: "TOGGLE_ADD_EXPERIENCE" });
        },
        toggleEditExperience: () => {
            dispatch({ type: "TOGGLE_EDIT_EXPERIENCE" });
        },

        toggleAddSkills: () => {
            dispatch({ type: "TOGGLE_ADD_SKILLS" });
        },


        editIntro: (data) => {
            console.log('Editing Intro');

            axios.put(BACKEND_HOST + '/profile/intro/' + data.username, data.values)
                .then((response) => {
                    console.log("Response", response.data);
                    dispatch({
                        type: "EDITINTRO", payload: response.data
                    });
                })
        },


        addSkillToProp: (values) => {
            values.preventDefault();
            console.log("Adding To Prop: ", values.target.value);
            dispatch({ type: "ADDSKILLTOPROP", payload: values.target.value })
        },
        addSkillToTemp: (values) => {
            values.preventDefault();
            console.log("Adding To Temp: ", values.target.value);
            dispatch({ type: "ADDSKILLTOTEMP", payload: values.target.value })
        },
        deleteSkill: (value) => {
            axios.delete(BACKEND_HOST + '/profile/skill', { data: value })
                .then((response) => {
                    dispatch({
                        type: "DELETE_SKILLS", payload: response.data
                    });
                })

            axios.get(BACKEND_HOST + '/profile/skills/' + value.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
                .then((response) => {

                    dispatch({ type: "GETPROFILE_SKILLS", payload: response.data, statusCode: response.status })
                })
        },

        uploadimages: (value) => {
            dispatch({ type: "UPLOADIMAGE", payload: value });
        },
        uploadresume: (value) => {
            dispatch({ type: "UPLOADRESUME", payload: value });
        },

        editPhoto: (value) => {
            axios.post(BACKEND_HOST + '/uploadphotos/' + value.username, value.formData)
                .then((response) => {
                    console.log(response);
                    dispatch({ type: "EDITPHOTO", payload: response.data })
                })

        }

    }
}


function validate(values) {

    const errors = {};
    
    var    validstateabr = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
        var validstatenames = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    
     
        if((typeof(values.userstate)!="undefined" && values.userstate!="undefined" && values.userstate!="") && (!validstateabr.includes(values.userstate) && !validstatenames.includes(values.userstate) ))
       {
        errors.userstate = "Please enter correct state name or abbreviation";
       
       }
       
    return errors;
}

export default reduxForm({
    validate,
    form: "ProfileForm",
    reducer: "ProfileReducer"
})(connect(mapStateToProps, mapDispatchStateToProps)(Profile));