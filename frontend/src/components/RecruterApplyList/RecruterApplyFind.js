import React, { Component } from 'react';
import '../../App.css';

import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';

class RecruterApplyFind extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
      
    }

    componentDidMount() {
       console.log("in recruter")
       console.log(this.props)

    }


    

    render() {

        // let peoplelist = null;
        // if (this.state.authFlag == true) {
        //     var arr = Object.values(this.state.person_list);
        //     console.log(arr)

        //     console.log(this.state.person_list.length)
        //     var elements = [];
        //     console.log(arr.length)
        //     for (var i = 0; i < arr.length; i++) {

        //         elements.push(<PeopleCard id={i} props={arr[i]} onClick={this.routeTo} />);

        //     }
        // }


        return (

            <div>
                <NavBar/>
                
              

            </div>
        )
    }
}


export default RecruterApplyFind;