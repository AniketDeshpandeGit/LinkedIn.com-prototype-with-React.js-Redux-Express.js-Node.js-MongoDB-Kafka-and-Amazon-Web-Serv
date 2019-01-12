import React, { Component } from 'react';
import '../../App.css';
// import '../../drawer.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PeopleSearch from '../Search/PeopleSearch';
import ApplicantCard from '../Cards/ApplicantCard';
import PersonProfile from '../Jobopen/ApplicantProfile';
import Navbar from '../NavBar/NavBar';
import { connect } from "react-redux";
import { BACKEND_HOST } from '../../store/actions/host_config';

class PeopleDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applicants: '',
            applicants_list: [],
            tosendapplicantcard: '',
            cardsin: false
        }
      
        this.handleChange = this.handleChange.bind(this);
        this.routeTo = this.routeTo.bind(this);
    }

    componentDidMount() {
        
        axios.defaults.withCredentials = true;
        axios.get(BACKEND_HOST +'/viewapplicants', { params: {email:this.props.email} })
            //also send counters with axios on a different route 
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    this.setState({
                        applicants_list: this.state.applicants_list.concat(response.data.applicants),
                        authFlag: true
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

    routeTo = (e) => {
        console.log("in clicked");

        console.log("hello i am e " + e);
        console.log(this.state.applicants_list[e])
        this.setState({
            tosendapplicantcard: e,
            cardsin: true
        })

    };

    handleClick = (evt) => {
        console.log("in clicked out");
        console.log(this.props);
    }

    render() {

        let peoplelist = null;
        if (this.state.authFlag == true) {
            var arr = Object.values(this.state.applicants_list);
            console.log(arr)

            console.log(this.state.applicants_list.length)
            var elements = [];
            console.log(arr.length)
            for (var i = 0; i < arr.length; i++) {

                elements.push(<ApplicantCard id={i} props={arr[i]} onClick={this.routeTo} />);

            }
        }


        return (

            <div>
                <Navbar/>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">

                    {peoplelist}
                   

                </nav>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 listing-block">
                            {elements}
                        </div>
                        <div class="col-md-6 listing-block">
                            <PersonProfile props={this.state.applicants_list[this.state.tosendapplicantcard]} />
                            {/* {elements} */}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    
    return {
      name: state.user.name,
      email:state.user.email
    };
  };

export default connect(mapStateToProps)( PeopleDrawer);