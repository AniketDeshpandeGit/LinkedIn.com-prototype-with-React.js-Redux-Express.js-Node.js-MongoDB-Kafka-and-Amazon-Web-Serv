import React, {Component} from 'react';
import  './JobPost.css';
//import ProperyDetails from './PropertyDetails';
//import axios from 'axios';
//import cookie from 'react-cookies';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import Stepper from 'react-stepper-horizontal';
import Select from 'react-select';
//import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css';

import Slider, {createSliderWithTooltip} from 'rc-slider';
//import ReactBootstrapSlider from 'react-bootstrap-slider';
import NavBar from '../NavBar/NavBar';
//const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const SliderWithTooltip = createSliderWithTooltip(Slider);
//const Handle = Slider.Handle;
const JobFunct = [
{ value: 'Accounting/Auditing', label:'Accounting/Auditing'},
{ value: 'Administrative', label:'Administrative'},
{ value: 'Advertising', label:'Advertising'},
{ value: 'Analyst', label:'Analyst'},
{ value: 'Art/Creative', label:'Art/Creative'},
{ value: 'Business Development', label:'Business Development'},
{ value: 'Consulting', label:'Consulting'},
{ value: 'Customer Service', label:'Customer Service'},
{ value: 'Distribution', label:'Distribution'},
{ value: 'Design', label:'Design'},
{ value: 'Education', label:'Education'},
{ value: 'Engineering', label:'Engineering'},
{ value: 'Finance', label:'Finance'},
{ value: 'General Business', label:'General Business'},
{ value: 'Health Care Provider', label:'Health Care Provider'},
{ value: 'Human Resource', label:'Human Resource'},
{ value: 'Information Technology', label:'Information Technology'},
{ value: 'Legal', label:'Legal'},
{ value: 'Management', label:'Management'},
{ value: 'Manufacturing', label:'Manufacturing'},
{ value: 'Marketing', label:'Marketing'},
{ value: 'Public Relations', label:'Public Relations'},
{ value: 'Purchasing', label:'Purchasing'},
{ value: 'Product Management', label:'Product Management'},
{ value: 'Project Management', label:'Project Management'},
{ value: 'Production', label:'Production'},
{ value: 'Quality Assurance', label:'Quality Assurance'},
{ value: 'Research', label:'Research'},
{ value: 'Sales', label:'Sales'},
{ value: 'Science', label:'Science'},
{ value: 'Strategy/Planning', label:'Strategy/Planning'},
{ value: 'Supply Chain', label:'Supply Chain'},
{ value: 'Training', label:'Training'},
{ value: 'Management', label:'Management'},
{ value: 'Writing/Editing', label:'Writing/Editing'},
{ value: 'Other', label:'Other'},
]

