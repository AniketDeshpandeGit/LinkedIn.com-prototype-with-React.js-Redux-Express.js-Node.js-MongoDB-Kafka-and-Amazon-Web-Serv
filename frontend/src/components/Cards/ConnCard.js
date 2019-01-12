import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import cookie from "react-cookies";
import { TextField, CardActionArea, Icon } from "@material-ui/core";
const styles = theme => ({
  card: {
    display: "flex",

    height: "auto",
    padding: "0.5%",
    maxWidth: "345"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 170,
    width: 170
  },
  controls: {
    display: "flex"
  },
  title: {
    color: " #0077B5"
  }
});

class ConnCard extends Component {
  constructor() {
    super();
    this.state = {
      easy_apply: 1,
      text: "Description of the job title of the comapy andthe job in general "
    };
  }

  componentDidMount() {
    console.log("card in search");
    // console.log(this.props)
  }

  render() {
    //console.log(this.props.props)
    const { classes, theme } = this.props;
    let easyapply = null;
    if ((this.state.easy_apply = 1)) {
      easyapply = "Easy Apply";
    } else {
      easyapply = "Normal Apply";
    }

    return (
      <CardActionArea>
        <Card className={classes.card}>
          {/* <CardMedia
            className={classes.cover}
            image="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501127625/steve-jobs-9781501127625_lg.jpg"
            title="Property"
          /> */}

          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                component="h4"
                variant="h5"
                className={classes.title}
              >
                {this.props.sendername}
                {/* <Icon
                  class="fa fa-thumbs-up"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: 15,
                    top: 15
                  }}
                /> */}
                {/* <i class="fa fa-thumbs-up" aria-hidden="true" style={{justifyContent: 'flex-end'}}></i> */}
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Email: {this.props.senderid}
              </Typography>

              {/* <Typography gutterBottom variant="h5" color="textSecondary">
                Location
              </Typography>

              <Typography variant="h5" color="textSecondary" gutterBottom>
                {`${this.state.text.substring(0, 60)}...`}
              </Typography> */}

              {/* <Typography variant="h5" gutterBottom>
                Connected T hours ago &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <i class="fa fa-linkedin-square" aria-hidden="true" />
                {easyapply}
              </Typography> */}

              {/* <CardActions> */}
                {/* <Typography variant="h6" gutterBottom>
                  Connected T hours ago {this.props.renderAgain}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "} */}
                  {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Message
                  </Button> */}
                {/* </Typography> */}
              {/* </CardActions> */}
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    );
  }
}

ConnCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ConnCard);
