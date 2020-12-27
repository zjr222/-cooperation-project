import React from 'react'
import './index.css'
import {Button} from 'antd'
export default function NotFound(props){
    return (
        <div className="not-found"
        >
            <h2>404</h2>
            <div className="text">糟糕！页面不存在</div>
            <Button className="ant-btn" onClick={()=>{
                props.history.push('/')
            }}>
                回到首页
            </Button>
        </div>
    )
}