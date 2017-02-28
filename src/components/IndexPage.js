import React, {Component} from 'react'
import {Link} from 'react-router'
import "../intro_login_pages/vendor/bootstrap/css/bootstrap.min.css"
import "../intro_login_pages/vendor/font-awesome/css/font-awesome.min.css"
import "../intro_login_pages/vendor/magnific-popup/magnific-popup.css"
import "../intro_login_pages/css/creative.min.css"
export default class IndexPage extends Component {
	render() {
		return (
		<div id="page-top">
    	<nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i> </button> <a className="navbar-brand page-scroll" href="#page-top">Cloud Task Manager</a> </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li> <a className="page-scroll" href="#about">About</a> </li>
                    <li> <a className="page-scroll" href="#features">Features</a> </li>
                </ul>
            </div>
        </div>
    </nav>
    <header>
        <div className="header-content">
            <div className="header-content-inner">
                <h1 id="homeHeading">TEAM MESSENGER</h1>
                <p>Easily assign task to your employees, get feedback from them, and get your works done in a more organized way.</p> 
                <Link href="./login" className="btn btn-primary btn-xl page-scroll">Log in </Link> </div>
        </div>
    </header>
    <section id="features">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Features </h2>
                    <hr className="primary"/> 
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box"> <i className="fa fa-4x fa-diamond text-primary sr-icons"></i>
                        <h3>Scalable </h3>
                        <p className="text-muted">Our app fits to app both for small and complex organsations. You can have unlimted number of derpartment hierarchies. </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box"> <i className="fa fa-4x fa-paper-plane text-primary sr-icons"></i>
                        <h3>Easy-to-use</h3>
                        <p className="text-muted">Friendly and rich user interface</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box"> <i className="fa fa-4x fa-newspaper-o text-primary sr-icons"></i>
                        <h3>Fast & Reliable</h3>
                        <p className="text-muted">Powered by multiple powerful technologies</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box"> <i className="fa fa-4x fa-heart text-primary sr-icons"></i>
                        <h3>Made with Love</h3>
                        <p className="text-muted"> Dedicated and passionate team behind it.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="bg-primary" id="about">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                    <h2 className="section-heading">We've got what you need!</h2>
                    <hr className="light"/>
                    <p className="text-faded"> We have done this application as part of our school project. </p> <a href="#services" className="page-scroll btn btn-default btn-xl sr-button">More Info! </a> </div>
            </div>
        </div>
    </section>
	</div>
	)
	}
}