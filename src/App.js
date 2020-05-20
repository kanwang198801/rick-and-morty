import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
