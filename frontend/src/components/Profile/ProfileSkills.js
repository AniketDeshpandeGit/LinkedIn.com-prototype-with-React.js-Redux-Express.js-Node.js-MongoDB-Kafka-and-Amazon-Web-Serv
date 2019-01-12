import React, { Component } from 'react';
import '../../App.css';
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {BACKEND_HOST} from '../../store/actions/host_config';
import axios from 'axios';
class ProfileSkills extends Component {

    constructor(props) {
        super(props);
        this.add_skills_toggle = this.add_skills_toggle.bind(this);
        this.addSkills = this.addSkills.bind(this)
    //    this.addSkillToTemp = this.addSkillToTemp.bind(this);
     //   this.addSkillToProp = this.addSkillToProp.bind(this);
    }


    add_skills_toggle() {
        this.props.toggleAddSkills();
    }

    componentDidMount() {
        console.log("Did Mount Profile Skills");
        //     this.props.getprofile("applicant1@mail.com");
    }

   addSkills = (e) =>

   {
       e.preventDefault();
       console.log("Adding Skills");
        
        var skills = this.props.skills_temp;
        console.log(this.props.skill_prop);
        if(!skills.includes(this.props.skill_prop))
        {
            skills.push(this.props.skill_prop);
            console.log(skills);
        }
        const data = {
            username : "applicant1@mail.com" , //this.props.email
            skills : skills
        }

        this.props.addSkills(data);
        this.props.toggleAddSkills();
        this.props.getSkills(data);
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
        console.log("Inside Profile Skills Render");
        const { handleSubmit } = this.props;
        var  skills_temp;
        
        if (this.props.skills_temp) {
           
            skills_temp = this.props.skills_temp.map(skillsToAdd => {
                    console.log(skillsToAdd);
                return (
                    <div>
                 
                        <div className="col-sm-4">
                       
                        {skillsToAdd}
              
                   </div>
                   </div>
                )
            });

        }
        else
            skills_temp = "";
    

        const closeAddSkills = <button className="close" onClick={this.add_skills_toggle}>&times;</button>;
        const addSkillsButton = <button className="btn btn-link float-right" onClick={this.add_skills_toggle}>+</button>;

        return (
            <div>

                <Modal isOpen={this.props.modal_add_skills} toggle={this.add_skills_toggle} >
                    <ModalHeader toggle={this.add_skills_toggle} close={closeAddSkills}>Add Skills</ModalHeader>
                    <ModalBody>

                        <form name={"add_skills_form"} onSubmit={this.addSkills} >
                            <div className="row">
                                <div className="col-sm-4">
                                    <input type="text"  placeholder="Skill" name="skills" onChange={this.props.addSkillToProp}></input>
                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-secondary" value={this.props.skill_prop} onClick={this.props.addSkillToTemp} >Select</button>
                                </div>
                              </div>
                              <div className = "row">
                                {skills_temp}
                            </div>
                            {/* <button onClick= /*{this.submitUpdate} {handleSubmit(this.submitUpdate.bind(this))} className="btn btn-primary">Update</button> */}
                            <button type="submit"/* onClick={this.add_skills_toggle}*/ className="btn btn-primary">Add All</button>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => {

  
    return {
        skill_prop : state.reducer_profile.skill_prop,
        skills_temp : state.reducer_profile.skills_temp,
        modal_add_skills: state.reducer_profile.modal_add_skills,
        skills_updated : state.reducer_profile.skills_updated

    }
}
const mapDispatchStateToProps = dispatch => {

    return {

        toggleAddSkills: () => {
            dispatch({ type: "TOGGLE_ADD_SKILLS" });
        },
        addSkillToProp : (values) =>{
            values.preventDefault();
            console.log("Adding To Prop: ", values.target.value);
            dispatch({type:"ADDSKILLTOPROP",payload: values.target.value})
        },
        addSkillToTemp : (values) =>{
           values.preventDefault();
            console.log("Adding To Temp: ", values.target.value);
            dispatch({type:"ADDSKILLTOTEMP",payload: values.target.value})
        },
        addSkills : (values) =>
        {
            console.log(values);
            axios.post(BACKEND_HOST + '/profile/skills', values);
          
        //    console.log(values);
         //   dispatch({type:"ADDSKILLS", payload: values})

        },

        getSkills : (values) =>
        {
            axios.get(BACKEND_HOST + '/profile/skills/' + values.username, { headers: { authorization: "Bearer " + localStorage.getItem("jwt_token") } })
            .then((response) => {

                dispatch({ type: "GETPROFILE_SKILLS", payload: response.data, statusCode: response.status })
            })
        }

    }
}


export default connect(mapStateToProps, mapDispatchStateToProps)(ProfileSkills);