const Industry = [
    {value:'Accounting', label:'Accounting'},
    {value:'Airlines/Aviation', label:'Airlines/Aviation'},
    {value:'Alternative Dispute Resolution', label:'Alternative Dispute Resolution'},
    {value:'Alternative Medicine', label:'Alternative Medicine'},
    {value:'Animation', label:'Animation'},
    {value:'Apparel & Fashion', label:'Apparel & Fashion'},
    {value:'Architecture & Planning', label:'Architecture & Planning'},
    {value:'Arts & Crafts', label:'Arts & Crafts'},
    {value:'Automotive', label:'Automotive'},
    {value:'Aviation & Aerospace', label:'Aviation & Aerospace'},
    {value:'Banking', label:'Banking'},
    {value:'Biotechnology', label:'Biotechnology'},
    {value:'Broadcast Media', label:'Broadcast Media'},
    {value:'Building Materials', label:'Building Materials'},
    {value:'Business Supplies & Equipment', label:'Business Supplies & Equipment'},
    {value:'Capital Markets', label:'Capital Markets'},
    {value:'Chemicals', label:'Chemicals'},
    {value:'Civic & Social Organization', label:'Civic & Social Organization'},
    {value:'Civil Engineering', label:'Civil Engineering'},
    {value:'Commercial Real Estate', label:'Commercial Real Estate'},
    {value:'Computer & Network Security', label:'Computer & Network Security'},
    {value:'Computer Games', label:'Computer Games'},
    {value:'Computer Hardware', label:'Computer Hardware'},
    {value:'Computer Networking', label:'Computer Networking'},
    {value:'Computer Software', label:'Computer Software'},
    {value:'Construction', label:'Construction'},
    {value:'Consumer Electronics', label:'Consumer Electronics'},
    {value:'Consumer Goods', label:'Consumer Goods'},
    {value:'Consumer Services', label:'Consumer Services'},
    {value:'Cosmetics', label:'Cosmetics'},
    {value:'Dairy', label:'Dairy'},
    {value:'Defense & Space', label:'Defense & Space'},
    {value:'Design', label:'Design'},
    {value:'Education Management', label:'Education Management'},
    {value:'E-learning', label:'E-learning'},
    {value:'Electrical & Electronic Manufacturing', label:'Electrical & Electronic Manufacturing'},
    {value:'Entertainment', label:'Entertainment'},
    {value:'Environmental Services', label:'Environmental Services'},
    {value:'Events Services', label:'Events Services'},
    {value:'Executive Office', label:'Executive Office'},
    {value:'Facilities Services', label:'Facilities Services'},
    {value:'Farming', label:'Farming'},
    {value:'Financial Services', label:'Financial Services'},
    {value:'Fine Art', label:'Fine Art'},
    {value:'Fishery', label:'Fishery'},
    {value:'Food & Beverages', label:'Food & Beverages'},
    {value:'Food Production', label:'Food Production'},
    {value:'Fundraising', label:'Fundraising'},
    {value:'Furniture', label:'Furniture'},
    {value:'Gambling & Casinos', label:'Gambling & Casinos'},
    {value:'Glass, Ceramics & Concrete', label:'Glass, Ceramics & Concrete'},
    {value:'Government Administration', label:'Government Administration'},
    {value:'Government Relations', label:'Government Relations'},
    {value:'Graphic Design', label:'Graphic Design'},
    {value:'Health, Wellness & Fitness', label:'Health, Wellness & Fitness'},
    {value:'Higher Education', label:'Higher Education'},
    {value:'Hospital & Health Care', label:'Hospital & Health Care'},
    {value:'Hospitality', label:'Hospitality'},
    {value:'Human Resources', label:'Human Resources'},
    {value:'Import & Export', label:'Import & Export'},
    {value:'Individual & Family Services', label:'Individual & Family Services'},
    {value:'Industrial Automation', label:'Industrial Automation'},
    {value:'Information Services', label:'Information Services'},
    {value:'Information Technology & Services', label:'Information Technology & Services'},
    {value:'Insurance', label:'Insurance'},
    {value:'International Affairs', label:'International Affairs'},
    {value:'International Trade & Development', label:'International Trade & Development'},
    {value:'Internet', label:'Internet'},
    {value:'Investment Banking/Venture', label:'Investment Banking/Venture'},
    {value:'Investment Management', label:'Investment Management'},
    {value:'Judiciary', label:'Judiciary'},
    {value:'Law Enforcement', label:'Law Enforcement'},
    {value:'Law Practice', label:'Law Practice'},
    {value:'Legal Services', label:'Legal Services'},
    {value:'Legislative Office', label:'Legislative Office'},
    {value:'Leisure & Travel', label:'Leisure & Travel'},
    {value:'Libraries', label:'Libraries'},
    {value:'Logistics & Supply Chain', label:'Logistics & Supply Chain'},
    {value:'Luxury Goods & Jewelry', label:'Luxury Goods & Jewelry'},
    {value:'Machinery', label:'Machinery'},
    {value:'Management Consulting', label:'Management Consulting'},
    {value:'Maritime', label:'Maritime'},
    {value:'Marketing & Advertising', label:'Marketing & Advertising'},
    {value:'Market Research', label:'Market Research'},
    {value:'Mechanical or Industrial Engineering', label:'Mechanical or Industrial Engineering'},
    {value:'Media Production', label:'Media Production'},
    {value:'Medical Device', label:'Medical Device'},
    {value:'Medical Practice', label:'Medical Practice'},
    {value:'Mental Health Care', label:'Mental Health Care'},
    {value:'Military', label:'Military'},
    {value:'Mining & Metals', label:'Mining & Metals'},
    {value:'Motion Pictures & Film', label:'Motion Pictures & Film'},
    {value:'Museums & Institutions', label:'Museums & Institutions'},
    {value:'Music', label:'Music'},
    {value:'Nanotechnology', label:'Nanotechnology'},
    {value:'Newspapers', label:'Newspapers'},
    {value:'Nonprofit Organization Management', label:'Nonprofit Organization Management'},
    {value:'Oil & Energy', label:'Oil & Energy'},
    {value:'Online Publishing', label:'Online Publishing'},
    {value:'Outsourcing/Offshoring', label:'Outsourcing/Offshoring'},
    {value:'Package/Freight Delivery', label:'Package/Freight Delivery'},
    {value:'Packaging & Containers', label:'Packaging & Containers'},
    {value:'Paper & Forest Products', label:'Paper & Forest Products'},
    {value:'Performing Arts', label:'Performing Arts'},
    {value:'Pharmaceuticals', label:'Pharmaceuticals'},
    {value:'Philanthropy', label:'Philanthropy'},
    {value:'Photography', label:'Photography'},
    {value:'Plastics', label:'Plastics'},
    {value:'Political Organization', label:'Political Organization'},
    {value:'Primary/Secondary Education', label:'Primary/Secondary Education'},
    {value:'Printing', label:'Printing'},
    {value:'Professional Training', label:'Professional Training'},
    {value:'Program Development', label:'Program Development'},
    {value:'Public Policy', label:'Public Policy'},
    {value:'Public Relations', label:'Public Relations'},
    {value:'Public Safety', label:'Public Safety'},
    {value:'Publishing', label:'Publishing'},
    {value:'Railroad Manufacture', label:'Railroad Manufacture'},
    {value:'Ranching', label:'Ranching'},
    {value:'Real Estate', label:'Real Estate'},
    {value:'Recreational', label:'Recreational'},
    {value:'Facilities & Services', label:'Facilities & Services'},
    {value:'Religious Institutions', label:'Religious Institutions'},
    {value:'Renewables & Environment', label:'Renewables & Environment'},
    {value:'Research', label:'Research'},
    {value:'Restaurants', label:'Restaurants'},
    {value:'Retail', label:'Retail'},
    {value:'Security & Investigations', label:'Security & Investigations'},
    {value:'Semiconductors', label:'Semiconductors'},
    {value:'Shipbuilding', label:'Shipbuilding'},
    {value:'Sporting Goods', label:'Sporting Goods'},
    {value:'Sports', label:'Sports'},
    {value:'Staffing & Recruiting', label:'Staffing & Recruiting'},
    {value:'Supermarkets', label:'Supermarkets'},
    {value:'Telecommunications', label:'Telecommunications'},
    {value:'Textiles', label:'Textiles'},
    {value:'Think Tanks', label:'Think Tanks'},
    {value:'Tobacco', label:'Tobacco'},
    {value:'Translation & Localization', label:'Translation & Localization'},
    {value:'Transportation/Trucking/Railroad', label:'Transportation/Trucking/Railroad'},
    {value:'Utilities', label:'Utilities'},
    {value:'Venture Capital', label:'Venture Capital'},
    {value:'Veterinary', label:'Veterinary'},
    {value:'Warehousing', label:'Warehousing'},
    {value:'Wholesale', label:'Wholesale'},
    {value:'Wine & Spirits', label:'Wine & Spirits'},
    {value:'Wireless', label:'Wireless'},
    {value:'Writing & Editing', label:'Writing & Editing'},

]

