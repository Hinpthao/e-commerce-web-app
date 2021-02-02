import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Container, Row, Col } from 'reactstrap';
import Pagination from './Pagination';
import ProductCard from './ProductCard';
import { getProductsBestSeller } from '../redux/actions/productAction';
import { showLoading } from '../helpers/loading';

const ProductsBestSellerPage = () => {
    const { products, _pagination} = useSelector(state => state.products)
    const { loading } = useSelector(state => state.loading)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 1,
        totalProducts: 11
    });

    const dispatch = useDispatch();

    const [filter, setFilter] = useState({
        limit: 9,
        page: 1
    })

    useEffect(() => {
        dispatch(getProductsBestSeller(filter.limit,filter.page))   
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

    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px"}}>
                <Row>
                    <h2 className="animated bounceInLeft font-effect-shadow-multiple" 
                        style={{margin : "20px 0px 40px 60px", fontFamily : "Sofia, sans-serif"}}>Best seller</h2>
                </Row>
                {
                    loading ? (
                        showLoading()
                    ) : (
                        <React.Fragment>
                             <Row>
                                {
                                    products && products.map(item => (
                                        <Col sm="6" md="4" xs="6" key={item._id} >
                                            <ProductCard key={item._id} product={item} />
                                        </Col>
                                    ))
                                }
                            </Row>
                            <Row>
                                <Pagination 
                                    pagination={pagination}
                                    onPageChange={handlePageChange} />
                            </Row>
                        </React.Fragment>
                    )
                }
            </div>
        </Container>
    );
};

export default ProductsBestSellerPage;