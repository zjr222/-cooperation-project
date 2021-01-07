import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import store from '../store'
import { Provider } from "react-redux";
import Header from '../components/Header';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default function Default() {
    return (
        <Provider store={store}>
            <Router>
                <Layout
                    header={<Header />}
                    main={<Main />}
                    footer={<Footer />}
                />
           </Router>
        </Provider>
    );
}