const Jobskills = [
    {value:'Accounting/Auditing', label:'Accounting/Auditing'},
{value:'Academic Libraries', label:'Academic Libraries'},
{value:'Academic Medical Centers', label:'Academic Medical Centers'},
{value:'Academic Medicine', label:'Academic Medicine'},
{value:'Academic Program Development', label:'Academic Program Development'},
{value:'Academic Program Management', label:'Academic Program Management'},
{value:'Academic Publishing', label:'Academic Publishing'},
{value:'Academic Research', label:'Academic Research'},
{value:'Amazon Web Services', label:'Amazon Web Services'},
{value:'Amazon Web Services (AWS)', label:'Amazon Web Services (AWS)'},
{value:'Amazon Associates', label:'Amazon Associates'},
{value:'Amazon CloudFront', label:'Amazon CloudFront'},
{value:'Amazon Dynamodb', label:'Amazon Dynamodb'},
{value:'Amazon EBS', label:'Amazon EBS'},
{value:'Amazon EC2', label:'Amazon EC2'},
{value:'Amazon Kindle', label:'Amazon Kindle'},
{value:'Amazon Marketplace', label:'Amazon Marketplace'},
{value:'Analog Circuit Design', label:'Analog Circuit Design'},
{value:'Analog Circuits', label:'Analog Circuits'},
{value:'Application Security', label:'Application Security'},
{value:'Application Security Architecture', label:'Application Security Architecture'},
{value:'Application Security Assessments', label:'Application Security Assessments'},
{value:'Application Servers', label:'Application Servers'},
{value:'Application Service Provider', label:'Application Service Provider'},
{value:'Application Services', label:'Application Services'},
{value:'Application Support Management', label:'Application Support Management'},
{value:'Application Support Services', label:'Application Support Services'},
{value:'Application Testing', label:'Application Testing'},
{value:'Application Virtualization', label:'Application Virtualization'},
{value:'Application-Specific Integrated Circuits (ASIC)', label:'Application-Specific Integrated Circuits (ASIC)'},
{value:'Applications Delivery', label:'Applications Delivery'},
{value:'Applications Development Management', label:'Applications Development Management'},
{value:'Applications Software Development', label:'Applications Software Development'},
{value:'Artificial Intelligence', label:'Artificial Intelligence'},
{value:'Bioequivalence', label:'Bioequivalence'},
{value:'Bioorganic Chemistry', label:'Bioorganic Chemistry'},
{value:'Biopharmaceuticals', label:'Biopharmaceuticals'},
{value:'Biopharmaceutics', label:'Biopharmaceutics'},
{value:'Biophotonics', label:'Biophotonics'},
{value:'Biophysical Chemistry', label:'Biophysical Chemistry'},
{value:'Biophysics', label:'Biophysics'},
{value:'Bioplastics', label:'Bioplastics'},
{value:'Biopolymers', label:'Biopolymers'},
{value:'Bioprocess', label:'Bioprocess'},
{value:'Bioprocessing', label:'Bioprocessing'},
{value:'Biopsychosocial Assessments', label:'Biopsychosocial Assessments'},
{value:'Bioreactor', label:'Bioreactor'},
{value:'Bioremediation', label:'Bioremediation'},
{value:'Bios', label:'Bios'},
{value:'Biscuits', label:'Biscuits'},
{value:'Bison', label:'Bison'},
{value:'Bit.ly', label:'Bit.ly'},
{value:'BitTorrent', label:'BitTorrent'},
{value:'Bitbucket', label:'Bitbucket'},
{value:'Bitcoin', label:'Bitcoin'},
{value:'Bitlocker', label:'Bitlocker'},
{value:'Bitnami', label:'Bitnami'},
{value:'Bitumen', label:'Bitumen'},
{value:'Bitwig', label:'Bitwig'},
{value:'Bitwig Studio', label:'Bitwig Studio'},
{value:'BizAgi', label:'BizAgi'},
{value:'BizTalk', label:'BizTalk'},
{value:'C', label:'C'},
{value:'C Level Management', label:'C Level Management'},
{value:'C Level Selling', label:'C Level Selling'},
{value:'C Programming', label:'C Programming'},
{value:'C Suite', label:'C Suite'},
{value:'C#', label:'C#'},
{value:'C&A', label:'C&A'},
{value:'C&E', label:'C&E'},
{value:'C&I', label:'C&I'},
{value:'C&I Lending', label:'C&I Lending'},
{value:'C++', label:'C++'},
{value:'C++ Builder', label:'C++ Builder'},
{value:'C++/CLI', label:'C++/CLI'},
{value:'C++0x', label:'C++0x'},
{value:'Casper', label:'Casper'},
{value:'CasperJS', label:'CasperJS'},
{value:'Cassandra', label:'Cassandra'},
{value:'Cisco Firewall Security', label:'Cisco Firewall Security'},
{value:'Cisco IOS', label:'Cisco IOS'},
{value:'Cisco IP Telephony Design', label:'Cisco IP Telephony Design'},
{value:'Cisco IPS', label:'Cisco IPS'},
{value:'Cisco Information Security', label:'Cisco Information Security'},
{value:'Cisco MARS', label:'Cisco MARS'},
{value:'Cisco MDS SAN switches', label:'Cisco MDS SAN switches'},
{value:'Cisco Meeting Place', label:'Cisco Meeting Place'},
{value:'Cisco Meraki', label:'Cisco Meraki'},
{value:'Cisco NAC', label:'Cisco NAC'},
{value:'Cisco Network Devices', label:'Cisco Network Devices'},
{value:'Cisco Networking', label:'Cisco Networking'},
{value:'Cisco Networking Devices', label:'Cisco Networking Devices'},
{value:'Cisco Nexus', label:'Cisco Nexus'},
{value:'Data Protection Act', label:'Data Protection Act'},
{value:'Data Protection Manager', label:'Data Protection Manager'},
{value:'Data Pump', label:'Data Pump'},
{value:'Data Quality', label:'Data Quality'},
{value:'Data Quality Assurance', label:'Data Quality Assurance'},
{value:'Data Quality Control', label:'Data Quality Control'},
{value:'Data Reconciliation', label:'Data Reconciliation'},
{value:'Data Recording', label:'Data Recording'},
{value:'Data Recovery', label:'Data Recovery'},
{value:'Data Reduction', label:'Data Reduction'},
{value:'Data Reporting', label:'Data Reporting'},
{value:'Data Representation', label:'Data Representation'},
{value:'Data Research', label:'Data Research'},
{value:'Data Resource Management', label:'Data Resource Management'},
{value:'Data Retention', label:'Data Retention'},
{value:'Data Review', label:'Data Review'},
{value:'Data Sales', label:'Data Sales'},
{value:'Data Science', label:'Data Science'},
{value:'Google Base', label:'Google Base'},
{value:'Google Calendar', label:'Google Calendar'},
{value:'Google Cardboard', label:'Google Cardboard'},
{value:'Google Checkout', label:'Google Checkout'},
{value:'Google Chrome', label:'Google Chrome'},
{value:'Google Chromecast', label:'Google Chromecast'},
{value:'Google Classroom', label:'Google Classroom'},
{value:'Google Closure', label:'Google Closure'},
{value:'Google Cloud', label:'Google Cloud'},
{value:'Google Cloud Platform', label:'Google Cloud Platform'},
{value:'Google Contacts', label:'Google Contacts'},
{value:'HVAC', label:'HVAC'},
{value:'HVAC Controls', label:'HVAC Controls'},
{value:'HVAC Design', label:'HVAC Design'},
{value:'HVDC', label:'HVDC'},
{value:'HVL', label:'HVL'},
{value:'HW Design', label:'HW Design'},
{value:'HW development', label:'HW development'},
{value:'HW/SW integration', label:'HW/SW integration'},
{value:'HY-8', label:'HY-8'},
{value:'HaaS', label:'HaaS'},
{value:'Habeas Corpus', label:'Habeas Corpus'},
{value:'Habilidades de marketing', label:'Habilidades de marketing'},
{value:'Habitat Management', label:'Habitat Management'},
{value:'Habitat Restoration', label:'Habitat Restoration'},
{value:'Habitational', label:'Habitational'},
{value:'Hacking', label:'Hacking'},
{value:'Hadoop', label:'Hadoop'},
{value:'Haiku', label:'Haiku'},
{value:'Hail', label:'Hail'},
{value:'Java', label:'Java'},
{value:'Java API', label:'Java API'},
{value:'Java AWT', label:'Java AWT'},
{value:'Java Applets', label:'Java Applets'},
{value:'Java Architecture for XML Binding (JAXB)', label:'Java Architecture for XML Binding (JAXB)'},
{value:'Java Certified Programmer', label:'Java Certified Programmer'},
{value:'Java Concurrency', label:'Java Concurrency'},
{value:'Java Database Connectivity (JDBC)', label:'Java Database Connectivity (JDBC)'},
{value:'Java Enterprise Architecture', label:'Java Enterprise Architecture'},
{value:'Java Enterprise Edition', label:'Java Enterprise Edition'},
{value:'Java Frameworks', label:'Java Frameworks'},
{value:'Java Message Service (JMS)', label:'Java Message Service (JMS)'},
{value:'Java Naming and Directory Interface (JNDI)', label:'Java Naming and Directory Interface (JNDI)'},
{value:'Java Native Interface (JNI)', label:'Java Native Interface (JNI)'},
{value:'Java Performance', label:'Java Performance'},
{value:'Java RMI', label:'Java RMI'},
{value:'Java Security', label:'Java Security'},
{value:'Java Swing', label:'Java Swing'},
{value:'Java Virtual Machine (JVM)', label:'Java Virtual Machine (JVM)'},
{value:'Java Web Server', label:'Java Web Server'},
{value:'Java Web Services', label:'Java Web Services'},
{value:'Java Web Start', label:'Java Web Start'},
{value:'Java2D', label:'Java2D'},
{value:'Java3D', label:'Java3D'},
{value:'JavaBeans', label:'JavaBeans'},
{value:'JavaCC', label:'JavaCC'},
{value:'JavaCard', label:'JavaCard'},
{value:'JavaFX', label:'JavaFX'},
{value:'JavaMail', label:'JavaMail'},
{value:'JavaSE', label:'JavaSE'},
{value:'JavaScript Frameworks', label:'JavaScript Frameworks'},
{value:'JavaScript Libraries', label:'JavaScript Libraries'},
{value:'JavaScriptMVC', label:'JavaScriptMVC'},
{value:'JavaServer Faces (JSF)', label:'JavaServer Faces (JSF)'},
{value:'JavaServer Pages (JSP)', label:'JavaServer Pages (JSP)'},
{value:'JavaServer Pages Standard Tag Library (JSTL)', label:'JavaServer Pages Standard Tag Library (JSTL)'},
{value:'Javadoc', label:'Javadoc'},
{value:'Javascript', label:'Javascript'},

]

