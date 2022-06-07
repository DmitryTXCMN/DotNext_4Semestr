import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import './custom.css'
import LoanForm from "./Pages/loanForm";

const App = () => {
    return (
      <Layout>
        <Route exact path='/' component={LoanForm} />
      </Layout>
    );
}
export default App; 