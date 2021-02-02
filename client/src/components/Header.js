import React, { useState, Fragment, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    DropdownMenu,
    DropdownItem,
    Dropdown, DropdownToggle,
    UncontrolledPopover,
    PopoverBody,
    PopoverHeader,
    Input,
    Button,
    Form
  } from 'reactstrap';
import { isAuthenticated, logout } from '../helpers/auth';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../redux/actions/categoryAction';
import { searchProduct } from '../redux/actions/productAction';

const Header = ({ history }) => {
    const { categories } = useSelector(state => state.categories);
    const cart = useSelector(state => state.cart)
    const [userId, setUserId] = useState('');
    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState('');

    useEffect(() => {
      dispatch(getCategories())
    }, [dispatch]) 
  

    useEffect(() => {
        if(localStorage.getItem('user')){
            var data = JSON.parse(localStorage.getItem('user'));
            setUserId(data._id);
        }
    }, [isAuthenticated])

    const countNumberInCart = (cart) => {
        var count = 0;
        for(var i = 0; i < cart.length; i++){
            count += cart[i].quantity;
        }
        return count;
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = (e) => {
        logout(() => {
            history.push('/signin');
        });
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMenu = () => setDropdownOpen(prevState => !prevState);
    
    const openMenu = () => setDropdownOpen(true);
    const closeMenu = () => setDropdownOpen(false);
    
    const [dropdownOpenProducts, setDropdownOpenProducts] = useState(false);
    
    const toggleMenuProducts = () => setDropdownOpenProducts(prevState => !prevState);
    
    const openMenuProducts = () => setDropdownOpenProducts(true);
    const closeMenuProducts = () => setDropdownOpenProducts(false);

    const handleSearch = (e) => {
        e.preventDefault();

        if(searchContent.trim() === '') return;
        if(window.location.href=`/search/${searchContent}`){
            dispatch(searchProduct(searchContent))
        } else history.push(`/search/${searchContent}`)
    }
    
    const showHead = () => (
         <Nav className="justify-content-center" >
            <NavItem >
                <NavLink>
                    <Dropdown isOpen={dropdownOpen} 
                            toggle={toggleMenu} 
                            onMouseOver={openMenu}
                            onMouseLeave={closeMenu}>
                        <DropdownToggle color='none' style={{margin: "-7px -6px 0 0 "}} >
                            <img src="/img/profile.svg" width='20px' />
                        </DropdownToggle>
                        <DropdownMenu style={{marginTop: "-7px"}}>
                            {
                                isAuthenticated() &&
                                <Fragment>
                                    <DropdownItem href={`/orders/history/${userId}`}>History orders</DropdownItem>
                                    <DropdownItem href={`/profile`}>Profile</DropdownItem>
                                </Fragment> 
                            }
                            {
                                !isAuthenticated() &&
                                <Fragment>
                                    <DropdownItem href="/signin">Sign in</DropdownItem>
                                    <DropdownItem href="/signup">Sign up</DropdownItem>
                                </Fragment>
                            }
                        </DropdownMenu>
                    </Dropdown>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink id="searchTag">
                    <img src="/img/search.svg" width='20px' />
                </NavLink>
            </NavItem>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="searchTag" >
                <PopoverHeader>Search...</PopoverHeader>
                <PopoverBody>
                    <Form onSubmit={handleSearch}>
                        <Input 
                            value={searchContent}
                            onChange={e => setSearchContent(e.target.value)}
                            style={{width: '80%', display: 'inline-block', marginRight: '5px'}}
                        />
                        <Button type="submit" color="light" style={{marginTop: '-3px'}}><i class="fas fa-search"></i></Button>
                    </Form>
                </PopoverBody>
            </UncontrolledPopover>
            <NavItem>
                <NavLink href='/cart' style={{fontSize: 15}}>
                    <img src="/img/cart.svg" width='20px' /> {' '}
                    <span style={{fontFamily: "sans-serif"}}>({countNumberInCart(cart)})</span>
                </NavLink>
            </NavItem>
        </Nav> 
    )

    const showNavigation = () =>  (
        <Navbar light expand="md" style={{margin: "-10px 0 -10px 0"}}>
            <NavbarBrand href="/"><img src='/brand.svg' style={{width: '60px', margin: '-20px 0'}} /></NavbarBrand>
            <NavbarToggler onClick={toggle} style={{border: 'none'}}/>
            <Collapse isOpen={isOpen} navbar >
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink style={{fontSize: 15}} href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{fontSize: 15}} href="/collections/sale">Sale</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{fontSize: 15}} href="/collections/new">New</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{fontSize: 15}} href="/collections/best-seller">Best seller</NavLink>
                </NavItem>
                <NavItem>
                    <Dropdown isOpen={dropdownOpenProducts} 
                            toggle={toggleMenuProducts}
                            onMouseOver={openMenuProducts}
                            onMouseLeave={closeMenuProducts}
                            nav inNavbar>
                        <DropdownToggle color='none'style={{margin: "-6px -10px"}}>
                            <NavLink style={{fontSize: 15}}>Shop</NavLink>
                        </DropdownToggle>
                        <DropdownMenu style={{marginTop: "-7px", border: 'none'}}>
                            <DropdownItem>
                                    <NavLink style={{fontSize: 15, margin: "-8px"}} href="/collections/all">
                                        All
                                    </NavLink>
                            </DropdownItem> 
                        {
                            categories && categories.map(item => {
                                if(item){
                                    return <DropdownItem key={item._id} >
                                                <NavLink style={{fontSize: 15, margin: "-8px"}} href={`/products/category/${item.slug}`}>
                                                    {item.category}
                                                </NavLink>
                                        </DropdownItem> 
                                }
                            })
                        }
                        </DropdownMenu>
                    </Dropdown>
                </NavItem>
                
                {
                    !isAuthenticated() && (
                        <Fragment>
                            <NavItem>
                                <NavLink style={{fontSize: 15}} href="/signin">Signin</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{fontSize: 15}} href="/signup">Signup</NavLink>
                            </NavItem>
                        </Fragment>
                    )
                }
                {/* {
                    isAuthenticated() && isAuthenticated().role === 0 && (
                        <Fragment>
                            <NavItem>
                                <NavLink style={{fontSize: 15}} href="/user/dashboard">Dashboard</NavLink>
                            </NavItem>
                        </Fragment>
                    )
                } */}
                {
                    isAuthenticated() && isAuthenticated().role === 1 && (
                        <Fragment>
                            <NavItem>
                                <NavLink style={{fontSize: 15}} href="/admin/dashboard">   
                                    Admin Dashboard
                                </NavLink>
                            </NavItem>
                        </Fragment>
                    )
                }
                {
                    isAuthenticated() && (
                        <Fragment>
                            <NavItem>
                                <NavLink style={{fontSize: 15}} onClick={handleLogout}>Logout</NavLink>
                            </NavItem>
                        </Fragment>
                    )
                }
            </Nav>
            </Collapse>
        </Navbar>
    )
    
    return (
        <header id='header'>
            <Container>
                { showHead() }
                { showNavigation () }
            </Container>
            <hr></hr>
        </header>
    )
};

export default withRouter(Header);