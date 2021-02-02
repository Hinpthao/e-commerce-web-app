import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Button } from 'reactstrap';
import Pagination from './Pagination';
import { getProducts, deleteProduct } from '../redux/actions/productAction';

const AdminBody = () => {
    const { products, _pagination} = useSelector(state => state.products)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 1,
        totalProducts: 11
    });

    const dispatch = useDispatch();

    const [filter, setFilter] = useState({
        limit: 20,
        page: 1
    })

    useEffect(() => {
        dispatch(getProducts(filter.limit,filter.page))
        
    }, [dispatch, filter])
    
    useEffect(() => {
        if(_pagination){
            setPagination(_pagination);
        }
    }, [_pagination])

    const handlePageChange = (newPage) => {
        setFilter({
            ...filter,
            page: newPage
        })
    }

    const handleDeleteProduct = (productID) => {
        if (confirm('Are you sure to delete this product ?')) { //eslint-disable-line
            dispatch(deleteProduct(productID))
        }
    }

    return (
        <div>
            <Row style={{backgroundColor: 'white'}}>
            <Table hover responsive>
                <thead style={{fontFamily: 'Raleway'}}>
                    <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Purchases</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody style={{fontFamily: 'Raleway'}}> 
                    {
                        products && products.map(item => {
                            return <tr key={item._id}>
                                        <td style={{cursor: "pointer"}} onClick={e => window.location.href=`/products/${item.slug}`}>
                                            <img style={{width: '100px'}} 
                                                src={`/uploads/${item.productImages[0]}`}
                                                />
                                        </td>
                                        <td>{item._id}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.productQuantity}</td>
                                        <td>{Number(item.productPrice).toLocaleString('en')}₫</td>
                                        <td>{item.percDiscount}%</td>
                                        <td>{item.numOfPurchs}</td>
                                        <td>
                                            <Button color="warning" href={`/admin/edit/product/${item._id}`}>Edit</Button>{' '}
                                            <Button color="danger" onClick={() => handleDeleteProduct(item._id)}>Delete</Button>
                                        </td>
                                    </tr>
                        })
                    }
                    
                </tbody>
            </Table>
            </Row>
            <Row>
                <Pagination 
                    pagination={pagination}
                    onPageChange={handlePageChange} />
            </Row>
        </div>
    );
}

export default AdminBody;

