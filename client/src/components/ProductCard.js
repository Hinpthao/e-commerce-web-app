import React, { useState, useEffect } from 'react';
import '../style/ProductCard.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthenticated} from '../helpers/auth';
import { addToCart } from '../redux/actions/cartAction';
import '../style/Checkout.css';
import { Modal, ModalFooter, ModalBody, ModalHeader, Button, Row, Col, Container } from 'reactstrap';
import ImageGallery from 'react-image-gallery';
import ProductInfo from './ProductInfo';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [Images, setImages] = useState([]);
    const [detail, setDetail] = useState({});

    const onAddToCart = (product, quantity) => {
        dispatch(addToCart(product, quantity))
        toggleModelSuccessful();
    }

    const [modalSuccessful, setModalSuccessful] = useState(false);
    const toggleModelSuccessful = () => setModalSuccessful(!modalSuccessful);

    const [modalQuickView, setModalQuickView] = useState(false);
    const toggleModeQuickView = (product) => {
        setDetail(product)
        setModalQuickView(!modalQuickView);
    }

    useEffect(() => {
        if(detail.productImages && detail.productImages.length > 0){
            let images = [];

            detail.productImages && detail.productImages.map(item => {
                images.push({
                    original: `/uploads/${item}`,
                    thumbnail: `/uploads/${item}`
                })
            })
            setImages(images)
        }
    }, [detail])

    return (
        <div className="product-grid">
            <div className="product-image">
                <a href={`/products/${product.slug}`} className="image">
                    <img className='pic-0' src={`/uploads/${product.productImages[0]}`}/>
                    <img className='pic-1' 
                        src={
                            product.productImages[1] ? `/uploads/${product.productImages[1]}` 
                            : '/img/defaultImage.jpg'
                        }/>
                </a>
                {
                    product.productNew ? 
                    <span className="product-new-label">new!</span> : ''
                }
                {
                    product.percDiscount > 0 ?
                    <span className="product-discount-label">-{Math.round(product.percDiscount * 100) / 100}%</span>
                    : ''
                }
                {
                    product.productQuantity === 0 ?
                    <span className="product-out-of-stock-label">SOLD OUT</span>
                    : ''
                }
                <a href="#" className="product-quick-view" data-tip="Quick View" onClick={() => toggleModeQuickView(product)}><i className="fa fa-eye"></i></a>
                {
                    product.productQuantity !== 0 ?
                    <a onClick={() => onAddToCart(product, 1)} className="product-add-to-cart" data-tip="Add to cart"><i className="fa fa-shopping-cart"></i></a>
                    : ''
                }
            </div>
            <div className="product-content">
                <h3 className="title"><a href={`/products/${product.slug}`}>{product.productName}</a></h3>
                {
                    product.percDiscount > 0 ? <div>
                        <strike className="price">{Number(Math.round(product.productPrice * 100 / (100 - product.percDiscount)  / 1000) * 1000).toLocaleString('en')}₫</strike>
                        {' '}
                        <div className="price">{Number(product.productPrice).toLocaleString('en')}₫</div>
                    </div> : ''
                }
                {
                    product.percDiscount <= 0 ? <div>
                        <div className="price">{Number(product.productPrice).toLocaleString('en')}₫</div>
                    </div> : ''
                }
            </div>
            <Modal isOpen={modalSuccessful} toggle={toggleModelSuccessful} >
                <ModalHeader>Congratulations !</ModalHeader>
                <ModalBody>
                <div class="text-effect">
                    <span>A</span><span>d</span><span>d</span>{' '}
                    <span>T</span><span>o</span>{' '}
                    <span>C</span><span>a</span><span>r</span><span>t</span>{' '}
                    <span>S</span><span>u</span><span>c</span><span>c</span><span>e</span><span>s</span><span>s</span><span>f</span><span>u</span><span>l</span><span>l</span><span>y</span>
                </div>
                </ModalBody>
                <ModalFooter>
                <Button color="dark" href='/cart'>Go to your cart</Button>{' '}
                <Button color="secondary" onClick={toggleModelSuccessful}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalQuickView} toggle={toggleModeQuickView} size='lg'>
                <ModalHeader style={{justifyContent: 'flex-end'}}>
                    <i class="fas fa-times" onClick={toggleModeQuickView}></i>
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col xs='12' sm='6' md='6' lg='6'>
                                <ImageGallery items={Images} autoPlay="true" />
                            </Col>
                            <Col xs='12' sm='6' md='6' lg='6'>
                                <ProductInfo detail={detail}/>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        </div> 
    )  
}

export default ProductCard;