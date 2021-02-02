import React, { useState } from 'react';
import { Container, Row, Col, Modal, ModalFooter, ModalBody, ModalHeader, Button} from 'reactstrap';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import isEmpty from 'validator/lib/isEmpty';
import '../style/signin.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateNewPassword } from '../redux/actions/userAction';
import '../style/Checkout.css';

const ResetPassword = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading } = useSelector(state => state.loading)
    const { token } = match.params
    const [formData, setFormData] = useState({
        password : ''
    })

    const [modalSuccessful, setModalSuccessful] = useState(false);
    const toggleModelSuccessful = () => setModalSuccessful(!modalSuccessful);

    const { password } = formData;
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEmpty(password)){
            setFormData({
                ...formData,
                errorMsg : 'Password are required '
            })
        } else {
            const data = { password, token };

            dispatch(updateNewPassword(data))
            toggleModelSuccessful();
        }
    }

    const showSigninForm = () => (
        <div style={{margin : '50px 0 50px 0'}}>
            <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
                <div className="heading">Enter new password</div>
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
                            loading && showLoading()
                        }
                        {
                            showSigninForm()
                        }
                    </Col>
                </Row>
                <Modal isOpen={modalSuccessful} toggle={toggleModelSuccessful} >
                    <ModalHeader>Congratulations !</ModalHeader>
                    <ModalBody>
                    <div class="text-effect">
                        <span>P</span><span>a</span><span>s</span><span>s</span><span>w</span><span>o</span><span>r</span><span>d</span>{' '}
                        <span>U</span><span>p</span><span>d</span><span>a</span><span>t</span><span>e</span><span>d</span>{' '}
                        <span>S</span><span>u</span><span>c</span><span>c</span><span>e</span><span>s</span><span>s</span><span>f</span><span>u</span><span>l</span><span>l</span><span>y</span>
                    </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="dark" href='/signin'>Continue</Button>{' '}
                    <Button color="secondary" onClick={toggleModelSuccessful}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </div>
    )
}

export default ResetPassword;