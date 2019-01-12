import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BACKEND_HOST } from '../../store/actions/host_config';

class PeopleSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            personname: '',
            // applicant key get from rajas = ''
            // visit counter = '' ...compodidmount cnt++
            // submit counter = ''
            person_list : [],
        }
        this.searchPerson = this.searchPerson.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchPerson = (e) => {
        const searchperson = {
            personname: this.state.personname
        }

        e.preventDefault();

        console.log("Form Data", searchperson);
        // const url = "https://www.facebook.com/";
        // window.open(url, '_blank');

        axios.defaults.withCredentials = true;
        axios.get(BACKEND_HOST + '/searchpeople',{ params: searchperson})
            //also send counters with axios on a different route 
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    this.setState({
                        person_list : this.state.person_list.concat(response.data) 
                        });
                    //window.location = '/travellerlogin'
                } else {
                    
                }
            });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        const { applyJob, resume, coverletter } = this.props;
        return (

            <nav class="navbar navbar-expand-lg navbar-light bg-light">

                <div class="col">
                    <input type="text" class="form-control" name="PersonName" placeholder="Person Name"
                        value={this.state.personname}
                        onChange={this.handleChange('personname')}
                    />
                </div>

                <button class="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.searchJob}>Search</button>
    
            </nav>

        )
    }
}

export default PeopleSearch;