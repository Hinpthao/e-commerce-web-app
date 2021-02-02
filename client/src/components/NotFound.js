import React from 'react';
import { Container } from 'reactstrap';

const NotFound = () => {
    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px", textAlign: 'center'}}>
                <h2 className="animated bounceInLeft font-effect-shadow-multiple" 
                        style={{margin : "100px", fontFamily : "Sofia, sans-serif"}}>404 Not found</h2>
            </div>
        </Container>
    )
}

export default NotFound;