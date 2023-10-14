import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import HomePage from './screens/HomePage.jsx';
import LoginPage from './screens/Auth/LoginPage.jsx';
import ActivationScreen from './screens/Auth/ActivationScreen.jsx';
import SignupPage from './screens/Auth/SignupPage.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import ProfilePage from './screens/user/ProfilePage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/activation/:activation_token' element={<ActivationScreen />} />
      <Route path='/sign-up' element={<SignupPage />} /> 
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
      <RouterProvider router={router} />
    
  </Provider>
);
