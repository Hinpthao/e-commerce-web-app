import React from 'react';
import { Spinner } from 'reactstrap';
import '../style/loading.css';

export const showLoading = () => (
    <div style={{textAlign : "center", margin : "20px"}}>
        <div className="loader-wrapper">
            <div className="loader">
                <div className="roller"></div>
                <div className="roller"></div>
            </div>
        
            <div id="loader2" className="loader">
                <div className="roller"></div>
                <div className="roller"></div>
            </div>
        
            <div id="loader3" className="loader">
                <div className="roller"></div>
                <div className="roller"></div>
            </div>
        </div>
    </div>
)