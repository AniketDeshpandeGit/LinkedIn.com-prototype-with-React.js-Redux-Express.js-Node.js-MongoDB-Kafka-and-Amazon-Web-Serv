import React, { Component } from 'react';
import '../../App.css';
import { connect } from "react-redux";
import _ from "lodash";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ProfileContact extends Component {

    constructor(props) {
        super(props);
        this.contact_toggle = this.contact_toggle.bind(this);
    }

    contact_toggle() {
        this.props.toggleContact();
    }

    componentDidMount() {
        console.log("Did Mount Profile Contact");
       
    }

    componentWillMount() {
        console.log("Did Mount Profile Contact");

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
        console.log("Inside Profile Contact Render");

        var firstName, lastName, contact, email;
        if (this.props.firstName)
            firstName = this.props.firstName;
        else
            firstName = "";

        if (this.props.lastName)
            lastName = this.props.lastName;
        else
            lastName = "";

       if (this.props.contact)
            contact = this.props.contact;
        else
            contact = "";
        if(this.props.email)
            email = this.props.email

        const closeContact = <button className="close" onClick={this.contact_toggle}>&times;</button>;
    

        return (
<div>
    
            <Modal isOpen={this.props.modal_contact} toggle={this.contact_toggle} >
                <ModalHeader toggle={this.contact_toggle} close={closeContact}>{firstName}{" "}{lastName}</ModalHeader>
                <ModalBody>
                    <h6>Contact info</h6>
                    <h6><b>Phone</b></h6>
                    {contact}
                    <h6><b>Email</b></h6>
                    {email}
                </ModalBody>

            </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => {


    return {
        firstName: state.reducer_profile.firstName,
        lastName: state.reducer_profile.lastName,
        email  :state.user.user.email,
        contact: state.reducer_profile.contact,

        
        modal_contact: state.reducer_profile.modal_contact,

    }
}
const mapDispatchStateToProps = dispatch => {

    return {


        toggleContact: () => {
            dispatch({ type: "TOGGLE_CONTACT" });
        },

    }
}


export default connect(mapStateToProps, mapDispatchStateToProps)(ProfileContact);

