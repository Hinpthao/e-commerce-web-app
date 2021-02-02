import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button, Modal, ModalHeader, Label, ModalBody, 
    ModalFooter, Input, FormGroup, Nav, NavItem, NavLink, InputGroup, CustomInput, InputGroupAddon, Table } from 'reactstrap';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../redux/actions/messageAction';
import { createCategory } from '../redux/actions/categoryAction';
import { createProduct } from '../redux/actions/productAction';
import AdminBody from './AdminBody';
import axios from 'axios';

const AdminDashboard = () => {
    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const { loading } = useSelector(state => state.loading)
    const { categories } = useSelector(state => state.categories);

    const dispatch = useDispatch();

    const [category, setCategory] = useState('');
    const [imageCategory, setImageCategory] = useState(null);
    const [productData, setProductData] = useState({
        productImage : null,
        productName : '',
        productDesc : '',
        productPrice : '',
        productCategory : '',
        productQuantity : '',
        productNew : false,
        percDiscount : 0
    })
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('');
    const [images, setImages] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [priceSale, setPriceSale] = useState(0);
    const [isSale, setSale] = useState(false);
    const { productCategory, 
        productImage, 
        productName, 
        productPrice, 
        productDesc, 
        productQuantity, 
        productNew,
        percDiscount } = productData;

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        dispatch(clearMessage())
    }

    const transToSlug = (string) => {
        var string = string.trim()
        var newStr = string.toLowerCase().replace(/ /g, '-') 
        .replace(/[^\w-]+/g, ''); 

        return newStr;
    }

    const handleChangePercentOnSale = (e) => {
        if(!productPrice) {
            setClientSideErrorMsg('Please enter price before enter percentage discount')
            return
        }
        setProductData({
            ...productData,
            percDiscount : e.target.value
        })
        setPriceSale(productPrice * (100 - e.target.value) / 100)
    }

    const handleSale = () => {
        setSale(!isSale)
    }

    const handleCheckbox = (e) => {
        setProductData({
            ...productData,
            productNew : !productNew
        })
    }

    const handleChangeImageCategory = e => {
        setImageCategory(e.target.files[0])
    }

    const handleAddCategory = e => {
        e.preventDefault();
        dispatch(clearMessage())

        if(isEmpty(category) || imageCategory ===  null){
            setClientSideErrorMsg('All fields are required');
        } else {
            const data = new FormData();

            data.append('category', category);
            data.append('slug', transToSlug(category))
            data.append('imageCategory', imageCategory)

            dispatch(createCategory(data))
            setCategory('');
        }
        
    }

    const handleMessage = e => {
        setClientSideErrorMsg('')
    }

    const handleProductChange = e => {
        setProductData({
            ...productData,
            [e.target.name] : e.target.value
        })
    }
    
    const handleAddProduct = e => {
        e.preventDefault();

        if (isEmpty(productName) 
                    || isEmpty(productDesc) 
                    || isEmpty(productPrice) 
                    || isEmpty(productQuantity)){
            setClientSideErrorMsg('All fields are required')
        } else if(isEmpty(productCategory)){
            setClientSideErrorMsg('Please select a category')
        } else if (isSale && percDiscount <= 0){
            setClientSideErrorMsg('Please enter a percentage discount')
        } else if (isSale && percDiscount > 100){
            setClientSideErrorMsg('Please enter a percentage discount less than or equal to 100')
        } else {
            setClientSideErrorMsg('');
            let formData = new FormData();

            for(var i of images){
                formData.append('productImage', i)
            }

            formData.append('productName', productName);
            formData.append('productDesc', productDesc);
            if(isSale){
                formData.append('productPrice',  Math.round((productPrice * (100 - percDiscount) / 100) / 1000) * 1000);
            } else {
                formData.append('productPrice', Math.round(productPrice / 1000) * 1000);
            }
            formData.append('productCategory', productCategory);
            formData.append('productQuantity', productQuantity);
            formData.append('productNew', productNew);
            if(!isSale){
                formData.append('percDiscount', 0);
            }
            else formData.append('percDiscount', percDiscount);
            formData.append('slug', transToSlug(productName));

            dispatch(createProduct(formData))
            setProductData({
                productName : '',
                productDesc : '',
                productPrice : '',
                productCategory : '',
                productQuantity : '',
                productNew: false,
                percDiscount : 0
            });
            setSale(false)
        }
    }

    const [modalAddCategory, setModalAddCategory] = useState(false);

    const toggleAddCategory = () => {
        dispatch(clearMessage());
        setModalAddCategory(!modalAddCategory);
    }

    const [modalShowCustomers, setModalShowCustomers] = useState(false);

    const toggleshowCustomers = async () => {
        const res = await axios.get('/api/user/allCustomers');
        setCustomers(res.data.customers)
        setModalShowCustomers(!modalShowCustomers);
    }

    const [modalAddProduct, setModalAddProduct] = useState(false);

    const toggleAddProduct = () => {
        dispatch(clearMessage());
        setModalAddProduct(!modalAddProduct);

        setProductData({
            productName : '',
            productDesc : '',
            productPrice : '',
            productCategory : '',
            productQuantity : '',
            productNew: false,
            percDiscount : 0
        });
        setImages({});
        setSale(false);
        setClientSideErrorMsg('');
    }

    return (
        <Container fluid={true} >
        <div style={{ backgroundColor: "#f8f9fa", padding: "10px"}}>
            <Row>
                <h2 className="animated bounceInLeft font-effect-shadow-multiple" style={{margin : "30px 0 20px 50px", fontFamily : "Sofia, sans-serif"}}>Admin Dashboard</h2>
            </Row>
            <hr></hr>
            <Row>
                <Col xs="12" sm="2" md="2" >
                    <div style={{margin: '-10px 0 10px 0'}}>
                        <Nav  vertical>
                            <Row>
                                <Col xs='6' sm='12' md='12' lg='12'>
                                    <NavItem>
                                        <NavLink style={{fontFamily: 'Raleway', fontSize: '15px'}} onClick={toggleAddCategory}><i class="far fa-plus-square"></i> Add category</NavLink>
                                    </NavItem>
                                </Col>
                                <Col xs='6' sm='12' md='12' lg='12'>
                                    <NavItem>
                                        <NavLink style={{fontFamily: 'Raleway', fontSize: '15px'}} href="/admin/categories"><i class="fas fa-shopping-cart"></i> Categories</NavLink>
                                    </NavItem>
                                </Col>
                                <Col xs='6' sm='12' md='12' lg='12'>
                                    <NavItem>
                                        <NavLink style={{fontFamily: 'Raleway', fontSize: '15px'}} onClick={toggleAddProduct}><i class="fas fa-cart-plus"></i> Add product</NavLink>
                                    </NavItem>
                                </Col>
                                <Col xs='6' sm='12' md='12' lg='12'>
                                    <NavItem>
                                        <NavLink style={{fontFamily: 'Raleway', fontSize: '15px'}} href="/admin/edit/footer"><i class="fas fa-shoe-prints"></i> Setting footer</NavLink>
                                    </NavItem>
                                </Col>
                                <Col xs='6' sm='12' md='12' lg='12'>
                                    <NavItem>
                                        <NavLink style={{fontFamily: 'Raleway', fontSize: '15px'}} href="/view-orders"><i class="fas fa-receipt"></i> Orders</NavLink>
                                    </NavItem>
                                </Col>
                                <Col xs='6' sm='12' md='12' lg='12'>
                                    <NavItem>
                                        <NavLink style={{fontFamily: 'Raleway', fontSize: '15px'}} onClick={toggleshowCustomers}><i class="fas fa-user"></i> Customers</NavLink>
                                    </NavItem>
                                </Col>
                            </Row>
                        </Nav>
                    </div>
                </Col>

                <Col xs="12" sm="10" md="10">
                    <AdminBody />
                </Col>
            </Row>

            <Modal isOpen={modalAddCategory} toggle={toggleAddCategory} onClick={handleMessage}>
                <Form onSubmit={handleAddCategory}>
                    <ModalHeader toggle={toggleAddCategory}>Add category</ModalHeader>
                        <ModalBody>
                            { clientSideErrorMsg && showErrorMsg(clientSideErrorMsg) }
                            { errorMsg && showErrorMsg(errorMsg) }
                            { successMsg && showSuccessMsg(successMsg) }
                            {
                                loading ? (
                                    showLoading()
                                ) : (
                                    <Form>
                                        <FormGroup>
                                            <Input 
                                                type='text' 
                                                placeHolder="Enter category..." 
                                                onChange={handleCategoryChange}
                                                value={category}
                                                />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                placeHolder="Slug"
                                                type='text'
                                                name="slugCategory"
                                                value={transToSlug(category)}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Category image</Label>
                                            <CustomInput type="file" name="customFile" onChange={handleChangeImageCategory}/>
                                        </FormGroup>
                                    </Form>
                                )
                            }
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' color="dark" >Add</Button>{' '}
                        <Button color="danger" onClick={toggleAddCategory}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
            <Modal isOpen={modalAddProduct} toggle={toggleAddProduct} >
                <Form>
                    <ModalHeader toggle={toggleAddProduct}>Add product</ModalHeader>
                        <ModalBody>
                        { clientSideErrorMsg && showErrorMsg(clientSideErrorMsg) }
                        { errorMsg && showErrorMsg(errorMsg) }
                            { successMsg && showSuccessMsg(successMsg) }
                            {
                                loading ? (
                                    showLoading()
                                ) : (
                                    <React.Fragment>
                                        {/* <MultiImageInput
                                            images={images}
                                            setImages={setImages}
                                            cropConfig={{ crop, ruleOfThirds: true }}
                                            theme="light"
                                            max={5}
                                            /> */}
                                        <Label for='image' style={{cursor: 'pointer'}}>Choose image</Label>
                                        <FormGroup>
                                            <input multiple type="file" 
                                                    id='image' 
                                                    name="customFile" 
                                                    onChange={e => setImages(e.target.files)}
                                                    />
                                        </FormGroup>

                                        <FormGroup>
                                            <Input 
                                                placeHolder="Name"
                                                type='text'
                                                name="productName"
                                                value={productName}
                                                onChange={handleProductChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                placeHolder="Slug"
                                                type='text'
                                                name="slug"
                                                value={transToSlug(productName)}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                placeHolder="Description"
                                                type='textarea'
                                                name="productDesc"
                                                value={productDesc}
                                                onChange={handleProductChange}
                                                maxLength="1000"
                                            />  
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                placeHolder="Price"
                                                type='number'
                                                min="0"
                                                name="productPrice"
                                                value={productPrice}
                                                onChange={handleProductChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                type="select" 
                                                name="category" 
                                                id="category" 
                                                name="productCategory"
                                                onChange={handleProductChange}
                                                >
                                                <option value=''>Choose Category</option>
                                                {
                                                    categories && categories.map(item => {
                                                        return <option key={item._id} value={item._id}>
                                                            {item.category}
                                                        </option>
                                                    })
                                                }
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                placeHolder="Quantity"
                                                type='number'
                                                min="0"
                                                max="1000"
                                                name="productQuantity"
                                                value={productQuantity}
                                                onChange={handleProductChange}
                                                style={{width: "50%", display : 'inline-block'}}
                                            />
                                           <div style={{display: "inline-block", textAlign: "center", width: "50%"}}>
                                                <FormGroup check >
                                                    <Label check>
                                                    <CustomInput type="switch" 
                                                        id="newTag" 
                                                        name="newTag" 
                                                        onChange={handleCheckbox}
                                                        label='Add New tag' />
                                                    </Label>
                                                </FormGroup>
                                           </div>
                                        </FormGroup>
                                        <Row>
                                            <Col>
                                                <CustomInput type="switch" 
                                                    id="saleTag" 
                                                    name="saleTag" 
                                                    onChange={handleSale}
                                                    label='Add Sale tag' />
                                            </Col>
                                            <Col>
                                            {
                                                isSale ? <span>
                                                <Label  style={{fontFamily: "ui-serif"}}>Percentage discount</Label>
                                                <InputGroup>
                                                    <Input 
                                                    //  value={Math.round(percDiscount * 100) / 100}
                                                        value={percDiscount}
                                                        name='percDiscount'
                                                        onChange={handleChangePercentOnSale}
                                                        min='0'
                                                        
                                                    />
                                                    <InputGroupAddon addonType="append">%</InputGroupAddon>
                                                </InputGroup>
                                                <br></br>
                                                <Label  style={{fontFamily: "ui-serif"}}>Price on sale</Label>
                                                <InputGroup>
                                                    <Input 
                                                        value={Number(Math.round(priceSale / 1000 ) * 1000).toLocaleString('en')}
                                                        name='priceSale'
                                                        disabled
                                                    />
                                                    <InputGroupAddon addonType="append">đ</InputGroupAddon>
                                                </InputGroup>
                                             </span> : ''
                                            }
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                )
                            }
                        </ModalBody>
                    <ModalFooter>
                        <Button type='submit' color="dark" onClick={handleAddProduct}>Add</Button>{' '}
                        <Button color="danger" onClick={toggleAddProduct}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
            <Modal isOpen={modalShowCustomers} toggle={toggleshowCustomers} >
                <ModalHeader toggle={toggleshowCustomers}>Customers</ModalHeader>
                    <ModalBody>
                        <Table>
                        <thead style={{fontFamily: 'Raleway'}}>
                            <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers && customers.map(item => {
                                    return <tr>
                                        <td><img src='/img/user.svg' width='40px'/></td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                        </Table>
                    </ModalBody>
            </Modal>
        </div>
        </Container>
    )
}

export default AdminDashboard;
