import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByUserId } from '../redux/actions/orderAction';

const HistoryOrders = ({ match }) => {
    const { userId } = match.params;

    const { orders, _pagination} = useSelector(state => state.orders)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 1,
        totalOrders : 1
    });

    const dispatch = useDispatch();

    const [filter, setFilter] = useState({
        limit: 10,
        page: 1
    })

    useEffect(() => {
        dispatch(getOrdersByUserId(userId, filter.limit,filter.page))   
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

    const goToDetail = async (e, item) => {
        await localStorage.setItem('ORDER', JSON.stringify(item))
        window.location.href=`/orders/${item._id}`
    }
    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px"}}>
                <h2 className="animated bounceInLeft font-effect-shadow-multiple" 
                        style={{margin : "20px 0px 20px 40px", fontFamily : "Sofia, sans-serif"}}>History Orders</h2>
                <br></br>
                <Row style={{padding: "20px", fontFamily: 'Inconsolata'}}>
                    <Table hover responsive>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Order ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders && orders.map((item, index) => {
                                    return <tr key={item._id} onClick={e => goToDetail(e, item)} style={{cursor: "pointer"}}>
                                                <th scope="row">{index}</th>
                                                <td>{item._id}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{Number(item.total).toLocaleString('en')}</td>
                                                <td>{(item.paid).toString()}</td>
                                                <td>{(item.delivered).toString()}</td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </Table>
                    {
                        pagination.page < Math.ceil(pagination.totalOrders / pagination.limit) &&
                        <Button onClick={e => handleLoadMore(pagination.page + 1)}>Load more...</Button>
                    }
                </Row>
            </div>
        </Container>
    );
};

export default HistoryOrders;