import React, { Component } from 'react';
import './LandingPage.css'
import logo from '../../images/logoforschool.png';
import Footer from '../Footer/Footer.js';


class LandingPage extends Component{

    
    render(){

        return(
            <div>
            <div className ="welcome-template">
                <div className = "welcome-comment">
                    <span className ="welcome">WELCOME</span><br></br>
                    <img className ="logoforschool3" src={logo} alt = "The Golden Experience Logo" style ={{width:'70%'}}></img>
                </div>

            </div>
            <Footer/>
            </div>
            
        )
    }
}
export default LandingPage;