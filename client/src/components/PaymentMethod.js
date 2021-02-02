import React, { useState } from 'react';
import { FormGroup, CustomInput, Label, Collapse, Card, CardBody, Alert } from 'reactstrap';

const PaymentMethod = ({ finishOrder }) => {
    const [method, setMethod] = useState('');

    const [isOpen1, setIsOpen1] = useState(false);
    const [err, setErr] = useState('');

    const handleClickOption1 = (e) => {
        setErr('');
        setMethod(e.target.value)
        setIsOpen1(true);
        setIsOpen2(false)
    }

    const [isOpen2, setIsOpen2] = useState(false);

    const handleClickOption2 = (e) => {
        setErr('');
        setMethod(e.target.value)
        setIsOpen2(true);
        setIsOpen1(false);
    }

    const style = {
        borderRadius: '50px',
        backgroundColor: 'black',
        color : 'white',
        padding: "10px",
        boxShadow: '5px 10px 18px #888888',
        border : "1px",
        margin: "20px"
    }

    const inButton = e => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = 'black';
    }
    const outButton = e => {
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
    }

    const handleFinishOrder = e => {
        if(method === ''){
            setErr('Please choose a payment method')
            return
        }
        finishOrder(method);
    }

    return (
       <div>
           <FormGroup>
               { err ? <Alert color="danger" >{err}</Alert> : ''}
                <div>
                <CustomInput type="radio" name="customRadio" 
                    label="Cash on Delivery (COD AVAILABLE NATIONWIDE )" 
                    id="exampleCustomRadio1"
                    onChange={handleClickOption1}
                    value='COD' 
                    style={{ marginBottom: '10px' }}/>
                <Collapse isOpen={isOpen1}>
                    <Card>
                    <CardBody>
                    - Liên lạc trực tiếp bộ phận sale qua số điện thoại : +84 976532372 để thông báo là bạn đã order trên trang web , hoặc bộ phận sale sẽ liên lạc với bạn trong thời gian sớm nhất.
                    </CardBody>
                    </Card>
                </Collapse>
                <CustomInput type="radio" id="exampleCustomRadio2" 
                    onChange={handleClickOption2}
                    name="customRadio" 
                    value='BANKING'
                    label="Chuyển khoản qua ngân hàng / Bank transfer" 
                    style={{ marginBottom: '1rem' }}/>
                <Collapse isOpen={isOpen2}>
                    <Card>
                    <CardBody>
                    - Liên lạc trực tiếp bộ phận sale qua số điện thoại : +84 987654321 để thông báo là bạn đã order trên trang web , hoặc bộ phận sale sẽ liên lạc với bạn trong thời gian sớm nhất.
                    <br></br>
                    - Bộ phận sale sẽ xác nhận lại đơn hàng của bạn , thông tin, tổng giá tiền và thời gian giao hàng.
                    <br></br>
                    - Thời gian thực hiện chuyển khoản ngân hàng trong 48 giờ kể từ khi xác nhận đơn hàng.
                    <br></br>
                    <br></br>
                    THÔNG TIN TÀI KHOẢN :
                    <br></br>
                    Chủ TK : ABC XYZ
                    <br></br>
                    Số TK : XXXXXXXXXXXXX
                    <br></br>
                    VIETCOMBANK - CHI NHÁNH GÒ VẤP
                    </CardBody>
                    </Card>
                </Collapse>
                </div>
            </FormGroup>
            <button onClick={handleFinishOrder}
                style={style} 
                onMouseEnter={inButton} 
                onMouseLeave={outButton}
                >FINISH ORDER</button>
       </div>
    );
};

export default PaymentMethod;