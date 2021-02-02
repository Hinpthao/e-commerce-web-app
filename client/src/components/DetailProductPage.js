import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail } from '../redux/actions/productAction';
import {Container, Row, Col } from 'reactstrap';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const DetailProductPage = ({ match }) => {
    const productSlug = match.params.productSlug;
    const { product } = useSelector(state => state.products)
    const [detail, setDetail] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetail(productSlug));
    }, [dispatch])

    useEffect(() => {
        setDetail(product)
    }, [product])

    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px"}}>
                <Row>
                    <Col xs="12" sm="6" md="6" lg="6" xl="6">
                        <ProductImage detail={detail}/>
                    </Col>
                    <Col xs="12" sm="6" md="6" lg="6" xl="6">
                        <ProductInfo detail={detail}/>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default DetailProductPage;