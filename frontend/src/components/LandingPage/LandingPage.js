import React,{Component} from 'react';
import './LandingPage.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import {signup} from '../../store/actions/useraction';
import {connect} from 'react-redux';


class LandingPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstname   : '',
            lastname    : '',
            email       : '',
            user_type   : '',
            password    : ''
        }

        this.onChange   = this.onChange.bind(this);
        this.onSubmit   = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const values = {
            ...this.state,
            user_type: document.getElementsByName('user_type')[0].checked?'applicant':'recruiter'
        };

        this.props.signup(values, (res) => {

            if(res.status === "SUCCESS"){
                console.log("Successfully created user!");
                document.getElementById("success_text").innerHTML = res.message;
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    document.getElementById("success_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
            else{
                console.log("Err in creating the user profile.");
                document.getElementById("alert_text").innerHTML = res.message;
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        });
    }

    render(){

        return(
            <div>
                <NavBar />

                <header className="masthead d-flex">
                    <div className="container my-auto bg-transparent">
                        <div className="row">
                            <div className='col-md-6 offset-md-3 col-lg-4 offset-lg-4 d-flex justify-content-center p-0 bg-white'>
                                
                                {/* Signup Form */}
                                <form id='regForm' onSubmit={this.onSubmit} className="w-100">

                                    <h4 className='text-center mt-3'>Be great at what you do</h4>
                                    <h5 className='text-center mb-3'><small>Get started - it's free</small></h5>

                                    <div className='bg-light mx-0 p-2'>
                                        
                                        <div className='form-group form-group-sm'>
                                            <label className='col-form-label col-form-label-sm' htmlFor='input-firstname'>First Name</label>
                                            <input type='text' className="form-control form-control-sm" id="input-firstname" name='firstname' aria-required='true' value={this.state.firstname} onChange={this.onChange} />
                                        </div>
                                        
                                        <div className='form-group form-group-sm'>
                                            <label className='col-form-label col-form-label-sm' htmlFor='input-lastname'>Last Name</label>
                                            <input type='text' className='form-control form-control-sm' id='input-lastname' name='lastname' aria-required='true' value={this.state.lastname} onChange={this.onChange} />
                                        </div>
                                        
                                        <div className='form-group form-group-sm'>
                                            <label className='col-form-label col-form-label-sm' htmlFor='input-email'>Email</label>
                                            <input type='email' className='form-control form-control-sm' id='input-email' name='email' aria-required='true' value={this.state.email} onChange={this.onChange}/>
                                        </div>
                                        
                                        <p className='font-weight-bold'>Signing up as :</p>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="user_type" id="input-usertype1" value="applicant" defaultChecked/>
                                            <label className="form-check-label" htmlFor="input-usertype1">
                                                Applicant
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="user_type" id="input-usertype2" value="recruiter"/>
                                            <label className="form-check-label" htmlFor="input-usertype2">
                                                Recruiter
                                            </label>
                                        </div>

                                        <div className='form-group form-group-sm'>
                                            <label className='col-form-label col-form-label-sm' htmlFor='input-password'>Password(6 or more characters)</label>
                                            <input type='password' className='form-control form-control-sm' id='input-password' name='password' aria-required='true' value={this.state.password} onChange={this.onChange} />
                                        </div>
                                        <p className='font-weight-light text-center'>
                                            <small>By clicking Join now, you agree to the LinkedIn <br/> User Agreement, Privacy Policy, and Cookie Policy.</small>
                                        </p>

                                        <div className='my-2'>
                                            <button type='submit' className='btn btn-primary btn-sm w-100'>Join Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
export default connect(null, {signup})(LandingPage);