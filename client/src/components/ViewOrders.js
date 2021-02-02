import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Table, Collapse, Card, CardBody, CardHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrder } from '../redux/actions/orderAction';
import { showLoading } from '../helpers/loading';

const ViewOrders = () => {
    const { orders, _pagination} = useSelector(state => state.orders)
    const { loading } = useSelector(state => state.loading)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 1,
        totalOrders : 1
    });

    const fontStyle = {
        fontFamily: 'Inconsolata'
    }

    const [order, setOrder] = useState({});
    const dispatch = useDispatch();

    const [filter, setFilter] = useState({
        limit: 10,
        page: 1
    })

    useEffect(() => {
        dispatch(getOrders(filter.limit,filter.page))   
    }, [dispatch, filter])
    
    useEffect(() => {
        if(_pagination){
            setPagination(_pagination);
        }
    }, [_pagination])

    const handleLoadMore = (newPage) => {
        setFilter({
            ...filter,
            page: newPage
        })
    }

    const [isOpen, setIsOpen] = useState(false);

    const openDetail = () => setIsOpen(true);
    const closeDetail = () => setIsOpen(false);

    const goToDetail = async (e, item) => {
        await closeDetail()
        setTimeout(() => {
            setOrder(item)
            openDetail()
        }, 500)
    }

    const handleUpdatePaid = item => {
        if (confirm('Are you sure to update ?')) { //eslint-disable-line
            var data = {
                _id : item._id,
                information : item.information,
                items : item.items,
                total : item.total,
                paid : true,
                delivered : item.delivered,
                paymentMethod: item.paymentMethod,
                confirmed :item.confirmed
            }
            dispatch(updateOrder(item._id, data))
        }
    }

    const handleUpdateDelivered = item => {
        if (confirm('Are you sure to update ?')) { //eslint-disable-line
            var data = {
                _id : item._id,
                information : item.information,
                items : item.items,
                total : item.total,
                paid : item.paid,
                delivered : true,
                paymentMethod: item.paymentMethod,
                confirmed :item.confirmed
            }
            dispatch(updateOrder(item._id, data))
        }
    }

    const handleUpdateConfirmed = item => {
        if (confirm('Are you sure to update ?')) { //eslint-disable-line
            var data = {
                _id : item._id,
                information : item.information,
                items : item.items,
                total : item.total,
                paid : item.paid,
                delivered : item.delivered,
                paymentMethod: item.paymentMethod,
                confirmed : true
            }
            dispatch(updateOrder(item._id, data))
        }
    }

    return (
        <Container fluid={true}>
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px"}}>
                <Row style={{padding: "20px", fontFamily: 'Inconsolata'}}>
                    <Col>
                    <h2 className="animated bounceInLeft font-effect-shadow-multiple" 
                            style={{margin : "20px 0px 20px 40px", fontFamily : "Sofia, sans-serif"}}>All Orders</h2>
                    <br></br>
                    {
                        loading && showLoading()
                    }
                    <Table hover responsive>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Order ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>CONFIRMED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders && orders.map((item, index) => {
                                    return <tr key={item._id} style={{cursor: "pointer"}}>
                                                <th scope="row">{index}</th>
                                                <td onClick={e => goToDetail(e, item)} >{item._id}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{Number(item.total).toLocaleString('en')}</td>
                                                <td>
                                                    {
                                                        item.paid ? 
                                                        (item.paid).toString()
                                                        : <Button color='danger' onClick={() => handleUpdatePaid(item)}>Paid</Button>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.delivered ? 
                                                        (item.delivered).toString()
                                                        : <Button color='warning' onClick={() => handleUpdateDelivered(item)}>Delivered</Button>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.confirmed ? 
                                                        item.confirmed.toString()
                                                        : <Button color='success' onClick={() => handleUpdateConfirmed(item)}>Confirm</Button>
                                                    }
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </Table>
                    {
                        pagination.page < Math.ceil(pagination.totalOrders / pagination.limit) &&
                        <Button onClick={e => handleLoadMore(pagination.page + 1)}>Load more...</Button>
                    }
                    </Col>
                    <Col>
                    <Collapse isOpen={isOpen}>
                        <Card>
                        <CardBody>
                            {
                                order._id &&
                                <p><b>ID : {order._id.toString()}</b></p>
                            }
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
                                <div style={fontStyle}>
                                <Card>
                                    <CardHeader>Information</CardHeader>
                                    <CardBody>
                                            {
                                                order.information && 
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
                                    {
                                        order.paymentMethod &&
                                        <CardBody><b> {order.paymentMethod}</b></CardBody>
                                    }
                                </Card>
                                <hr></hr>
                            </div>
                        </CardBody>
                        </Card>
                    </Collapse>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ViewOrders;