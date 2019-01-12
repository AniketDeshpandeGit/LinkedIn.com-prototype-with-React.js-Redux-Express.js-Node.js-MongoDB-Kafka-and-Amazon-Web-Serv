import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Card } from "@material-ui/core";
import Jobcard from "../Cards/ConnCard";
import ConnReqCard from "./ConnReqCard";
import Typography from "@material-ui/core/Typography";
import NavBar from "../NavBar/NavBar";
import Carddrawer from "./Carddrawer";

class Connections extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       authFlag: false,
  //       cons: 5
  //     };
  //   }

  //   componentWillMount() {
  //     this.setState({
  //       authFlag: false
  //     });
  //   }

  render() {
    return (
      <div>
        <NavBar />
        <div>
          <Carddrawer />
        </div>
      </div>
    );
  }
}

export default Connections;