const education = [
    {value:'High School Diploma', label:'High School Diploma'},
    {value:'Associate\'s Degree', label:'Associate\'s Degree'},
    {value:'Bachelor\'s Degree', label:'Bachelor\'s Degree'},
    {value:'Master\'s Degree', label:'Master\'s Degree'},
    {value:'Master of Business Administration', label:'Master of Business Administration'},
    {value:'Doctor of Philosophy', label:'Doctor of Philosophy'},
    {value:'Doctor of Medicine', label:'Doctor of Medicine'},
    {value:'Doctor of Law', label:'Doctor of Law'},

]


class JobPost extends Component {
  constructor(props){
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
     
      company : '',
      jobtitle : '',
      address : '',
      jobfunc : '',
      emptype : '',
      industry : '',
      senlevel : '',
      jobdes : '',
      recapp : '',
      source : '',
      skills : '',
      explevel : '',
      edulevel: '',
      rate : '',
      Invalidcompany : false,
      Invalidjobtitle : false,
      Invalidaddress : false,
      Invalidjobfunc : false,
      Invalidemptype : false,
      Invalidindustry : false,
      Invalidsenlevel : false,
      Invalidjobdes : false,
      Invalidfield :false,

     
    }

    //this.submitInit = this.submitInit.bind(this);
     this.startJobHandler = this.startJobHandler.bind(this);
    this.continueJobdesc = this.continueJobdesc.bind(this);
    this.continueJobqual = this.continueJobqual.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.backJobqual = this.backJobqual.bind(this);
    this.backJobcheckout = this.backJobcheckout.bind(this);  
    this.handleChange = this.handleChange.bind(this);
    this.submitCheckout = this.submitCheckout.bind(this);

  
}
componentDidMount(){

    this.props.getinitdata(this.props.username ,this.props.jobedit);
    
    
}

