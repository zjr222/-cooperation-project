import React, { Component } from 'react'
import { Layout, Spin } from 'antd';
import { Link } from 'react-router-dom'
import * as data from '../../services/getData'
import styles from './index.module.css'
import RatingComp from '../RatingComp'
import CommentComp from '../CommonComp/CommentComp'
import store from '../../store';
const { Content } = Layout;
// console.log(store)

export default class DetailsComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            detail: null, //描述
            allComment: null, //短评总条数
            actorsIntroduction: null, //演员介绍
            otherMovie: null, //其他电影
            comment: null, //留言
            startNum: 20, //起始数量20
            title: null
        }
        // this.state.title = store.getState();
        // store.subscribe(this.storeChange)
    }
    componentDidMount() {
        console.log(this.props)
        data.default.getMovieDetail(this.props.match.params.id).then(r => {
            const hotPage = (
                <div className={styles.content}>
                    <h1>{r.title}</h1>
                    <div className={styles.subject}>
                        <div className={styles.img}>
                            <img src={r.imgUrl} alt="" />
                        </div>
                        <div className={styles.info}>
                            <span>
                                <span className={styles.director}>
                                    导演
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.director}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    编剧
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.director}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    主演
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.actors}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    类型
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.type}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    制片国家地区
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.country}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    语言
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.language}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    上映日期
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.showDate}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    片长
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {`${r.time}分钟`}
                                </span>
                            </span>
                            <span>
                                <span className={styles.director}>
                                    又名
                                        </span>
                                        ：
                                        <span className={styles.name}>
                                    {r.englishName}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.rate}>
                        <h3>豆瓣评分</h3>
                        <div className={styles.rater}>
                            {/* <span>{this.props.location.state.isRate}</span> */}
                            <RatingComp className={styles.sty} score={this.props.location.state} />
                        </div>
                    </div>
                    <div className={styles.introduction}>
                        <p className={styles.title}>{`${r.title}的剧情介绍· · · · · ·`}</p>
                        <p className={styles.describ}>{r.introduction}</p>
                    </div>
                </div>
            )
            this.setState({
                ...this.state,
                title: r.title,
                detail: hotPage
            })
        })
        data.default.getActorsInMovie(this.props.match.params.id).then(r => {
            const actorsPage = r.map((k, v) => {
                return (
                    <div className={styles.box}>
                        <li className={styles.celebrity}>
                            <Link to={
                                {
                                    pathname:`/actorIntroduce/${k.id}`
                                }
                            }>
                                <div className={styles.avatar}>
                                    <img src={k.img} alt="" />
                                </div>
                            </Link>
                            <div className={styles.infos}>
                                <p className={styles.name}>
                                    <Link to={
                                        {
                                            pathname:`/actorIntroduce/${k.id}`
                                        }
                            }>{k.name}</Link>
                                </p>
                                <p className={styles.role}>
                                    {k.role}
                                </p>
                            </div>
                        </li>
                    </div>
                )
            })
            this.setState({
                actorsIntroduction: actorsPage
            })
        })
        data.default.getLikeByMovie(this.props.match.params.id).then(r => {
            const moviePage = r.map((k, v) => {
                return (
                    <li className={styles.item}>
                        <Link to={{
                            pathname:`/details/${k.id}`,
                        }}>
                            <img src={k.img} alt="" />
                        </Link>
                        <p><Link to={{
                            pathname:`/details/${k.id}`,
                        }}>{k.title}</Link></p>
                    </li>
                )
            })
            this.setState({
                otherMovie: moviePage
            })
        })
        data.default.getCommentInMovie(this.props.match.params.id).then(r => {
            this.setState({
                allComment: r[r.length - 1]
            })
            const commentPage = r.map((k, v) => {
                if (v < r.length - 1) {
                    return (
                        <CommentComp key={k.name} name={k.name} date={k.date} rate={k.rate} useful={k.useful} content={k.content} />
                    )
                }
                return null;
            })
            this.setState({
                comment: commentPage,
            })
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Content className={styles.containerBox}>
                    {this.state.detail}
                    {<h3 className={styles.h3}>{`${this.state.title}· · · · · ·`}
                        <Link to={{
                            pathname: `/celebrities/${this.props.match.params.id}`,
                            state: `${this.state.title}`
                        }}>（全部）
                    </Link></h3>}
                    <div className={styles.flex}>
                        {this.state.actorsIntroduction}
                    </div>
                    {<h3 className={styles.h3}>
                        {`喜欢这部电影的人也喜欢 · · · · · ·`}
                    </h3>}
                    <div className={styles.otherMovie}>
                        <ul>
                            {this.state.otherMovie}
                        </ul>
                    </div>
                    {<h3 className={styles.h3}>{`${this.state.title}的短评· · · · · ·`}
                        <Link to={{
                            pathname: `/comment/${this.props.match.params.id}/start=${this.state.startNum}&limit=20&status=P&sort=new_score`,
                            state: `${this.state.title}`,
                            query: `${this.state.allComment}`
                        }} >{`(全部${this.state.allComment}条)`}</Link>
                    </h3>}
                    <div className={styles.comment}>
                        {this.state.comment}
                        <div className={styles.more}>
                            <Link to={{
                                pathname: `/comment/${this.props.match.params.id}/start=${this.state.startNum}&limit=20&status=P&sort=new_score`,
                                state: `${this.state.title}`,
                                query: `${this.state.allComment}`
                            }} >{`>> 更多短评 ${this.state.allComment}条`}</Link>
                        </div>
                    </div>
                </Content>
            )
        } else {
            return (
                <div className={styles.cont}>
                    <div className={styles.spin}>
                        <Spin tip="Loading..." delay="2000" size="large" />
                    </div>
                </div>
            )
        }
    }

}
