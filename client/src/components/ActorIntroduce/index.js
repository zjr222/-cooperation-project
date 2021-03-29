import React, { Component } from 'react'
import data from '../../services/getData'
import {Link} from 'react-router-dom'
import sty from './index.module.css'

export default class ActorIntroduce extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:null,
            description:null,//个人简介
            actorIntroduce:null,//演员介绍
            win:[], //获奖作品
            welcome:[], //最受欢迎作品
        }
    }
    componentDidMount(){
        data.getActorDetail(this.props.match.params.id).then(r=>{
            const actorIntro = (
                <div className={sty.content}>
                    <h1>{r.title}</h1>
                    <div className={sty.subject}>
                        <div className={sty.img}>
                            <img src={r.imgUrl} alt=""/>
                        </div>
                        <div className={sty.info}>
                            <span>
                                <span className={sty.director}>
                                    性别
                                </span>
                                ：
                                <span className={sty.name}>
                                    {r.sex}
                                </span>
                            </span>
                            <span>
                                <span className={sty.director}>
                                    星座
                                </span>
                                ：
                                <span className={sty.name}>
                                    {r.constellation}
                                </span>
                            </span>
                            <span>
                                <span className={sty.director}>
                                    出生日期
                                </span>
                                ：
                                <span className={sty.name}>
                                    {r.date}
                                </span>
                            </span>
                            <span>
                                <span className={sty.director}>
                                    出生地
                                </span>
                                ：
                                <span className={sty.name}>
                                    {r.birthPlace}
                                </span>
                            </span>
                            <span>
                                <span className={sty.director}>
                                    职业
                                </span>
                                ：
                                <span className={sty.name}>
                                    {r.workInPlace}
                                </span>
                            </span>
                            <span>
                                <span className={sty.director}>
                                    更多英文名
                                </span>
                                ：
                                <span className={sty.name}>
                                    {r.moreEnglishName}
                                </span>
                            </span>
                            <span>
                                <span className={sty.director}>
                                    更多中文名
                                </span>
                                ：
                                <span className={sty.name}>
                                    {r.moreChineseName}
                                </span>
                            </span>
                            <span>
                                <span className={sty.director}>
                                    家庭成员
                                </span>
                                ：
                                <span className={sty.name}>
                                    {`${r.family}`}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            )
            const win = r.winning.map((k,v)=>{
                return (
                    <div className={sty.itemWork} key={v}>
                        <span className={sty.item}>{k[0]}</span>
                        <span className={sty.item}>{k[1]}</span>
                        <span className={sty.item}>{k[2]}</span>
                        <span className={sty.item}>{k[3]}</span>
                    </div>
                )
            })
            const welcome = r.welecome.map((k,v)=>{
                return (
                    <div className={sty.works}>
                        <div>
                            <img src={k.img} alt=""/>
                        </div>
                        <div className={sty.text}>
                            <span className={sty.title}>
                                <Link>{k.title}</Link>
                            </span>
                            <span className={sty.rate}>{k.rate}</span>
                        </div>
                    </div>
                )
            })
            this.setState({
                actorIntroduce:actorIntro,
                title:r.title,
                description:r.description,
                win:win,
                welcome:welcome
            })
        })
    }
    render(){
        return (
            <div className={sty.box}>
                <div className={sty.actorDetail}>
                    {this.state.actorIntroduce}
                </div>
                <div className={sty.description}>
                    <h2>{`个人简介 · · · · · ·`}</h2>
                    <p>{this.state.description}</p>
                </div>
                <div className={sty.img}>

                </div>
                {/* 获奖作品 */}
                <div className={sty.winWorks}>
                    <h2>{`获奖作品`}</h2>
                    {(
                        this.state.win ? 
                        <div>
                            {this.state.win}
                        </div>: <p>{`暂无数据`}</p>
                    )}
                </div>
                <div className={sty.work}>
                    <h2>{`最受好评的5部作品`}</h2>
                    <div className={sty.movie}>
                         {this.state.welcome}
                    </div>
                   
                </div>
            </div>
        )
    }

}