startJobHandler(){
    
   this.props.showjobdesc();

}



handleChange = name => value => {
    
    let data = {
        name : name,
        value : value,
    
    }
    this.setState({
      //[name]: value,
      Invalidcompany : false,
      Invalidjobtitle : false,
      Invalidaddress : false,
      Invalidjobfunc : false,
      Invalidemptype : false,
      Invalidindustry : false,
      Invalidsenlevel : false,
      Invalidjobdes : false,
      Invalidfield :false,
    });
    this.props.setPropsValue(data);

    if(this.props.draftSuccessFlag || this.props.draftFailFlag){
        this.props.jobresetErrors(); 
      } 
 
  };


changeHandler(e){
    
let data = {
    name : e.target.name,
    value :e.target.value,

}
this.props.setPropsValue(data);

    this.setState({
      //[e.target.name] : e.target.value,
      Invalidcompany : false,
      Invalidjobtitle : false,
      Invalidaddress : false,
      Invalidjobfunc : false,
      Invalidemptype : false,
      Invalidindustry : false,
      Invalidsenlevel : false,
      Invalidjobdes : false,
      Invalidfield :false,
      activeStep : '0',   
  })
  if(this.props.draftSuccessFlag || this.props.draftFailFlag){
    this.props.jobresetErrors(); 
  }
   
}



  saveDraft(){
    
    if(this.props.company && this.props.jobtitle && this.props.address && this.props.jobfunc.length &&  this.props.emptype && this.props.industry.length &&  this.props.senlevel && this.props.jobdes){

        
        
        let data ={
          username : this.props.username,  
          jobid : this.props.jobid,
          company : this.props.company,
          jobtitle : this.props.jobtitle,
          address : this.props.address,
          jobfunc : this.props.jobfunc,
          emptype : this.props.emptype,
          industry : this.props.industry,
          senlevel : this.props.senlevel,
          jobdes : this.props.jobdes,
          recapp : this.props.recapp,
          source : this.props.source,
          poststatus : 'draft'
        }
        
        
        //this.props.continuejobdesc(data); 
        console.log("jobfunc",data.jobfunc);
        console.log("emptype",data.emptype);
        console.log("industry",data.industry);
        console.log("senlevel",data.senlevel);
        console.log("jobdes",data.jobdes);
        console.log("recapp",data.recapp);
        console.log("source",data.source);
        this.props.jobcheckout(data);
        

    }
    else{
        
        //this.setState({Invalidfield:true})
        if(!this.props.company){this.setState({Invalidcompany:true}) }
        if(!this.props.jobtitle){this.setState({Invalidjobtitle:true}) }
        if(!this.props.address){this.setState({Invalidaddress:true}) }
        if(!this.props.jobfunc.length){this.setState({Invalidjobfunc:true}) }
        if(!this.props.emptype){this.setState({Invalidemptype:true}) }
        if(!this.props.industry.length){this.setState({Invalidindustry:true}) }
        if(!this.props.senlevel){this.setState({Invalidsenlevel:true}) }
        if(!this.props.jobdes){this.setState({Invalidjobdes:true}) } 


    }
   
    
}

