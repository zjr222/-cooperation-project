import React from 'react'
import {Link} from 'react-router-dom'
import imgUrl from '../../assets/img/Logo.PNG'
// import './index.css'
import { Input } from 'antd'
const {Search} =  Input;
export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={imgUrl} alt="Movie Club" />
            </div>
            <div className="search">
                <Search className="btn" placeholder="搜索电影、影人" enterButton/>
            </div>
            <div className="nav-list">
                <ul>
                    <li>
                        <Link to='/sort'>分类</Link>
                    </li>
                    <li>
                        <Link to='/rankList'>排行榜</Link>
                    </li>
                    <li>
                        <Link to='/explore'>选电影</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}