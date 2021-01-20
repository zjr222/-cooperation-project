import React from 'react'
import {Link} from 'react-router-dom'
import imgUrl from '../../assets/img/Logo.PNG'
import sty from './index.module.css'
import { Input } from 'antd'
const {Search} =  Input;
export default function Header() {
    return (
        <div className={sty.header}>
            <div className={sty.logo}>
                <Link to='/'>
                    <img src={imgUrl} alt="Movie Club" />
                </Link>
            </div>
            <div className={sty.search}>
                <Search className={sty.btn} placeholder="搜索电影、影人" enterButton/>
            </div>
            <div className={sty.navList}>
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