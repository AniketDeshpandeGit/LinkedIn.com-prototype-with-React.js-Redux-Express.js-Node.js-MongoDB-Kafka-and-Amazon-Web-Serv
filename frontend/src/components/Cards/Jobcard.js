import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Jobopen from '../Jobopen/Jobopen'

//import cookie from 'react-cookies';
import { TextField, CardActionArea, Icon } from '@material-ui/core';
const styles = theme => ({
  card: {
    display: 'flex',

    height:'auto',
    padding:'1%',
    maxWidth:'345',
    
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    
    height: 150,
    width:150
  },
  controls: {
    display: 'flex',
   
   
  },
  title:{
      color:' #0077B5',
  },

 
});


class Jobcard extends Component {
    constructor(){
        super();
        this.state = {
              easy_apply:1,  
              text:"Description of the job title of the comapy andthe job in general ",
        }
        this.routeToJob = this.routeToJob.bind(this);
       
    }
   
componentDidMount(){
  
  console.log("card in search")
 // console.log(this.props)
  console.log(this.props)
  this.setState = {
    easy_apply:this.props.props.easyapply
}
}

  
routeToJob =(e) =>  {
  console.log("in clicked");
 // console.log(this.props);
  this.props.onClick(this.props.id);
};
 
         
  

    render(){
      
     //console.log(this.props.props)
    const { classes, theme } = this.props;
    
    let easyapply = null;
    if(this.props.props.easyapply=="true"){
      easyapply="Easy Apply"
    }
    else
    {
      easyapply="Normal Apply"
    }

  return (
    
    
     <Card className={classes.card} onClick={this.routeToJob}>
     {/* <CardMedia
        className={classes.cover}
        image="https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2017/01/17/apple-logo-rainbow.jpg"
        title="Property"

      /> */}
      
      <div className={classes.details}>
  
        <CardContent className={classes.content}>
      
        
          <Typography gutterBottom component="h3" variant="heading" className={classes.title}>
          {this.props.props.jobtitle}&nbsp;&nbsp;<Icon class="fa fa-thumbs-up" aria-hidden="true" ></Icon>
          {/* <i class="fa fa-thumbs-up" aria-hidden="true" style={{justifyContent: 'flex-end'}}></i> */}
          </Typography>
          <Typography variant="h4" color="black" >
          {this.props.props.company}
         
          </Typography>
        
       
          <Typography gutterBottom variant="h5" color="textSecondary" >
          {this.props.props.address}
          </Typography>
          
          <Typography variant="h5" color="textSecondary" gutterBottom>
          {`${this.props.props.jobdes.substring(0, 60)}...`}
            
          </Typography>

          <Typography  variant="h5" gutterBottom>
           {this.props.props.poststatus} &nbsp; <i class="fa fa-linkedin-square" aria-hidden="true"></i>{easyapply}
          </Typography>
         
      </CardContent>
      
      </div>
     
    </Card> 
   
    
  );

}
}

Jobcard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Jobcard);