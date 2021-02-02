import React from 'react';
import {Container, Row, Col, Table, CardHeader, CardBody, Card } from 'reactstrap';

const OrderDetail = () => {
    const order = JSON.parse(localStorage.getItem('ORDER'));

    const fontStyle = {
        fontFamily: 'Inconsolata'
    }
    
    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "20px"}}>
                    <h2 className="animated bounceInLeft font-effect-shadow-multiple" 
                        style={{margin : "0px 0px 10px 40px", fontFamily : "Sofia, sans-serif"}}>Order details</h2>
                <Row style={{padding: '20px 0 0 20px'}}>
                    <Col>
                        <div style={fontStyle}>
                            <Card>
                                <CardHeader>Information</CardHeader>
                                <CardBody>
                                        {
                                            order !== {} && 
                                            <React.Fragment>
                                                <p><b>Full name : </b> {order.information.fullname}</p>
                                                <p><b>Phone : </b> (+ 84) {order.information.phone}</p>
                                                <p><b>Address : </b> {order.information.address}</p>
                                            </React.Fragment>
                                        }
                                </CardBody>
                            </Card>
                            <hr></hr>
                            <Card>
                                <CardHeader>Payment Method</CardHeader>
                                <CardBody><b> {order.paymentMethod}</b></CardBody>
                            </Card>
                            <hr></hr>
                            <Card>
                                <CardHeader>Status</CardHeader>
                                <CardBody>
                                    <p><b>Paid : </b>{order.paid.toString()}</p>
                                    <p><b>Delivered : </b>{order.delivered.toString()}</p>
                                    <p><b>Confirmed : </b>{order.confirmed.toString()}</p>                                  
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <Row style={{padding: ' 0 20px'}}>
                            <Card style={{margin: ' 0 0 20px 0'}}>
                                <CardBody>
                                    <p><b>ID : </b>{order._id.toString()}</p>
                                </CardBody>
                            </Card>
                        {
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
                                            order.items && order.items.map(item => {
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
                        <Row style={{paddingRight: '20px'}}>
                            <br></br>
                            <br></br>
                            <span style={{marginLeft: "auto", 
                                            fontFamily: "Leckerli One",
                                            fontSize: "25px"
                                        }}>
                                Total: {' '}
                                <span style={{ fontFamily: "serif"}}>{
                                    Number(order.total).toLocaleString('en')
                                }₫</span>
                            </span>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default OrderDetail;