import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Button, Label, ModalBody, ModalFooter, Input, CustomInput, FormGroup, Col, InputGroupAddon, InputGroup } from 'reactstrap';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import MultiImageInput from 'react-multiple-image-input';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../redux/actions/messageAction';
import { getCategories } from '../redux/actions/categoryAction';
import { getProducts, editProduct } from '../redux/actions/productAction';
import { Link, useHistory } from 'react-router-dom';
import '../style/AdminEditProduct.css';

const AdminEditProduct = ({ match }) => {
    const productId = match.params.productId;
    let history = useHistory();

    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const { loading } = useSelector(state => state.loading)
    const { categories } = useSelector(state => state.categories);
    
    const dispatch = useDispatch();
    
    const [productData, setProductData] = useState({
        productImages : [],
        productName : '',
        productDesc : '',
        productPrice : '',
        productCategory : '',
        productQuantity : '',
        productNew : false,
        imageDelete : [],
        percDiscount : 0,
        numOfPurchs : ''
    })
    const [priceSale, setPriceSale] = useState(0);
    const { products } = useSelector(state => state.products)
    const product = products.find(item => item._id === productId)
    const [isSale, setSale] = useState(product && product.percDiscount > 0 ? true : false);
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        if(product){
            setProductData({
                ...productData,
                productImages : product.productImages,
                productName : product.productName,
                productDesc : product.productDesc,
                productPrice : product.productPrice.toString(),
                productCategory : product.productCategory._id,
                productQuantity : product.productQuantity.toString(),
                productNew : product.productNew,
                percDiscount : product.percDiscount,
                numOfPurchs : product.numOfPurchs
            })   
        }
        dispatch(clearMessage())
    }, [products])

    useEffect(() => {

    }, [productData])

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]) 

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])    

    const { productCategory, 
        productImages, 
        productName, 
        productPrice, 
        productDesc, 
        productQuantity, 
        productNew,
        imageDelete,
        percDiscount,
        numOfPurchs } = productData;
    
    const handleCheckbox = (e) => {
        setProductData({
            ...productData,
            productNew : !productNew
        })
    }

    const handleSale = () => {
        setSale(!isSale)
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

    const handleProductChange = e => {
        setProductData({
            ...productData,
            [e.target.name] : e.target.value
        })
    }

    const urltoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    
    const handleEditProduct = e => {
        e.preventDefault();
        
        if (isEmpty(productName) 
                    || isEmpty(productDesc) 
                    || isEmpty(productPrice) 
                    || isEmpty(productQuantity)){
            setClientSideErrorMsg('All fields are required')
        } else if (isSale && percDiscount <= 0){
            setClientSideErrorMsg('Please enter a percentage discount')
        }else if (isSale && percDiscount > 100){
            setClientSideErrorMsg('Please enter a percentage discount less than or equal to 100')
        } else if(productCategory === {}){
            setClientSideErrorMsg('Please select a category')
        } else {
            setClientSideErrorMsg('');
            let formData = new FormData();

            for (const i of images){
                formData.append('productImages', i)
            }
            formData.append('productName', productName);
            formData.append('productDesc', productDesc);
            if(isSale){
                formData.append('productPrice', Math.round((productPrice * (100 - percDiscount) / 100) / 1000) * 1000);
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
            formData.append('numOfPurchs', numOfPurchs);

            dispatch(editProduct(productId ,formData))
            setProductData({
                ...productData,
                imageDelete: []
            })
            dispatch(clearMessage());
            history.push('/admin/dashboard');
        }
    }

    return (
        <Container>
            <Row>
                <h2 className="animated bounceInLeft font-effect-shadow-multiple" style={{margin : "20px", fontFamily : "Sofia, sans-serif"}}>Edit product</h2>
            </Row>
            <Form>
                <ModalBody>
                    { clientSideErrorMsg && showErrorMsg(clientSideErrorMsg) }
                    { errorMsg && showErrorMsg(errorMsg) }
                        { successMsg && showSuccessMsg(successMsg) }
                        {
                            loading ? (
                                showLoading()
                            ) : (
                                <React.Fragment>
                                    <Label for='image' style={{cursor: 'pointer'}}>Choose image</Label>
                                        <FormGroup>
                                            <input multiple type="file" 
                                                    id='image' 
                                                    name="customFile" 
                                                    onChange={e => setImages(e.target.files)}
                                                    />
                                        </FormGroup>
                                    <Row>
                                    {
                                        productImages ? productImages.map((item, index) => {
                                             return  <Col xs='6' sm='4' md='4' lg='3' 
                                                        key={index}
                                                        >
                                                        <div >
                                                            <img  
                                                                src={`/uploads/${item}`}
                                                                style={{width: "100%", marginBottom: "20px" }}
                                                                />
                                                        </div>
                                                    </Col>
                                                }) : ''
                                    }
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6" md="6" lg="6">
                                            <FormGroup >
                                                <Label style={{fontFamily: "ui-serif"}} for="productName">Name</Label>
                                                <Input 
                                                    placeholder="Name"
                                                    type='text'
                                                    name="productName"
                                                    value={productName}
                                                    onChange={handleProductChange}
                                                    />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label style={{fontFamily: "ui-serif"}} for="slug">Slug</Label>
                                                <Input 
                                                    placeHolder="Slug"
                                                    type='text'
                                                    name="slug"
                                                    value={transToSlug(productName)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6" md="6" lg="6">
                                            <FormGroup >
                                                <Label style={{fontFamily: "ui-serif"}} for="productDecs">Description</Label>
                                                <Input 
                                                    placeholder="Description"
                                                    type='textarea'
                                                    name="productDesc"
                                                    value={productDesc}
                                                    onChange={handleProductChange}
                                                    maxLength="100"
                                                />  
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6" md="6" lg="6">
                                            <FormGroup>
                                                <Label style={{fontFamily: "ui-serif"}} for="productPrice">Price</Label>
                                                <Input 
                                                    placeholder="Price"
                                                    type='number'
                                                    min="0"
                                                    name="productPrice"
                                                    value={productPrice}
                                                    onChange={handleProductChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6" md="6" lg="6">
                                            <FormGroup>
                                                <Label style={{fontFamily: "ui-serif"}} for="productCategory">Category</Label>
                                                <Input 
                                                    type="select" 
                                                    name="category" 
                                                    id="category" 
                                                    name="productCategory"
                                                    onChange={handleProductChange}
                                                    value={productCategory}
                                                    >
                                                    <option value='' >Choose Category</option>
                                                    {
                                                        categories && categories.map(item => {
                                                            return <option key={item._id} value={item._id}>
                                                                {item.category}
                                                            </option>
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label style={{fontFamily: "ui-serif"}} 
                                                    for="productQuantity">
                                                        Quantity
                                                </Label>
                                                <Input 
                                                    placeholder="Quantity"
                                                    type='number'
                                                    min="0"
                                                    max="1000"
                                                    name="productQuantity"
                                                    value={productQuantity}
                                                    onChange={handleProductChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <div style={{ textAlign: "center", marginTop: '20px'}}>
                                                <CustomInput type="switch" 
                                                    id="newTag" 
                                                    name="newTag" 
                                                    onChange={handleCheckbox}
                                                    label={
                                                        productNew ? 'Remove New tag' : 'Add New tag'
                                                    } />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                            <Col>
                                                <CustomInput type="switch" 
                                                    id="saleTag" 
                                                    name="saleTag" 
                                                    onChange={handleSale}
                                                    label={
                                                        isSale ? 'Remove Sale tag' : 'Add Sale tag'
                                                    } />
                                            </Col>
                                            <Col>
                                            {
                                                isSale ? <span>
                                                    <Label  style={{fontFamily: "ui-serif"}}>Percentage discount</Label>
                                                    <InputGroup>
                                                        <Input 
                                                            value={percDiscount}
                                                            name='percDiscount'
                                                            onChange={handleChangePercentOnSale}
                                                            min='0'
                                                            max='100'
                                                        />
                                                        <InputGroupAddon addonType="append">%</InputGroupAddon>
                                                    </InputGroup>
                                                    <br></br>
                                                    <Label  style={{fontFamily: "ui-serif"}}>Price on sale</Label>
                                                    <InputGroup>
                                                        <Input 
                                                            value={Math.round(priceSale / 1000 ) * 1000}
                                                            name='priceSale'
                                                            min='0'
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
                    <Button type='submit' color="dark" onClick={handleEditProduct}>OK</Button>{' '}
                </ModalFooter>
            </Form>
        </Container>
    )
}

export default AdminEditProduct;
