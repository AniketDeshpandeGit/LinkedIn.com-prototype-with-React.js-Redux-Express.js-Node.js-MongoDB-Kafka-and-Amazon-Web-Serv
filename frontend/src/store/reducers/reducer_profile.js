
const initialStore = {
    image: null,
    name: null,
    education: null,
    headline: null,
    experience: null,
    location: null,
    address: null,
    userstate: null,
    city: null,
    zipcode: null,
    current_position: null,
    industry: null,
    contact: null,
    profile_summary: null,
    skills: [],

    education_id: null,
    edit_edu_id: null,
    edit_edu_school: null,
    edit_edu_degree: null,
    edit_edu_field: null,
    edit_edu_fromYear: null,
    edit_edu_toYear: null,
    edit_exp_id: null,
    edit_exp_title: null,
    edit_exp_company: null,
    edit_exp_location: null,
    edit_exp_fromYear: null,
    edit_exp_toYear: null,
    edit_exp_fromMonth: null,
    edit_exp_toMonth: null,

    modal_contact: false,
    modal_add_education: false,
    modal_add_experience: false,
    modal_edit_intro: false,
    modal_edit_education: false,
    modal_edit_experience: false,
    modal_add_skills: false,

    skill_prop: "",
    skills_temp: [],
    skills_updated: false,
    updated: false,

    uploadedImage: null,
    uploadedResume: null
}

