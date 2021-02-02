import React, {useState, useEffect} from 'react';
import { Button,Container, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { signup } from '../api/auth';
import { isAuthenticated } from '../helpers/auth';
import '../style/signin.css';

const Signup = () => {
    let history = useHistory();

    useEffect(() => {
        if(isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0){
            history.push('/user/dashboard');
        }
    }, [history])

    const [formData, setFormData] = useState({
        username: 'thao',
        email : 'thao@abc.com',
        password : '12345678',
        confirmPassword : '12345678',
        successMsg : false,
        errorMsg : false,
        loading : false  
    })

    const {username, email, password, confirmPassword, successMsg, errorMsg, loading} = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
            successMsg : '',
            errorMsg : ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)){
            setFormData({
                ...formData,
                errorMsg : 'All fields are required '
            })
        } else if (!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg : 'Invalid email'
            })
        } else if (!equals(password, confirmPassword)){
            setFormData({
                ...formData,
                errorMsg : "Passwords do not match"
            })
        } else {
            const { username, email, password } = formData;
            const data = { username, email, password };

            setFormData({
                ...formData,
                loading : true
            })

            signup(data)
            .then(res => {
                console.log('Axios signup success : ', res)
                setFormData({
                    username: '',
                    email : '',
                    password : '',
                    confirmPassword : '',
                    loading : false,
                    successMsg : res.data.successMessage
                })
            })
            .catch(err => {
                console.log('Axios signup error : ', err)
                setFormData({
                    ...formData,
                    loading : false,
                    errorMsg: err.response.data.errorMessage
                })
            })
        }
    }

    const showSignupForm = () => (
        
        <div style={{margin : '50px 0 50px 0'}}>
            <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
                <div className="heading">Sign up</div>
                
                <div className="form-group">
                    <i className="fa fa-user"></i>
                    <input 
                        required="" 
                        name="username" 
                        type="text" 
                        className="form-control" 
                        placeHolder="Name" 
                        id="username" 
                        value={username}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <i className="fa fa-envelope"></i>{' '}
                    <input 
                        required="" 
                        name="email" 
                        type="email" 
                        className="form-control" 
                        placeHolder="Email" 
                        id="email" 
                        value={email}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <i className="fa fa-lock"></i>
                    <input 
                        required="" 
                        name="password" 
                        type="password" 
                        className="form-control" 
                        placeHolder="Password" 
                        value={password}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <i className="fa fa-lock"></i>
                    <input 
                        required="" 
                        name="confirmPassword" 
                        type="password" 
                        className="form-control" 
                        placeHolder="Confirm Password" 
                        value={confirmPassword}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btn btn-default">
                            <i className="fa fa-arrow-right"></i>
                    </button>
                    <span>Have an account? <a href="/signin" className="create_account">Sign in</a></span>
                </div>
            </form>
        </div>
    );

    return (
        <div style={{marginTop : "50px"}}>
            <Container style={{backgroundColor : "#f8f9fa"}}>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        {
                            errorMsg && showErrorMsg(errorMsg)
                        }
                        {
                            successMsg && showSuccessMsg(successMsg)
                        }
                        {
                            loading && showLoading()
                        }
                        {
                            showSignupForm()
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup;
