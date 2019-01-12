import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { BACKEND_HOST } from '../../store/actions/host_config';


class test extends Component {

    constructor(props) {
        super(props);

        this.state = {
          
        }
      
    }

    componentDidMount(){
  
        console.log("card in test")
        axios.defaults.withCredentials = true;
        axios.get(BACKEND_HOST + '/test',)
            //also send counters with axios on a different route 
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    
                } else {
                    
                }
            });
        
      
      }

    


    render() {
       
        return (

           <div><h1>Test</h1></div>
           

        )
    }
}

export default test;