continueJobdesc (){
    //let { company, jobtitle, address,jobfunc, emptype, industry, senlevel,jobdes,recapp,source} = this.state;
    
    if(this.props.company && this.props.jobtitle && this.props.address && this.props.jobfunc.length &&  this.props.emptype && this.props.industry.length &&  this.props.senlevel && this.props.jobdes){
        
        
        //this.props.continuejobdesc(data); 
        console.log("jobfunc",this.props.jobfunc);
        console.log("emptype",this.props.emptype);
        console.log("industry",this.props.industry);
        console.log("senlevel",this.props.senlevel);
        console.log("jobdes",this.props.jobdes);
        console.log("recapp",this.props.recapp);
        console.log("source",this.props.source);
        
        this.props.showjobqual();
        

    }
    else{
        
        //this.setState({Invalidfield:true})
        if(!this.props.company){this.setState({Invalidcompany:true}) }
        if(!this.props.jobtitle){this.setState({Invalidjobtitle:true}) }
        if(!this.props.address){this.setState({Invalidaddress:true}) }
        if(!this.props.jobfunc.length){this.setState({Invalidjobfunc:true}) }
        if(!this.props.emptype){this.setState({Invalidemptype:true}) }
        if(!this.props.industry.length){this.setState({Invalidindustry:true}) }
        if(!this.props.senlevel){this.setState({Invalidsenlevel:true}) }
        if(!this.props.jobdes){this.setState({Invalidjobdes:true}) } 


    }
    


 

}

continueJobqual(){

//this.props.continuejobqual(data);

this.props.showjobcheckout();
}

backJobqual(){
    //preventDefault();
    this.props.showjobdesc();
}
backJobcheckout(){
    // e.preventDefault();
    this.props.showjobqual();
}

submitCheckout(){

    // e.preventDefault();
    //let { rate} = this.state
     let data = {
        jobid : this.props.jobid,
        username : this.props.username, 
        company : this.props.company,
        jobtitle : this.props.jobtitle,
        address : this.props.address,
        jobfunc : this.props.jobfunc,
        emptype : this.props.emptype,
        industry : this.props.industry,
        senlevel : this.props.senlevel,
        jobdes : this.props.jobdes,
        recapp : this.props.recapp,
        source : this.props.source,
        skills : this.props.skills,
        explevel : this.props.explevel,
        edulevel: this.props.edulevel,  
        rate : this.props.rate,
        easyapply : this.props.easyapply,
        poststatus : 'active'      

     }
    
    console.log("submit checkout",data);
     this.props.jobcheckout(data);



}


componentWillUnmount(){

    this.props.resetEditJobs();
    this.props.postjoResetAll();
}

