import React from 'react';
import ServiceBox from './ServiceBox';
import { Container, Row, Col, Table, Button, Input } from 'reactstrap'; 
import '../style/Home.css';
import { useSelector } from 'react-redux';

const Home = () => {
    const { categories } = useSelector(state => state.categories)
    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "50px"}}>
                <Row>
                    <Col xs='12' sm='6' md='6' lg='6' style={{paddingBottom: '20px'}}>
                        <div className='category-grid' style={{fontFamily: 'Raleway'}}>
                            <div className='category-image'>
                                <a href='/collections/best-seller' className='image'>
                                    <img className='image-pic1' src='/img/bestSeller.jpeg'/>
                                </a>
                                <span className="category-label">Best seller</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs='12' sm='6' md='6' lg='6' style={{paddingBottom: '20px'}}>
                        <div className='category-grid'>
                            <div className='category-image'>
                                <a href='/collections/new' className='image'>
                                    <img className='image-pic2' src='/img/new.jpeg'/>
                                </a>
                                <span className="category-label">New collections</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col style={{paddingBottom: '20px'}}>
                        <div className='category-grid' style={{fontFamily: 'Raleway'}}>
                            <div className='category-image-new'>
                                <a href='/collections/sale' className='image'>
                                    <img className='image-pic1' src='/img/sale.jpeg' />
                                </a>
                                <span className="category-label">Sale</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    {
                        categories && categories.map(item => {
                            return <Col xs='12' sm='4' md='4' lg='4' style={{paddingBottom: '20px'}}>
                                    <div className='category-grid' style={{fontFamily: 'Raleway'}}>
                                        <div className='category-image'>
                                            <a className='image'>
                                                <img className='image-pic1' src={`/uploads/${item.imageCategory}`}/>
                                            </a>
                                            <span className="category-label1">{item.category}</span>
                                        </div>
                                    </div>
                                </Col>
                        })
                    }
                </Row>
            </div>
        </Container>
    )
}

export default Home;