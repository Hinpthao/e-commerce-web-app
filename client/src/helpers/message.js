import React from 'react';
import { Alert } from 'reactstrap';

export const showErrorMsg = msg => (
    <Alert 
        color="danger" 
        style={{marginTop : "20px"}}>
            {msg}
    </Alert>
);
export const showSuccessMsg = msg => (
    <Alert 
        color="warning" 
        style={{marginTop : "10px"}}>
            {msg}
    </Alert>
);