render(){
    let showinit = null;
    let showfirst = null;
    let showsecond = null;
    let showthird = null;
    let showStepper = null;
    let showSuccess = null;
    let showError = null;
    let showInputError = null;
    let draftsaveSuccess =null;
    let draftsaveFail =null;
    let redirectVar = null;
      
    if(!this.props.token){
        
         redirectVar = <Redirect to= "/"/>
    }
    


    if(this.props.successPost){
        showSuccess = <div className="alert alert-success" role="alert">
    <h2>Job Post Successful</h2>
    <Redirect to= "/recruiterjobs"/>
      </div>
      
    }
    if(this.props.failPost){
        showError = <div className="alert-danger">
    <h2>Job Not Created, Try Again Later !!</h2>
      </div>
    }
    

    if(this.props.ShowInit)  {
    showinit = 
    <div className="container-box">
        <div className="header-page">
        <h2>Reach the quality candidates you can't find anywhere else.</h2>

        </div>

        <section className="section-page">

        <form className="form">
        <br/>
         <input type="text" className="form-control"  name="company" onChange={this.changeHandler}
            placeholder={this.props.company?this.props.company: "Company"}></input>
        <br/>
        <input type="text" onChange={this.changeHandler} className="form-control"  name="jobtitle" 
          placeholder={this.props.jobtitle?this.props.jobtitle: "Job title"}></input>
         <br/>
    	
    
     <input type="text" onChange={this.changeHandler} className="form-control"  name="address" 
      placeholder={this.props.address?this.props.address:"Job address or city"}></input>
       <br/>
   </form>
   <br/>
   <div className="col-md-12" style={{textAlign:'center'}}> 
    <button   className="btn btn-primary" onClick={this.startJobHandler} >Start Job Post</button>

     </div>
     
     </section>


        </div>

 
} else{

    showStepper =  <div>
            <Stepper steps={ [{title: ''}, {title: ''}, 
                   {title: ''}] } 
                   activeStep={this.props.activeSteps} />
            </div>
     if(this.state.Invalidcompany || this.state.Invalidjobtitle || this.state.Invalidaddress|| this.state.Invalidjobfunc|| 
        this.state.Invalidemptype || this.state.Invalidindustry || this.state.Invalidindustry || this.state.Invalidjobdes) {

            showInputError = <div className="alert-danger">
            <h2>Please fill out all required fields</h2>
              </div>

        } 

     if(this.props.draftSuccessFlag) {
        draftsaveSuccess= <div className="alert alert-success" role="alert">
        <h2>Draft Save Successful</h2>
          </div>
     } 
     if(this.props.draftFailFlag) {
        draftsaveFail= <div className="alert-danger">
        <h2>Draft Save not successful. Try Again !</h2>
          </div>
     }

    if(this.props.show1stform) {
        
        showfirst =
        <div className="panel-containers">
            <div className ="container-props">
            {showInputError}
            {draftsaveSuccess}
            {draftsaveFail}
               <h2> Step 1: What job do you want to post?</h2>
                 {/* {fieldcheck}
               {errorlog} */}
               {/* {this.submitpropDetails} */}
               {/* onSubmit={(e) => this.submitpropDetails(e)} */}
               
             <form onSubmit={this.submitInit}>              
              <div className="form-row">
                     <div className="form-group col-md-4">
                        <label >Company *</label>
                        <input type="text" className="form-control" name="company" style={{ borderColor:this.state.Invalidcompany?'red':''}}  onChange={this.changeHandler} 
                        placeholder={this.props.company?this.props.company: "Company"}/> 
                    </div>
                    <div className="form-group col-md-4">
                        <label >Job title *</label>
                        <input type="text" name="jobtitle" className="form-control" style={{ borderColor:this.state.Invalidjobtitle?'red':''}} onChange={this.changeHandler} 
                        placeholder={this.props.jobtitle?this.props.jobtitle: "Job Title"}/>
        
                    </div>
                    <div className="form-group col-md-4">
                        <label >Location *</label>
                        <input type="text" className="form-control" style={{ borderColor:this.state.Invalidaddress?'red':''}} name="address" onChange={this.changeHandler} 
                        placeholder={this.props.address?this.props.address: "Location"}/>            
                    </div>             
              </div>
                     
        
             <div className="form-row">
                     <div className="form-group col-md-8">
                        <label >Job Function *</label>
                        
                        <Select isMulti options={JobFunct} isSearchable   name="jobfunc"  onChange={this.handleChange('jobfunc')} 
                        style={{ borderColor:this.state.Invalidjobfunc?'red':''}} defaultValue={this.props.jobfunc}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label >Employment Type *</label>
                    <select   className="form-control" style={{ borderColor:this.state.Invalidemptype?'red':''}} 
                    name="emptype" onChange={this.changeHandler}>
                    <option >{this.props.emptype?this.props.emptype:"Select..."}</option>
                    <option >Full-time</option>
                    <option >Part-time</option>
                    <option >Contract</option>
                    <option >Temporary</option>
                    <option >Volunteer</option>
                    <option >Internship</option>
                    <option >Other</option>
                  </select>
                    </div>
                                
              </div>
              <div className="form-row">
              <div className="form-group col-md-8">
                        <label >Company Industry *</label>
                        
                        <Select isMulti options={Industry} isSearchable  style={{ borderColor:this.state.Invalidindustry?'red':''}}  
                        name="industry"  onChange={this.handleChange('industry')} defaultValue={this.props.industry}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label >Seniority Level *</label>
                    <select  className="form-control" name="senlevel" style={{ borderColor:this.state.Invalidsenlevel?'red':''}} 
                    onChange={this.changeHandler} >
                    <option >{this.props.senlevel?this.props.senlevel:"Select..."}</option>
                    <option >Internship</option>
                    <option >Associate</option>
                    <option >Mid-Senior level</option>
                    <option >Director</option>
                    <option >Executive</option>
                    <option >Not Applicable</option>
                    
                  </select>
                    </div>              
              </div>  
                     <br/>
                     <label >Job Description *</label>
                     
                    <textarea onChange={this.changeHandler} style={{ borderColor:this.state.Invalidjobdes?'red':''}}  className="form-control row" rows="18" 
                    name="jobdes" placeholder={this.props.jobdes?this.props.jobdes:"Job Description"}></textarea>
                   
            <br/>
            <div>

            <div className="form-row">
                        <label >Let candidates apply with their LinkedIn profile or add external site address</label>
                        <input type="text" className="form-control" name="recapp"  onChange={this.changeHandler} 
                        placeholder={this.props.recapp?this.props.recapp:"abc.abd@gmail.com"}/> 
                    </div>
            
               
            <br/>   
            <div className="form-row">
                        <label >How Did you hear about us?</label>
                        <select className="form-control" name="source"  onChange={this.changeHandler}>
                    <option >{this.props.source?this.props.source:"Select..."}</option>
                    <option >In the Mail</option>
                    <option >Radio</option>
                    <option >Online as/search Engine</option>
                    <option >Podcast</option>
                    <option >Sirius XM Satellite Radio</option>
                    <option >Email</option>
                    <option >Ad on LinkedIn.com</option>
                    <option >Other</option>
                  </select>
            </div>      
            </div>
            </form> 
            <br/> 
             <button  style={{color:"white"}} className="btn btn-secondary" onClick={this.saveDraft} >Save Draft</button>
            <button  style={{backgroundColor:"#337ab7",color:"#fff"}} className="btn btn-primary float-right" 
                   onClick={this.continueJobdesc} >Continue</button>                
               
         
                        
                
            
        </div> 
    
                  
               </div>
        
}
    
    
    if(this.props.show2ndform){
        showsecond= <div className="panel-containers">
    <div className ="container-props">
    <h2> <b>Step 2:</b>What are the right qualifications for your Job?</h2>
    <br/> 
    
    <br/> 
        <form>
        <div className="form-row">
              <label> 'What are some of the skills needed for this job? (Select up to 10)' </label>
          
              <div className="form-group col-md-12">
              <Select isMulti isSearchable options={Jobskills}  name="skills" 
              onChange={this.handleChange('skills')} defaultValue={this.props.skills}/>
            </div>
        
          </div>
          <br/> 
          <br/> 
    <div className="form-row" >
    
    <label>What range of relevant experience are you looking for? {this.props.explevel?this.props.explevel[0]:this.state.explevel[0]} to {this.props.explevel?this.props.explevel[1]:this.state.explevel[1]} years</label>
    <br/> 
    <br/> 
    
    <div className="form-group col-md-12">
    <Range  min={0} max={30} name="explevel"
    marks={{'0':'0','5':'5', '10':'10', '15':'15', '20':'20','25':'25','30':'30'}} 
    defaultValue={this.props.explevel?this.props.explevel:[1,5]} tipFormatter={value => `${value}years`} 
    onChange={this.handleChange('explevel')}  />
    </div>
    </div>
    <br/> 
    <br/> 
    <div className="form-row">
              <label> 'What level of education are you looking for? (Select up to 5)' </label>
          
              <div className="form-group col-md-12">
              <Select isMulti isSearchable options={education} name="edulevel" 
              onChange={this.handleChange('edulevel')} defaultValue={this.props.edulevel}/>
             </div>
        
          </div>

           </form>
          <br/> 
    <br/> 
    
        
          <button  style={{color:"white"}} className="btn btn-secondary" onClick={this.backJobqual} >Back</button>
          <button  style={{backgroundColor:"#337ab7",color:"#fff"}} className="btn btn-primary float-right" 
           onClick={this.continueJobqual} >Continue</button>  
        
    
       
    
          
    </div>
    </div>
    
    }
    
    if(this.props.show3rdform){
        showthird = <div className="panel-containers">
        {showSuccess}
        {showError}
    <div className ="container-props">
    <h2> <b>Step 3:</b>Set your budget, pay when candidates view your job</h2>
    <br/> 
    
    <br/> 
    <form >
    <br/> 
    <br/>  
    
    
    <div className="form-row">
    
    
    <div className="form-group col-md-12">
      <SliderWithTooltip  min={0} max={64}  name="rate"
     defaultValue={14} step={1} onChange={this.handleChange('rate')} tipFormatter={value => `${value} USD`}
     trackStyle={{ backgroundColor: 'light blue', height: 10 }}
     railStyle={{ backgroundColor: 'grey', height: 10 }} 
    //  handleStyle={{
    //    borderColor: 'blue',
    //    height: 28,
    //    width: 28,
    //    marginLeft: -14,
    //    marginTop: -9,
    //    backgroundColor: 'black',
    //  }}
    
     />
    
    </div>
    </div>
    <br/> 
    <br/> 

    <div className="form-row">
                        <label >Easy Apply?</label>
                        <select className="form-control" name="easyapply"  onChange={this.changeHandler}>
                    <option >{this.props.easyapply?'Yes':'No'}</option>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                    
                  </select>

    </div>  
            <br/> 
    <br/> 
    </form>
          <br/> 
    <br/> 
    
       
          <button  style={{color:"white"}} className="btn btn-secondary" disabled={this.props.successPost} onClick={this.backJobcheckout} >Back</button>
          <button  style={{backgroundColor:"#337ab7",color:"#fff"}} className="btn btn-primary float-right" 
            disabled={this.props.successPost} onClick={this.submitCheckout}>Post Job</button>  
        
        
        
    
          
    </div>
    </div>  
    
    }

    

} 




return(

       <div>
          <NavBar /> 
          {redirectVar}
        {showinit}
        <br/> 
          <br/> 
          <br/>  
      {showStepper}
      {showfirst}

      {showsecond}
      {showthird}
        
    </div> 
   
    )
}
}


