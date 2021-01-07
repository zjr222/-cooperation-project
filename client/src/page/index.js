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
<<<<<<< HEAD
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/rankList" component={RankList}/>
                    <Route path="/sort"  component={SortComp}/>
                    <Route  component={NotFound} />
                </Switch>
=======
                <Layout
                    header={<Header />}
                    main={<Main />}
                    footer={<Footer />}
                />
>>>>>>> f6427391d48c452a2b85cadc311e18bf11ea7578
           </Router>
        </Provider>
    );
}