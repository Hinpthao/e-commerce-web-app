import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, Input, Label, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';

const ProductInfo = ({ detail }) => {
    const dispatch = useDispatch();

    const { productCategory, 
        productImages, 
        productName, 
        productPrice, 
        productDesc, 
        productQuantity, 
        productNew,
        imageDelete,
        percDiscount } = detail;
    
    console.log(detail)

    const [qtyToBuy, setQtyToBuy] = useState(1)

    useEffect(() => {
        if(productQuantity === 0) setQtyToBuy(0)
    }, [productQuantity])

    const style = {
        borderRadius: '50px',
        backgroundColor: 'black',
        color : 'white',
        padding: "20px",
        boxShadow: '5px 10px 18px #888888',
        border : "1px"
    }

    const inButton = e => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = 'black';
    }
    const outButton = e => {
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
    }

    const onAddToCart = (product, quantity) => {
        if(qtyToBuy === 0) return;
        dispatch(addToCart(product, quantity))
    }

    return (
        <div style={{textAlign: "center", margin: "50px"}}>
            <h1 style={{fontFamily: "Cardo"}}>{productName}</h1>
            <br></br>
            {
                productQuantity === 0 ? 
                <Alert color="dark"><b>OUT OF STOCK</b></Alert> : ''
            }
            {
                percDiscount > 0 ? <div>
                    <strike style={{marginRight: '20px', fontSize: '25px', fontFamily: 'Cardo', color: '#6b6b6b'}}>
                        {Number(productPrice * 100 / (100 - percDiscount)).toLocaleString('en')}₫
                    </strike>
                    <span style={{fontSize: '25px', fontFamily: 'Cardo'}}>
                        {Number(productPrice).toLocaleString('en')}₫
                    </span>
                </div> : ''
            }
            {
                percDiscount <= 0 ? <div>
                    <div style={{fontSize: '25px', fontFamily: 'Cardo'}}>{Number(productPrice).toLocaleString('en')}₫</div>
                </div> : ''
            }
            <br></br>
            <p style={{textTransform: "uppercase", wordWrap: "break-word"}}>{productDesc}</p>
            <br></br>
            <InputGroup style={{width:"135px" , marginRight: 'auto', marginLeft : 'auto'}}>
            <Label style={{fontFamily: "ui-serif", lineHeight : '2', fontSize: 'large', marginRight: '10px'}}>Quantity</Label>
                <Input 
                    type='number'
                    value={qtyToBuy}
                    name='qtyToBuy'
                    min='0'
                    max={productQuantity}
                    style={{backgroundColor: '#f8f9fa', border : 'none'}}
                    onChange={e => setQtyToBuy(e.target.value)}
                />
            </InputGroup>
            <button style={style} onMouseEnter={inButton} onMouseLeave={outButton} onClick={() => onAddToCart(detail, qtyToBuy)}>ADD TO CARD</button>
        </div>
    );
};

export default ProductInfo;