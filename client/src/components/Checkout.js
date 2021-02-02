import React, { useEffect, useState, Fragment }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Container, Row, Col, Table, Input, Button, Label, 
        FormGroup, Collapse, CardBody, Card, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { isAuthenticated } from '../helpers/auth';
import axios from 'axios';
import CheckoutStep from './CheckoutStep';
import { showErrorMsg } from '../helpers/message';
import { useHistory } from 'react-router-dom';
import PaymentMethod from './PaymentMethod';
import { addOrder } from '../redux/actions/orderAction';
import { showLoading } from '../helpers/loading';
import '../style/Checkout.css';

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const history = useHistory()
    const { loading } = useSelector(state => state.loading)

    const [orderId, setOrderId] = useState('');
    const [shippingFee, setShippingFee] = useState(30000);
    const [items, setItems] = useState(cart ? cart : []);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [info, setInfo] = useState({
        _id : '',
        fullname: '',
        email: '',
        phone: '',
        address: ''
    })
    const [proDisWar, setProDisWar] = useState({
        province: null,
        district : null,
        ward : null
    })
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('');

    const labelStyle = {
        fontFamily: 'Inconsolata'
    }


    const getData = async() => {
        const res = await axios.get('https://api.mysupership.vn/v1/partner/areas/province');
        setProvinces(res.data.results);
    }

    const {order} = useSelector(state => state.orders)

    useEffect(() => {
        if(cart.length === 0) history.goBack()
    }, [])

    useEffect(() => {
        if(order){
            setOrderId(order._id)
            console.log(order._id)
        }
    }, [order])

    useEffect( () => {
        getData()
    }, [])

    const { fullname, email, phone, address } = info;

    const style = {
        borderRadius: '50px',
        backgroundColor: 'black',
        color : 'white',
        padding: "10px",
        boxShadow: '5px 10px 18px #888888',
        border : "1px",
        marginLeft: 'auto',
        margin: '20px 20px 20px auto'
    }

    const inButton = e => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = 'black';
    }
    const outButton = e => {
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
    }

    const total = (items) => {
        var total = 0;
        if(items.length > 0){
            for(var i = 0; i < items.length ; i++){
                total += items[i].product.productPrice * items[i].quantity
            }
        }
        return total;
    }

    const handleInforChange = e => {
        setClientSideErrorMsg('');
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        var data = JSON.parse(localStorage.getItem('user'));
        if(data){
            setInfo({
                ...info,
                email : data.email
            })
        }
    }, [])

    const handleChangeProvince = async e => {
        setClientSideErrorMsg('');
        setProDisWar({
            ...proDisWar,
            province : provinces.find(item => item.code === e.target.value).name
        });
        const res = await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${e.target.value}`);
        setDistricts(res.data.results);
    }

    const handleChangeDistrict= async e => {
        setClientSideErrorMsg('');
        setProDisWar({
            ...proDisWar,
            district : districts.find(item => item.code === e.target.value).name
        });
        const res = await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${e.target.value}`);
        setWards(res.data.results);
    }

    const handleChangeWard = e => {
        setClientSideErrorMsg('');
        setProDisWar({
            ...proDisWar,
            ward : wards.find(item => item.code === e.target.value).name
        });
    }

    const handleAddressChange = e => {
        setClientSideErrorMsg('');
        setInfo({
            ...info,
            address: e.target.value 
        })
    }

    const handleGoToPaymentMethod = (e) => {
        if(fullname === '' || email === '' || phone === '' || address === '' 
            || proDisWar.province === null || proDisWar.district === null || proDisWar.ward === null){
            setClientSideErrorMsg('All feild is required');
            return;
        }
        setIsOpen(!isOpen);
        window.scrollBy(0, 500);
    }

    const [isOpen, setIsOpen] = useState(false);

    const [modalSuccessful, setModalSuccessful] = useState(false);

    const toggleModelSuccessful = () => setModalSuccessful(!modalSuccessful);

    const finishOrder = (method) => {
        var data = JSON.parse(localStorage.getItem('user'));
        var order = {
            information : {
                _id: isAuthenticated ? data._id : null,
                fullname: fullname,
                email: email,
                phone: phone,
                address : address + ',' + proDisWar.ward + ',' + proDisWar.district + ',' + proDisWar.province 
            },
            items : items,
            total : total(items) + shippingFee,
            paid: false,
            delivered: false,
            paymentMethod : method,
            confirmed : false
        }

        dispatch(addOrder(order))
        setIsOpen(false)
        toggleModelSuccessful();
    }    

    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px"}}>
            <Row>
                <Col>
                    <Row style={{padding: '20px'}}>
                        <CheckoutStep />
                        <h2 className="animated bounceInLeft font-effect-shadow-multiple" 
                            style={{margin : "20px 0px 40px 40px", fontFamily : "Sofia, sans-serif"}}>Shipping Information</h2>
                    </Row>
                    {
                        !isAuthenticated() ? (
                            <Fragment>
                                <p style={{padding: '0 50px 0 50px', fontFamily: 'Dosis'}}>Already have an account with us ? {' '}
                                <a href="/signin" style={{color: "black", fontWeight:"bold"}}>Sign in</a></p>
                                { clientSideErrorMsg && showErrorMsg(clientSideErrorMsg) }
                                <FormGroup>
                                    <Label for="fullname" style={labelStyle}>Full name</Label>
                                    <Input 
                                        type='text'
                                        name="fullname"
                                        value={fullname}
                                        onChange={handleInforChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email" style={labelStyle}>Email</Label>
                                    <Input 
                                        type='text'
                                        name="email"
                                        value={email}
                                        onChange={handleInforChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone" style={labelStyle}>Phone</Label>
                                    <Input 
                                        type='number'
                                        name="phone"
                                        value={phone}
                                        onChange={handleInforChange}
                                    />  
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address" style={labelStyle}>Address (Number, street)</Label>
                                    <Input 
                                        type='text'
                                        name="address"
                                        value={address}
                                        onChange={handleAddressChange}
                                    />
                                </FormGroup>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="province" style={labelStyle}>Province</Label>
                                            <Input type="select" name="province" id="province" onChange={handleChangeProvince}>
                                                <option value={null}>Choose province</option>
                                                {
                                                    provinces && provinces.map(item => {
                                                        return <option key={item.code} value={item.code}>{item.name}</option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="district" style={labelStyle}>District</Label>
                                            <Input type="select" name="district" id="district" onChange={handleChangeDistrict}>
                                                <option value={null} >Choose district</option>
                                                {
                                                    districts && districts.map(item => {
                                                        return <option key={item.code} value={item.code}>{item.name}</option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="ward" style={labelStyle}>Ward</Label>
                                            <Input type="select" name="ward" id="ward" onChange={handleChangeWard}>
                                                <option value={null} >Choose ward</option>
                                                {
                                                    wards && wards.map(item => {
                                                        return <option key={item.code} value={item.code}>{item.name}</option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    { clientSideErrorMsg && showErrorMsg(clientSideErrorMsg) }
                                    <FormGroup>
                                        <Label for="fullname" style={labelStyle}>Full name</Label>
                                        <Input 
                                            type='text'
                                            name="fullname"
                                            value={fullname}
                                            onChange={handleInforChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email" style={labelStyle}>Email</Label>
                                        <Input 
                                            type='text'
                                            name="email"
                                            value={email}
                                            onChange={handleInforChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone" style={labelStyle}>Phone</Label>
                                        <Input 
                                            type='number'
                                            name="phone"
                                            value={phone}
                                            onChange={handleInforChange}
                                        />  
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address" style={labelStyle}>Address (Number, street)</Label>
                                        <Input 
                                            type='text'
                                            name="address"
                                            value={address}
                                            onChange={handleAddressChange}
                                        />
                                    </FormGroup>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="province" style={labelStyle}>Province</Label>
                                                <Input type="select" name="province" id="province" onChange={handleChangeProvince}>
                                                <option value={null}>Choose province</option>
                                                    {
                                                        provinces && provinces.map(item => {
                                                            return <option key={item.code} value={item.code}>{item.name}</option>
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="district" style={labelStyle}>District</Label>
                                                <Input type="select" name="district" id="district" onChange={handleChangeDistrict}>
                                                <option value={null}>Choose district</option>
                                                    {
                                                        districts && districts.map(item => {
                                                            return <option key={item.code} value={item.code}>{item.name}</option>
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="ward" style={labelStyle}>Ward</Label>
                                                <Input type="select" name="ward" id="ward" onChange={handleChangeWard}>
                                                <option value={null} >Choose ward</option>
                                                    {
                                                        wards && wards.map(item => {
                                                            return <option key={item.code} value={item.code}>{item.name}</option>
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                            </Fragment>
                        )
                    }
                    <Row style={{padding: '20px'}}>
                        <button onClick={handleGoToPaymentMethod} 
                                style={style} 
                                onMouseEnter={inButton} 
                                onMouseLeave={outButton}
                                >GO TO PAYMENT METHOD</button>
                        <Collapse isOpen={isOpen} style={{width: "100%"}}>
                            <Card >
                            <CardBody>
                            <Row style={{padding: '20px'}}>
                                <h2 className="animated bounceInLeft font-effect-shadow-multiple" style={{margin : "20px 0px 40px 20px", fontFamily : "Sofia, sans-serif"}}>Payment method</h2>
                            </Row>
                            {
                                loading ? (
                                    showLoading()
                                ) : (
                                    <PaymentMethod finishOrder={finishOrder}/>
                                )
                            }
                            </CardBody>
                            </Card>
                        </Collapse>
                    </Row>
                </Col>
                <Col style={{backgroundColor: "#ededed"}}>
                    <Row style={{padding: '20px'}}>
                    {
                        items.length === 0 ?
                        <p style={{padding: '50px', fontFamily: 'Dosis'}}>Your shopping cart is empty</p> :
                        <Table>
                                <thead>
                                    <tr>
                                    <th style={{fontFamily: 'Leckerli One'}}>Item</th>
                                    <th style={{fontFamily: 'Leckerli One'}}>Quantity</th>
                                    <th style={{fontFamily: 'Leckerli One'}}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items && items.map(item => {
                                            return <tr key={item.product._id}>
                                                        <td onClick={e => window.location.href=`/products/${item.product.slug}`} style={{cursor: "pointer"}}>
                                                            <img style={{width: '100px'}} 
                                                                src={`/uploads/${item.product.productImages[0]}`}
                                                                />
                                                            <span style={{marginLeft: "20px", textTransform: "uppercase", fontFamily: "Trirong"}}>{item.product.productName}</span>
                                                        </td>
                                                        <td style={{lineHeight: "100px"}}>
                                                            {item.quantity}
                                                        </td>
                                                        <td style={{lineHeight: "100px"}}>{Number(item.product.productPrice).toLocaleString('en')}₫</td>
                                                    </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        }
                    </Row>
                    <hr></hr>
                    <Row style={{padding: '20px'}}>
                        <Input 
                            placeHolder='Discount code'
                            style={{width: '70%', display: 'inline-block'}}
                        />
                        <Button color='dark' style={{marginLeft: 'auto', width: '26%'}}>Apply</Button>
                    </Row>
                    <hr></hr>
                    <Row style={{paddingRight: '20px'}}>
                        <br></br>
                        <br></br>
                        <span style={{marginLeft: "auto", 
                                        fontFamily: "Leckerli One",
                                        fontSize: "20px"
                                    }}>
                            Sub total : {' '}
                            <span style={{ fontFamily: "serif"}}>{
                                Number(total(items)).toLocaleString('en')
                            }₫</span>
                        </span>
                    </Row>
                    <Row style={{paddingRight: '20px'}}>
                        <br></br>
                        <br></br>
                        <span style={{marginLeft: "auto", 
                                        fontFamily: "Leckerli One",
                                        fontSize: "20px"
                                    }}>
                            Shipping fee : {' '}
                            <span style={{ fontFamily: "serif"}}>{
                                Number(shippingFee).toLocaleString('en')
                            }₫</span>
                        </span>
                    </Row>
                    <hr></hr>
                    <Row style={{paddingRight: '20px'}}>
                        <br></br>
                        <br></br>
                        <span style={{marginLeft: "auto", 
                                        fontFamily: "Leckerli One",
                                        fontSize: "25px"
                                    }}>
                            Total: {' '}
                            <span style={{ fontFamily: "serif"}}>{
                                Number(total(items) + shippingFee).toLocaleString('en')
                            }₫</span>
                        </span>
                    </Row>
                    <br></br>
                </Col>
            </Row>
            </div>

            <Modal isOpen={modalSuccessful} toggle={toggleModelSuccessful} >
                <ModalHeader>Congratulations !</ModalHeader>
                <ModalBody>
                <div class="text-effect">
                    <span>O</span><span>r</span><span>d</span><span>e</span><span>r</span>{' '}
                    <span>S</span><span>u</span><span>c</span><span>c</span><span>e</span><span>s</span><span>s</span><span>f</span><span>u</span><span>l</span><span>l</span><span>y</span>
                </div>
                </ModalBody>
                <ModalFooter>
                <Button color="dark" href={`/orders/${orderId}`}>Go to your order</Button>{' '}
                <Button color="secondary" onClick={toggleModelSuccessful}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default Cart;