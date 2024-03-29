import './App.css';
import Football from './Football/Football';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GoogleOAuthProvider } from '@react-oauth/google';

const cache = new InMemoryCache();

const initialState = {
  counter: 0,
};
cache.writeData({ data: initialState });

const App = () => {
  const apolloClient = new ApolloClient({
    uri: `${import.meta.env.VITE_API_URL}/graphql`,
    cache,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
          <Football />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
