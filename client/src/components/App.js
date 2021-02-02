import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import NotFound from './NotFound';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import AdminEditProduct from './AdminEditProduct';
import EditFooter from './EditFooter';
import Footer from './Footer';
import Categories from './Categories';
import ProductPage from './ProductPage';
import DetailProductPage from './DetailProductPage';
import Cart from './Cart';
import Checkout from './Checkout';
import OrderDetail from './OrderDetail';
import { isAuthenticated } from '../helpers/auth';
import HistoryOrders from './HistoryOrders';
import ProductPageByCategory from './ProductPageByCategory';
import ProductsSalePage from './ProductsSalePage';
import ProductsNewPage from './ProductsNewPage';
import ViewOrders from './ViewOrders';
import ProductsSearchPage from './ProductsSearchPage';
import ProductsBestSellerPage from './ProductsBestSellerPage';
import Profile from './Profile';
import ResetPassword from './ResetPassword';

const App = () => {
  return(
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/collections/all' component={ProductPage} />
          <Route exact path='/products/:productSlug' component={DetailProductPage} />
          <Route exact path='/products/category/:categorySlug' component={ProductPageByCategory} />
          <Route exact path='/collections/sale' component={ProductsSalePage} />
          <Route exact path='/collections/new' component={ProductsNewPage} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/search/:searchContent' component={ProductsSearchPage} />
          <Route exact path='/collections/best-seller' component={ProductsBestSellerPage} />
          <Route exact path='/reset-password/:token' component={ResetPassword} />
          <UserRoute exact path='/user/dashboard' component={UserDashboard} />
          <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
          <AdminRoute exact path='/admin/edit/product/:productId' component={AdminEditProduct} />
          <AdminRoute exact path='/admin/edit/footer' component={EditFooter} />
          <AdminRoute exact path="/admin/categories" component={Categories} />
          <AdminRoute exact path="/view-orders" component={ViewOrders} />
          {
            isAuthenticated() && 
            <React.Fragment>
              <Route exact path='/orders/history/:userId' component={HistoryOrders} />
              <Route exact path='/orders/:orderId' component={OrderDetail} />
              <Route exact path='/profile' component={Profile} />
            </React.Fragment>
          }
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