const mapStateToProps = state => {
return {
    
    ShowInit : state.jobpost.showinit,
    show1stform : state.jobpost.show1stform,
    show2ndform : state.jobpost.show2ndform,
    show3rdform : state.jobpost.show3rdform,
    jobid : state.jobpost.jobid,
    company : state.jobpost.company,
    jobtitle : state.jobpost.jobtitle,
    address : state.jobpost.address,
    jobfunc : state.jobpost.jobfunc,
    emptype : state.jobpost.emptype,
    industry : state.jobpost.industry,
    senlevel : state.jobpost.senlevel,
    jobdes : state.jobpost.jobdes,
    recapp : state.jobpost.recapp,
    source : state.jobpost.source,
    skills : state.jobpost.skills,
    explevel : state.jobpost.explevel,
    edulevel: state.jobpost.edulevel,
    rate : state.jobpost.rate,
    easyapply : state.jobpost.easyapply,
    activeSteps : state.jobpost.activeSteps,
    failPost : state.jobpost.errorFlag,
    successPost: state.jobpost.successFlag,
    draftSuccessFlag: state.jobpost.draftSuccessFlag,
    draftFailFlag : state.jobpost.draftFailFlag,
    token : state.user.token,
    jobedit : state.user.jobedit,
    // isLoggedIn : state.login.isLoggedIn,
    username : state.user.user.email,
    // unAuthRedirect : state.login.unAuthRedirect
};
};

const mapDispatchToProps = dispatch => {
return {
    getinitdata:(username, jobedit) =>dispatch(actions.getinitdata(username,jobedit)),
    showinit : () => dispatch (actions.showInit()),
    showjobdesc : () => dispatch (actions.showJobdesc()),
    showjobqual : () => dispatch (actions.showJobqual()),
    showjobcheckout : () => dispatch (actions.showJobcheckout()),
    initsubmit : (data) => dispatch (actions.initsubmit(data)),
    continuejobdesc : (data) => dispatch (actions.continueJobdesc(data)),
    continuejobqual : (data) => dispatch (actions.continueJobqual(data)),
    jobcheckout : (data) => dispatch (actions.jobcheckout(data)),
    jobresetErrors : () => dispatch (actions.jobresetErrors()),
    setPropsValue : (data) => dispatch (actions.setpropsvalue(data)),
    resetEditJobs : ()   => dispatch(actions.reseteditjobs()),
    postjoResetAll : ()  => dispatch(actions.postjobresetall()),
};
};

export default connect( mapStateToProps, mapDispatchToProps )(JobPost);