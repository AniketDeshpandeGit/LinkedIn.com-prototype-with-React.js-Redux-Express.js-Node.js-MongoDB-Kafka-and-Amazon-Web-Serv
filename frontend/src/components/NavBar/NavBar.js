import React,{Component} from 'react';
import './NavBar.css';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, logout} from '../../store/actions/useraction';

class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoggedIn  : false,
            email       : '',
            password    : ''
        }
        this.onChange       = this.onChange.bind(this);
        this.onSubmit       = this.onSubmit.bind(this); 
        this.handlelogout   = this.handlelogout.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handlelogout(){
        this.props.logout( (res) =>{
            if(res.status === 'SUCCESS'){
                this.setState({
                    isLoggedIn: false
                });
                document.getElementById("success_text").innerHTML =  res.message;
                document.getElementById("success_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                        this.setState({
                            logoutRedirect: true,
                        })          
                }, 500)
            }
        }) 
    }

    onSubmit(e){
        e.preventDefault();
        
        const values = {
            email   : this.state.email,
            password: this.state.password
        }

        this.props.login(values, (res) => {
            console.log(res);

            if(res.status === "SUCCESS"){
                this.setState({
                    isLoggedIn: true,
                    loginRedirect: true,
                });          
                console.log("Signed in successfully");
            }

            else{
                console.log("Err in login.");
                console.log(res.message);
                document.getElementById("alert_text").innerHTML = "ERROR: " + res.message;
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000)
            }
        })

    }
    componentDidMount(){
        if (this.props.name !== ''){
            this.setState({
                isLoggedIn: true
            });
        }
    }
        
    render() {
        let redirectVar=null;
        if(this.state.loginRedirect){
            redirectVar = <Redirect to="/profile" />;
        }
        else if(this.state.logoutRedirect){
            redirectVar = <Redirect to="/" />
        } 
        return(
            <div>
                {redirectVar}
                <nav className ="navbar navbar-expand-sm" id="mainNav" >
                    <div className="container">
                        <div className="d-flex w-100">

                            {/* Landing Page Navbar */}
                            <div className='navbar-brand' style={{display: this.state.isLoggedIn? 'none': 'flex'}}>
                                <img alt="LinkedIn" src="img/navbarLogo.png" className="align-self-center" height="30px"/>
                            </div>

                            <form className="navbar-form navbar-right ml-auto form-inline" style={{display: this.state.isLoggedIn? 'none': 'flex'}} onSubmit={this.onSubmit}>
                                <div className='input-group input-group-sm'>
                                    <input type='email'    className='form-control' name='email'    placeholder='Email' value={this.state.email} onChange={this.onChange}/>
                                </div>
                                <div className='input-group input-group-sm mx-2'>
                                    <input type='password' className='form-control input-sm' name='password' placeholder='Password' value={this.state.password} onChange={this.onChange} />
                                </div>  
                                <button type='submit' className='btn btn-outline-light btn-sm'>Sign In</button>
                            </form>
                            
                            {/* Logged In Navbar */}
                            <div className='navbar-brand' style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
                                <img alt="LinkedIn" src="img/loggedinLogo.png" className="align-self-center" height="35px"/>
                            </div>

                            <div className='align-self-center align-items-end ml-auto' style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
                                <ul className='navbar-nav' style={{display: this.state.isLoggedIn? 'flex': 'none'}}>
                                <li className='nav-item nav-link mx-4 py-0'  style={{display: this.props.user_type === 'recruiter'? 'flex': 'none'}}>
                                        <Link to="/viewapplicants"><span className='icon-text'><i className="fas fa-search fa-2x"></i><br/>View Applicants</span></Link>                                 
                                    </li>
                                <li className='nav-item nav-link mx-4 py-0'>
                                        <Link to="/peoplesearch"><span className='icon-text'><i className="fas fa-search fa-2x"></i><br/>Search Applicants</span></Link>                                 
                                    </li>
                                    <li className='nav-item nav-link mx-4 py-0'>
                                        <Link to="/connections"><span className='icon-text'><i className="fas fa-user-friends fa-2x"></i><br/>My Network</span></Link>                                 
                                    </li>
                                    <li className='nav-item nav-link mx-4 py-0'>
                                        <Link to={ this.props.user_type === 'recruiter' ? "/recruiterJobs" : "/drawer"}><span className='icon-text'><i className="fas fa-briefcase fa-2x"></i><br/>Jobs</span></Link>                                 
                                    </li>
                                    <li className='nav-item nav-link mx-4 py-0'>
                                        <Link to="/"><span className='icon-text'><i className="fas fa-envelope fa-2x"></i><br/>Messaging</span></Link>                                 
                                    </li>
                                    <li className="nav-item nav-link mx-4 py-0 dropdown">
                                        <a className="dropdown-toggle text-white" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                            <img src='img/JaneDoe.png' alt='Profile Pic' height='30' width='30' />
                                            <br/><span className='icon-text '>Me</span> 
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                            <div className='dropdown-item' >
                                                <span><img src='img/JaneDoe.png' alt='profile pic' height='60' width='60' /></span>
                                                <div className='navbar-profile-name'>{this.props.name}</div>
                                                <div className='navbar-profile-title'>{this.props.user.headline || ''}</div>
                                                <br/>
                                                <Link to="/profile"><span className='text-info'>View Profile</span></Link>                                 

                                            </div>
                                            <span className='dropdown-item text-secondary'><button className='btn btn-danger' onClick={this.handlelogout}>Sign Out</button></span>                            
                                        </div>
                                    </li>
                                    <li className='nav-item nav-link py-0 mx-4' style={{display: this.props.user_type === 'recruiter'? 'flex': 'none'}}>
                                        <Link to="/jobpost"><span className='icon-text'><i className="fas fa-file-alt fa-2x"></i><br/>Post Jobs</span></Link>                                 
                                    </li>
                                    {/* <li className='nav-item nav-link py-0 mx-4' style={{display: this.props.user_type === 'recruiter'? 'flex': 'none'}}>
                                        <Link to="/recruterapplyfind"><span className='icon-text'><i className="fas fa-business-time fa-2x"></i><br/>View Applications</span></Link>                                 
                                    </li> */}
                                    <li className='nav-item nav-link py-0 mx-4' style={{display: this.props.user_type === 'recruiter'? 'flex': 'none'}}>
                                        <Link to="/JobStats"><span className='icon-text'><i className="fas fa-chart-line fa-2x"></i><br/>Dashboard</span></Link>                                 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>                    
                </nav>

                {/* snackbar div */}
                <div id="d-flex-inline mx-auto">
                    <div id="alert_snackbar" className="alert alert-danger snackbar" role="alert" style={{display: 'none'}}>
                        <p id="alert_text"></p>
                    </div>
                    <div id="success_snackbar" className="alert alert-success snackbar" role="alert" style={{display: 'none'}}>
                        <p id="success_text"></p>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        token: state.user.token,
        user: state.user.user,
        name: state.user.name,
        user_type: state.user.user_type
    }    
};

export default connect(mapStateToProps, {login, logout})(NavBar);