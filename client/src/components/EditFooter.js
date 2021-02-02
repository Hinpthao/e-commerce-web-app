import React, { useState, useEffect } from 'react';
import { editFooter, getFooter } from '../redux/actions/footerAction';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';

const EditFooter = () => {
    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const { footer } = useSelector(state => state.footer)
    const { loading } = useSelector(state => state.loading)
    
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        _id : '',
        nameEnterprise : '',
        description : '',
        email : '',
        phone : '',
        address : '',
        linkFb : '',
        linkIg : ''
    })

    const style = {
        fontFamily: 'ui-serif'
    }

    const {
        _id,
        nameEnterprise,
        description,
        email,
        phone ,
        address ,
        linkFb,
        linkIg,
    } = formData;

    useEffect(() => {
        dispatch(getFooter());
    }, [dispatch])

    useEffect(() => {
        if(footer){
            setFormData({
                ...formData,
                _id : footer._id,
                nameEnterprise: footer.nameEnterprise,
                description: footer.description,
                email: footer.email,
                phone: footer.phone ,
                address: footer.address ,
                linkFb: footer.linkFb,
                linkIg: footer.linkIg,
            })
        }
    }, [footer])


    const handleChangeForm = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
        console.log(formData )
    }   

    const handleFooter = (e) => {
        e.preventDefault();
       
        var data = {
            nameEnterprise : nameEnterprise,
            description : description,
            email : email,
            phone : phone,
            address : address,
            linkFb : linkFb,
            linkIg : linkIg
        }

        console.log(data)
        
        // let frmData = new FormData();

        // frmData.append('nameEnterprise', nameEnterprise);
        // frmData.append('description', description);
        // frmData.append('email', email);
        // frmData.append('phone', phone);
        // frmData.append('address', address);
        // frmData.append('linkFb', linkFb);
        // frmData.append('linkIg', linkIg);

        dispatch(editFooter(_id, data))
        
       // history.push('/admin/dashboard');
    }

    return (
        <Container>
            <div style={{ backgroundColor: "#f8f9fa", padding: "50px"}}>  
            <Row>
                <h2 className="animated bounceInLeft" style={{margin : "0 20px 20px 20px", fontFamily : "fantasy"}}>Edit Footer</h2>
            </Row> 
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={handleFooter} noValidate>
                        { errorMsg && showErrorMsg(errorMsg) }
                        { successMsg && showSuccessMsg(successMsg) } 
                        {
                            loading ? (
                                showLoading()
                                ) : (
                                    <div>
                                    <FormGroup>
                                        <Label style={style} for="enterpriseName">Name of enterprise</Label>
                                        <Input 
                                            type="text" 
                                            name="nameEnterprise" 
                                            id="enterpriseName" 
                                            value={nameEnterprise}
                                            onChange={handleChangeForm}
                                            />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={style} for="description">Description</Label>
                                        <Input 
                                            type="text" 
                                            name="description" 
                                            id="description" 
                                            value={description}
                                            onChange={handleChangeForm}
                                            />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={style} for="email">Email</Label>
                                        <Input 
                                            type="email" 
                                            name="email" 
                                            value={email}
                                            onChange={handleChangeForm}
                                            id="email" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={style} for="phone">Phone </Label>
                                        <Input 
                                            type="number" 
                                            name="phone" 
                                            value={phone}
                                            onChange={handleChangeForm}
                                            id="phone" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={style} for="address">Address </Label>
                                        <Input 
                                            type="text" 
                                            name="address" 
                                            value={address}
                                            onChange={handleChangeForm}
                                            id="address" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={style} for="linkFb">Link of Facebook </Label>
                                        <Input 
                                            type="text" 
                                            name="linkFb" 
                                            value={linkFb}
                                            onChange={handleChangeForm}
                                            id="FBlink" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={style} for="linkIg">Link of Instagram </Label>
                                        <Input 
                                            type="text" 
                                            name="linkIg" 
                                            value={linkIg}
                                            onChange={handleChangeForm}
                                            id="linkIg" />
                                    </FormGroup>
                                </div>
                            )
                        }
                        <Button color="dark" type='submit'>OK</Button>{' '}
                    </Form>
                </Col>
            </Row>
            </div>
        </Container>
    );
};

export default EditFooter;