const reducer_profile = (state = initialStore, action) => {

    if (action.type === "GETPROFILE" && action.statusCode == 200) {
        console.log("Enterting Reducer_Profile");
        console.log(action.payload);
        var image;
        if (action.payload.image)
            image = action.payload.image
        else
            image = state.image
        return {
            ...state,
            image: image,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            education: action.payload.education,
            headline: action.payload.headline,
            experience: action.payload.experience,
            location: action.payload.location,
            address: action.payload.address,
            city: action.payload.city,
            userstate: action.payload.userstate,
            zipcode: action.payload.zipcode,
            current_position: action.payload.current_position,
            industry: action.payload.industry,
            contact: action.payload.contact,
            profile_summary: action.payload.profile_summary,
            skills: action.payload.skills,
            updated: false

        }
    }

    if (action.type === "GETPROFILE_EXPERIENCE" && action.statusCode == 200) {
        console.log(action.payload.experience);
        return {
            ...state,
            experience: action.payload.experience,
            updated: false
        }
    }

    if (action.type === "GETPROFILE_EDUCATION" && action.statusCode == 200) {

        return {
            ...state,
            education: action.payload.education,
            updated: false
        }
    }

    if (action.type === "GETPROFILE_SKILLS" && action.statusCode == 200) {

        return {
            ...state,
            skills: action.payload.skills,
            updated: false
        }
    }

    if (action.type === "ADDEDUCATION" && action.payload == "Updated") {
        console.log("Updating State");
        return {
            ...state,
            updated: true

        }
    }

    if (action.type === "ADDEXPERIENCE" && action.payload == "Updated") {
        console.log("Updating State");
        return {
            ...state,
            updated: true

        }
    }


    if (action.type === "EDITINTRO" && action.payload.updated == true) {
        var image, firstName, lastName, headline, location, address, city, userstate, zipcode, current_position, industry, contact, profile_summary;
        //  if(action.payload.image)
        //     image = action.payload.image; 
        if (action.payload.firstName)
            firstName = action.payload.firstName;
        else
            firstName = state.firstName;

        if (action.payload.lastName)
            lastName = action.payload.lastName;
        else
            lastName = state.lastName;

        if (action.payload.headline)
            headline = action.payload.headline;
        else
            headline = state.headline;

        if (action.payload.location)
            location = action.payload.location;
        else
            location = state.location;

        if (action.payload.address)
            address = action.payload.address;
        else
            address = state.address;
        if (action.payload.city)
            city = action.payload.city;
        else
            city = state.city;
        if (action.payload.userstate)
            userstate = action.payload.userstate;
        else
            userstate = state.userstate;
        if (action.payload.zipcode)
            zipcode = action.payload.zipcode;
        else
            zipcode = state.zipcode;
        if (action.payload.current_position)
            current_position = action.payload.current_position;
        else
            current_position = state.current_position;

        if (action.payload.industry)
            industry = action.payload.industry;
        else
            industry = state.industry;

        if (action.payload.contact)
            contact = action.payload.contact;
        else
            contact = state.contact;

        if (action.payload.profile_summary)
            profile_summary = action.payload.profile_summary;
        else
            profile_summary = state.profile_summary;
        return {
            ...state,
            //   image : image, 
            firstName: firstName,
            lastName: lastName,
            headline: headline,
            location: location,
            current_position: current_position,
            industry: industry,
            address : address, 
            city : city, 
            userstate : userstate, 
            zipcode : zipcode,
            contact: contact,
            profile_summary: profile_summary
        }
    }


    if (action.type === "EDITEDUCATION" && action.payload == "Updated") {
        return {
            ...state,
            updated: true
        }
        /* var school, degree, field, fromYear, toYear;
         if (action.payload.school)
             school = action.payload.school;
         else
             school = state.school;
 
         if (action.payload.degree)
             degree = action.payload.degree;
         else
             degree = state.degree;
 
         if (action.payload.field)
             field = action.payload.field;
         else
             field = state.field;
 
         if (action.payload.fromYear)
             fromYear = action.payload.fromYear;
         else
             fromYear = state.fromYear;
 
         if (action.payload.toYear)
             toYear = action.payload.toYear;
         else
             toYear = state.toYear;
 
         return {
             ...state,
             school: school,
             degree: degree,
             field: field,
             fromYear: fromYear,
             toYear: toYear
         }*/
    }


    if (action.type === "EDITEXPERIENCE" && action.payload == "Updated") {
        return {
            ...state,
            updated: true
        }
    }

    if (action.type === "DELETE_EDUCATION" && action.payload == "Deleted") {
        return {
            ...state,
            updated: true
        }
    }
    if (action.type === "DELETE_EXPERIENCE" && action.payload == "Deleted") {
        return {
            ...state,
            updated: true
        }
    }
    if (action.type === "POSTPROFILE" && action.payload == "Updated") {

        return {
            ...state,
            updated: true

        }
    }

    if (action.type === "EDITEDUCATION_ID") {

        return {
            ...state,
            education_id: action.payload
        }
    }


    if (action.type === "EDITEDUCATION_VALUES") {
        console.log("Setting State");
        console.log(action.payload);
        console.log(action.payload.toYear);

        return {
            ...state,
            edit_edu_id: action.payload._id,
            edit_edu_school: action.payload.school,
            edit_edu_degree: action.payload.degree,
            edit_edu_field: action.payload.field,
            edit_edu_fromYear: action.payload.fromYear,
            edit_edu_toYear: action.payload.toYear
        }
    }
    if (action.type === "EDITEXPERIENCE_VALUES") {
        console.log("Setting State");
        console.log(action.payload);
        console.log(action.payload.toYear);

        return {
            ...state,
            edit_exp_id: action.payload._id,
            edit_exp_title: action.payload.title,
            edit_exp_location: action.payload.location,
            edit_exp_fromMonth: action.payload.edit_exp_fromMonth,
            edit_exp_fromYear: action.payload.fromYear,
            edit_exp_toMonth: action.payload.toMonth,
            edit_exp_toYear: action.payload.toYear
        }
    }
    if (action.type === "RESETUPDATED") {

        return {
            ...state,
            updated: false
        }
    }



    if (action.type === "TOGGLE_CONTACT") {
        return {
            ...state,
            modal_contact: !state.modal_contact
        }
    }

    if (action.type === "TOGGLE_ADD_EDUCATION") {
        return {
            ...state,
            modal_add_education: !state.modal_add_education
        }
    }

    if (action.type === "TOGGLE_ADD_EXPERIENCE") {
        return {
            ...state,
            modal_add_experience: !state.modal_add_experience
        }
    }
    if (action.type === "TOGGLE_ADD_SKILLS") {
        return {
            ...state,
            modal_add_skills: !state.modal_add_skills
        }
    }


    if (action.type === "TOGGLE_EDIT_INTRO") {
        return {
            ...state,
            modal_edit_intro: !state.modal_edit_intro
        }
    }

    if (action.type === "TOGGLE_EDIT_EDUCATION") {
        return {
            ...state,
            modal_edit_education: !state.modal_edit_education
        }
    }


    if (action.type === "TOGGLE_EDIT_EXPERIENCE") {
        return {
            ...state,
            modal_edit_experience: !state.modal_edit_experience
        }
    }

    if (action.type === "UPLOADIMAGE") {

        return {
            ...state,
            uploadedImage: action.payload

        }
    }

    if (action.type === "ADDSKILLTOPROP") {

        return {
            ...state,
            skill_prop: action.payload,
            skills_updated: false

        }
    }


    if (action.type === "ADDSKILLTOTEMP") {
        var skills_add = state.skills_temp;
        skills_add.push(action.payload);
        console.log("ADDSKILLTOTEMP", skills_add);
        var test = [""];
        test.push(action.payload);
        test.push(state.skills_temp);
        console.log(test);
        return {
            ...state,
            skills_temp: skills_add,
            skills_updated: true
        }
    }

    if (action.type === "ADDSKILLS") {

        return {
            ...state,
            skills_temp: skills_add,
            skills_updated: true
        }
    }


    if (action.type === "UPLOADIMAGE") {

        return {
            ...state,
            uploadedImage: action.payload,
        }
    }


    if (action.type === "EDITPHOTO") {

        return {
            ...state,
            image: action.payload.image
        }
    }

    if (action.type === "UPLOADRESUME") {

        return {
            ...state,
            uploadedResume: action.payload,
        }
    }

    return state;
}

export default reducer_profile;