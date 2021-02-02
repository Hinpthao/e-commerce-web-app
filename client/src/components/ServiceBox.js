import React from 'react';
import '../style/ServiceBox.css';
import { Container, Row, Col } from 'reactstrap';

const ServiceBox = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div class="serviceBox">
                        <div class="service-icon">
                            <span><i class="fas fa-shipping-fast"></i></span>
                        </div>  
                        <h3 class="title">Nationwide Delivery </h3>
                        </div>
                </Col>
                <Col>
                    <div class="serviceBox">
                        <div class="service-icon">
                            <span><i class="fas fa-receipt"></i></span>
                        </div>
                        <h3 class="title">Diversity Payment method</h3>
                    </div>
                </Col>
                <Col>
                    <div class="serviceBox">
                        <div class="service-icon">
                            <span><i class="fa fa-globe"></i></span>
                        </div>
                        <h3 class="title">Web <span>Design</span></h3>
                        <p class="description">Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Qui quaerat fugit quas veniam perferendis repudiandae sequi, dolore quisquam illum.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ServiceBox;