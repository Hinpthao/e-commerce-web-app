import React, { useState, useEffect, Fragment } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import '../style/Footer.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFooter } from '../redux/actions/footerAction';

const Footer = () => {
    const { footer } = useSelector(state => state.footer)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFooter());
    }, [dispatch])

    const {
        _id,
        nameEnterprise,
        description,
        email,
        phone ,
        address ,
        linkFb,
        linkIg,
    } = footer;

    return (
        <div style={{margin: "50px 0 50px 0", textAlign: "center"}}>
            <hr></hr>
            <ul className="social-links">
                <li className="toolTip top" data-tip="Instagram"><a href={linkIg}><i class="fab fa-instagram"></i></a></li>
                <li className="toolTip top" data-tip="Facebook"><a href={linkFb}><i className="fab fa-facebook-f"></i></a></li>
            </ul>
            <Nav style={{justifyContent: "center"}}>
                <NavItem>
                    <NavLink className='nav-link' href="#">About us</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' href="#">Contact</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' href="#">Privacy policy</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' href="#">Shipping + Return</NavLink>
                </NavItem>
                
            </Nav>
            <br></br>
            
            <div className="content-footer-title">{nameEnterprise}</div>
            <div className="content-footer">{description}</div>
            <div className="content-footer-xs"><b>Email:</b> {email}</div>
            <div className="content-footer-xs"><b>Phone:</b> (+ 84) {phone}</div>
            <div className="content-footer-xs"><b>Address:</b> {address}</div>
            <br></br>
        </div>
    );
};

export default Footer;