import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import data from '../../services/getData'
import sty from './index.module.css'

export default class AllActors extends Component{
    constructor(props){
        super(props);
        this.state = {
            director:{},
            actors:null,
            writers:null,
            producers:null
        }
    }
    /**
     * 
     * @param {Array|Object} data 数据
     * @param {Number} index 索引(可选选项)
     */
    commonStyle = (data,index)=>{
        return (
            <div className={sty.actor} key={data.length}>
                <div className={sty.introduce}>
                    <span>
                        <Link to={`/actorIntroduce/${data.id}`}>
                            <img src={data.img} alt=""/>
                        </Link>
                    </span>
                    <span className={sty.dir}>
                        <p className={sty.name}>
                            <Link to={`/actorIntroduce/${data.id}`}>{data.name}</Link>
                        </p>
                        <p className={sty.role}>{data.role}</p>
                        <p>
                            <span>代表作：</span>
                            <span className={sty.works}>{Array.isArray(data.works)? data.works.join(" / ") : ""}</span>
                        </p>
                    </span>
                </div>
            </div>
        )
    }
    componentDidMount(){
        // console.log(this.props)
        data.getMovieAllActorMsg(this.props.match.params.id).then(r=>{
            console.log(r);
            const actors = r.actors.map((k,v)=>{
                return (
                    this.commonStyle(k,v)
                )
            })
            if(!Array.isArray(r.screenWriter)){
                const writers = (
                    this.commonStyle(r.screenWriter)
                )
                this.setState({
                    writers:writers
                })
            }else{
                const writers = r.screenWriter.map((k,v)=>{
                    this.commonStyle(k,v);
                })
                this.setState({
                    writers:writers
                })
            }
            if(!Array.isArray(r.producer)){
                const producers = (
                   this.commonStyle(r.producer)
                )
                this.setState({
                    producers:producers
                })
            }else{
                const producers = r.producer.map((k,v)=>{
                   this.commonStyle(k,v)
                })
                this.setState({
                    producers:producers
                })
            }
            this.setState({
                director:{...r.director},
                actors:actors,
            })
        })
    }

    render(){
        return(
            <div className={sty.celebrities}>
                <h1>{`${this.props.location.state}演职员`}</h1>
                <div className={sty.director}>
                    <h2>{this.state.director.role}</h2>
                    <div className={sty.introduce}>
                        <span>
                            <Link>
                                <img src={this.state.director.img} alt=""/>
                            </Link>
                        </span>
                        <span className={sty.dir}>
                            <p className={sty.name}>
                                <Link>{this.state.director.name}</Link>
                            </p>
                            <p className={sty.role}>{this.state.director.role}</p>
                            <p>
                                <span>代表作：</span>
                                <span className={sty.works}>{Array.isArray(this.state.director.works)? this.state.director.works.join(" / ") : ""}</span>
                            </p>
                        </span>
                    </div>
                </div>
                <div className={sty.actors}>
                    <h2>{`演员Actors`}</h2>
                    <div className={sty.allActors}>
                        {this.state.actors}
                    </div>
                    
                </div>
                <div className={sty.writer}>
                    <h2>{`编剧Writer`}</h2>
                    <div className={sty.allWriter}>
                        {this.state.writers}
                    </div>
                </div>
                <div className={sty.producer}>
                    <h2>{`制片人Producer`}</h2>
                    <div className={sty.allProducer}>
                        {this.state.producers}
                    </div>
                </div>
            </div>
        )
    }
}