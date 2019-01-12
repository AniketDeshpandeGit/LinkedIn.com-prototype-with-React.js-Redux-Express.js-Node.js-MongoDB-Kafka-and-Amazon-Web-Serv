import React, { Component } from "react";
import { BACKEND_HOST } from "../../store/actions/host_config";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Card } from "@material-ui/core";
import ConnCard from "../Cards/ConnCard";
import ConnReqCard from "./ConnReqCard";
import Typography from "@material-ui/core/Typography";
import NavBar from "../NavBar/NavBar";
import { connect } from "react-redux";

class Carddrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authFlag: false,
      cons: 0,
      reqs: 0,
      authFlagConnReq: "",
      authFlagConn: "",
      conn_req_list: [],
      conn_list: []
    };
    this.setStatus = this.setStatus.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlagConnReq: false,
      authFlagConn: false
    });
  }

  setStatus = e => {
    console.log("Status: ", e);

    const updateParams = {
      connectionstatus: e.connectionstatus,
      receiveremail: e.receiveremail,
      senderid: e.senderid
    };

    console.log("finalParams : ", updateParams);

    axios.defaults.withCredentials = true;
    axios
      .get(BACKEND_HOST + "/updateConnection", { params: updateParams })
      //also send counters with axios on a different route
      .then(response => {
        console.log("Status Code : ", response.data);

        if (response.status === 200) {
          //window.location = '/travellerlogin'
        } else {
        }
      });
  };

  componentDidMount() {
    const receiveremail = {
      receiveremail: this.props.email
    };

    let count = 0;
    console.log("Did Mount Axios: ", this.props.email);

    axios.defaults.withCredentials = true;
    axios
      .get(BACKEND_HOST + "/getConns", { params: receiveremail })
      //also send counters with axios on a different route
      .then(response => {
        console.log("Status Code : ", response.data);

        if (response.status === 200) {
          this.setState({
            conn_list: this.state.conn_list.concat(response.data.conn),
            authFlagConn: true
          });
          //window.location = '/travellerlogin'
        } else {
        }
      });

    axios
      .get(BACKEND_HOST + "/getConnsReq", { params: receiveremail })
      //also send counters with axios on a different route
      .then(response => {
        console.log("Status Code final array: ", response.data.connReq);

        console.log("Count: ", count);
        if (response.status === 200) {
          this.setState({
            conn_req_list: this.state.conn_req_list.concat(
              response.data.connReq
            ),
            authFlagConnReq: true
          });
          //window.location = '/travellerlogin'
        } else {
        }
      });

    console.log("cons: ", this.state.cons);
  }

  render() {
    let jobs = null;
    if (this.state.authFlagConn == true) {
      var arrConn = Object.values(this.state.conn_list);
      console.log("arrConn: ", arrConn);

      // console.log(this.state.property_list.length)
      var elementsConn = [];
      // console.log(arr.length)
      var stat = "";
      var count = 0;

      for (var i = 0; i < arrConn.length; i++) {
        stat = arrConn[i].connectionstatus;
        console.log("Conn Status: ", stat);
        if (stat == "Accepted") {
          count++;
          elementsConn.push(
            <ConnCard
              sendername={arrConn[i].sendername}
              senderid={arrConn[i].senderid}
              renderAgain={this.state.renderAgain}
            />
          );
        }

        this.state.cons = count;
      }
    }

    if (this.state.authFlagConnReq == true) {
      var arrConnReq = Object.values(this.state.conn_req_list);
      console.log("arrConnReq: ", arrConnReq);

      // console.log(this.state.property_list.length)
      var elementsConnReq = [];
      // console.log(arr.length)
      var countReqs = 0;
      for (var i = 0; i < arrConnReq.length; i++) {
        if (arrConnReq[i].connectionstatus === "sent") {
          countReqs++;
          elementsConnReq.push(
            <ConnReqCard
              sendername={arrConnReq[i].sendername}
              senderid={arrConnReq[i].senderid}
              receiveremail={arrConnReq[i].receiveremail}
              //connectionstatus={arrConn[i].connectionstatus}
              setStatus={this.setStatus}
              renderAgain={this.state.renderAgain}
            />
          );
        }

        this.state.reqs = countReqs;
      }
    }

    return (
      <div>
        <section class="search-box ">
          <div class="clearfix" />
          <br />

          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 listing-block-connections">
                <Typography gutterBottom variant="h4" color="primary">
                  Connections: {this.state.cons}
                </Typography>
                {elementsConn}
              </div>
              <div class="col-md-6 listing-block-connections">
                {/* <iframe width="100%" height="595" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=15+Springfield+Way,+Hythe+CT21+5SH,+United+Kingdom&t=m&z=14&ll=51.077429,1.121722&output=embed"></iframe>
                 */}
                <Typography gutterBottom variant="h4" color="primary">
                  Connection Requests: {this.state.reqs}
                </Typography>
                {elementsConnReq}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    name: state.user.name,
    email: state.user.email
  };
};

export default connect(mapStatetoProps)(Carddrawer);
