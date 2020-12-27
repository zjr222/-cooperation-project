import React from 'react'
import './index.css'
export default function Main(){
    return(
        <div className="main">
            <div className="hoting-received">
                <h2>正在热映</h2>
            </div>
            <div className="hot-movies">
                <h2>最近热门电影</h2>
            </div>
            <div className="hot-recommend">
                <h2>热门推荐</h2>
            </div>
            <div className="hot-comment">
                <h2>最受欢迎的影评</h2>
            </div>
        </div>
    )
}