import React from 'react'
// import { Provider } from "react-redux"
import 'antd/dist/antd.css'
import './assets/css/reset.css'
import Default from './page/index'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Default />
    </Router>

  );
}

export default App;
