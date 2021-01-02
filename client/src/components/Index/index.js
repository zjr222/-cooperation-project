import React, { Component } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Main from '../Main'

export default class Index extends Component{
    render(){
        return(
            <div className="container">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
    
}