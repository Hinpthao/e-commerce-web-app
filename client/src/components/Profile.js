import React, { useState, useEffect } from 'react';
import { Container, Row, Col, CardBody, CardHeader, Card, 
    CardText, Button, Collapse, CardSubtitle, CardImg, CardTitle, Form, Input, Label, FormGroup } from 'reactstrap';
import { showLoading } from '../helpers/loading';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetPassword } from '../redux/actions/userAction';

const Profile = () => {
    const { loading } = useSelector(state => state.loading);
    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const [err, setErr] = useState('');
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        _id : '',
        email : '',
        role : '',
        username: ''
    })

    const info = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if(info){
            setUser({
                _id : info._id,
                email : info.email,
                role : info.role,
                username : info.username
            })
        }
    }, [])

    const changeValue = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleUpdateProfile = e => {
        e.preventDefault();

        if(user.username === ''){
            setErr('User name is required')
            return;
        }
        const data = {
            email : user.email,
            role : user.role,
            username : user.username
        }
        
        dispatch(updateProfile(user._id, data))
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleResetPassword = e => {
        e.preventDefault();

        dispatch(resetPassword(user.email));
    }

    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px", fontFamily: 'Raleway'}}>
                <Row>
                    <Col xs='12' sm='4' md='4' lg='4'>
                        <Card>
                            <CardImg top style={{ width : "60%", borderRadius: '50%', margin: '30px auto', border: '1px solid #e6e6e7'}} src="/img/avatarDefault.svg" alt="Card image cap" />
                            <CardBody>
                            <CardTitle tag="h5">{user.username}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{user.role === 1 ? 'Admin' : 'Member'}</CardSubtitle>
                            <CardText><b>Email : </b>{user.email}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs='12' sm='8' md='8' lg='8'>
                        <Card>
                            <CardBody>
                                <b>Edit profile</b>
                                <hr></hr>
                                { errorMsg && showErrorMsg(errorMsg) }
                                { err && showErrorMsg(err) }
                                { successMsg && showSuccessMsg(successMsg) }
                                {
                                    loading ? showLoading() :
                                    <Form onSubmit={handleUpdateProfile}>
                                        <FormGroup>
                                            <Label>Name</Label>
                                            <Input
                                                value={user.username} 
                                                type='text'
                                                name='username'
                                                onChange={changeValue}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color='light' type='submit'>Update Name</Button>
                                        </FormGroup>
                                        <FormGroup> 
                                            <Button color='light' onClick={toggle}>Change Password</Button>
                                        </FormGroup>
                                        <Collapse isOpen={isOpen}>
                                            <Card>
                                            <CardBody>
                                            <Input 
                                                value={user.email}
                                            />
                                            <br></br>
                                            <Button color="warning" onClick={handleResetPassword}>Send email to reset password</Button>
                                            </CardBody>
                                            </Card>
                                        </Collapse>
                                    </Form>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default Profile;