import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ModalFooter, Modal, ModalHeader, ModalBody , Button} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { signin } from '../api/auth';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import '../style/signin.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/actions/userAction';

const Signin = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    const load = useSelector(state => state.loading.loading);
    const err = useSelector(state => state.messages.errorMsg)
    const succ = useSelector(state => state.messages.successMsg)

    useEffect(() => {
        if(isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0){
            history.push('/user/dashboard');
        }
    }, [history])

    const [emailForReset, setEmailForReset] = useState('');

    const [formData, setFormData] = useState({
        email : '',
        password : '',
        errorMsg : false,
        loading : false
    })

    const { email, password, errorMsg, loading} = formData;
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
            errorMsg : ''
        })
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEmpty(email) || isEmpty(password)){
            setFormData({
                ...formData,
                errorMsg : 'All fields are required '
            })
        } else if (!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg : 'Invalid email'
            })
        } else {
            const { email, password } = formData;
            const data = {  email, password };

            setFormData({
                ...formData,
                loading : true
            })

            signin(data)
                .then(res => {
                    setAuthentication(res.data.token, res.data.user);
                    
                    if(isAuthenticated() && isAuthenticated().role === 1) {
                        console.log('Redirect to admin dashboard')
                        history.push('/admin/dashboard');
                    } else {
                        history.push('/');
                    }
                })
                .catch(err => {
                    console.log("Signin api function error : ", err)
                    setFormData({
                        ...formData,
                        loading : false,
                        errorMsg : err.response.data.errorMessage
                    })
                })
        }
    }

    const handleResetPassword = () => {
        dispatch(resetPassword(emailForReset));
    }

    const showSigninForm = () => (
        <div style={{margin : '50px 0 50px 0'}}>
            <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
                <div className="heading">Sign in</div>
                <div className="form-group">
                    <i className="fa fa-user"></i>
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
                    <button 
                        type="submit" 
                        className="btn btn-default">
                            <i className="fa fa-arrow-right"></i>
                    </button>
                    <span>Don't have an account?  {' '}
                        <a href="/signup" className="create_account">Sign up</a>
                    </span>
                    <br></br>
                    <br></br>
                    <div>
                        <a onClick={toggle} className="create_account">Forgot your password</a>
                        <Modal isOpen={modal} toggle={toggle} >
                            <ModalHeader toggle={toggle}>Reset password</ModalHeader>
                            <ModalBody>
                                {
                                    load ? showLoading() : 
                                    <React.Fragment>
                                        { err && showErrorMsg(err)}
                                        { succ && showSuccessMsg(succ)}
                                        <div className="form-group">
                                            <input 
                                                required="" 
                                                type="email" 
                                                className="form-control" 
                                                placeHolder="Enter email to reset password" 
                                                id="email" 
                                                value={emailForReset}
                                                onChange={(e) => setEmailForReset(e.target.value)}/>
                                        </div>
                                    </React.Fragment>
                                }
                            </ModalBody>
                            <ModalFooter>
                            <Button color="light"onClick={handleResetPassword}>Send email</Button>{' '}
                            <Button color="danger" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
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
                            loading && showLoading()
                        }
                        {
                            showSigninForm()
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signin;