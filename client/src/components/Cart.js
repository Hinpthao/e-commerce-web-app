import React, { useEffect, useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Container, Row, Col, Table, Input } from 'reactstrap';
import { deleteItem, updateCart } from '../redux/actions/cartAction'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const [items, setItems] = useState(cart ? cart : []);

    useEffect(() => {
        setItems(cart)
    }, [cart])

    const style = {
        borderRadius: '50px',
        backgroundColor: 'black',
        color : 'white',
        padding: "10px",
        boxShadow: '5px 10px 18px #888888',
        border : "1px",
        marginLeft: 'auto'
    }

    const inButton = e => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = 'black';
    }
    const outButton = e => {
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
    }

    const total = (items) => {
        var total = 0;
        if(items.length > 0){
            for(var i = 0; i < items.length ; i++){
                total += items[i].product.productPrice * items[i].quantity
            }
        }
        return total;
    }

    const handleDeleteItem = id => {
        dispatch(deleteItem(id))
    }

    const changeQuantity = (e, item) => {
        dispatch(updateCart(item, parseInt(e.target.value)))
        setItems(
            items.map(i => {
                if(i.product._id === item.product._id){
                    i.quantity = e.target.value 
                }
                return i
            })
        )
    }
    
    return (
        <Container >
            <div style={{ backgroundColor: "#f8f9fa", padding: "10px"}}>
                <Row>
                    <h2 className="animated bounceInLeft font-effect-shadow-multiple" style={{margin : "20px 0px 40px 60px", fontFamily : "Sofia, sans-serif"}}>Shopping Cart</h2>
                </Row>
                <Row style={{padding: '20px'}}>
                    {
                        items.length === 0 ?
                        <p style={{padding: '50px', fontFamily: 'Dosis'}}>Your shopping cart is empty</p> :
                        <Table responsive>
                            <thead>
                                <tr>
                                <th style={{fontFamily: 'Leckerli One'}}>Item</th>
                                <th style={{fontFamily: 'Leckerli One'}}>Quantity</th>
                                <th style={{fontFamily: 'Leckerli One'}}>Price</th>
                                <th style={{fontFamily: 'Leckerli One'}}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items && items.map(item => {
                                        return <tr key={item.product._id}>
                                                    <td onClick={e => window.location.href=`/products/${item.product.slug}`} style={{cursor: "pointer"}}>
                                                        <img style={{width: '100px'}} 
                                                            src={`/uploads/${item.product.productImages[0]}`}
                                                            />
                                                        <span style={{marginLeft: "20px", textTransform: "uppercase", fontFamily: "Trirong"}}>{item.product.productName}</span>
                                                    </td>
                                                    <td style={{lineHeight: "100px"}}>
                                                        <Input 
                                                            value={item.quantity}
                                                            onChange={(e) => changeQuantity(e, item)}
                                                            style={{width: "70px", border: 'none', display: 'inline-flex'}}
                                                            type="number"
                                                            min='1'
                                                            max={item.product.productQuantity}
                                                        />
                                                    </td>
                                                    <td style={{lineHeight: "100px"}}>{Number(item.product.productPrice).toLocaleString('en')}₫</td>
                                                    <td style={{lineHeight: "100px"}}>
                                                        <i class="fas fa-trash-alt" 
                                                            style={{cursor: "pointer"}}
                                                            onClick={() => handleDeleteItem(item.product._id)}></i>
                                                    </td>
                                                </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                </Row>
                <Row style={{paddingRight: '20px'}}>
                    <br></br>
                    <br></br>
                    <span style={{marginLeft: "auto", 
                                    fontFamily: "Leckerli One",
                                    fontSize: "25px"
                                    }}>
                        Sub total : {' '}
                        <span style={{ fontFamily: "serif"}}>{
                            Number(total(items)).toLocaleString('en')
                        }₫</span>
                    </span>
                </Row>
                <Row style={{paddingRight: '120px'}}>
                    {
                        items.length > 0 && 
                            <button onClick={e => window.location.href="/checkout"} 
                                style={style} 
                                onMouseEnter={inButton} 
                                onMouseLeave={outButton}
                                >CHECK OUT</button>
                    }
                </Row>
                <br></br>
            </div>
        </Container>
    );
};

export default Cart;