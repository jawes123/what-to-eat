import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Auth0Provider 
        domain="dev-7qyya2qv64ihm0uq.us.auth0.com"
        clientId="85Zwl1Yt2aNjcSmkxAjzFbAqfkW3xt4N"
        authorizationParams={{
          redirect_uri: 'http://localhost:3000/home'}}
        >

        <App />

      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

