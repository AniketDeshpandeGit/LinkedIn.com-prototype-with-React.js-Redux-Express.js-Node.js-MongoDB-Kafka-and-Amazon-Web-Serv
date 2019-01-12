import React,{Component} from 'react';
import './Footer.css';

class Footer extends Component{
    render(){
        return(
            <div className='container-fluid'>
                <nav className ="navbar navbar-expand-sm" id="footer" >
                        <div className="row">
                            <a className='navbar-brand'><img alt="LinkedIn" className="img-responsive" src="img/footerLogo.png" height="15px" width='30px'/><p><small>© 2018</small></p></a>
                        </div>
                </nav>
            </div>
        )
    }

}

export default Footer;