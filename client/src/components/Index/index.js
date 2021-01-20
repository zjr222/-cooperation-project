import React, { Component } from 'react'
import data from '../../services/getData'
import { Carousel } from 'antd'
import MovieComp from '../CommonComp/MovieComp'
import styles from './index.module.css'
import PopularFilmComp from '../CommonComp/PopularFilmComp'
export default class Main extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: null,
         hot: [],
         hotMovies: [],
         popularFilm: [],
      }
   }
   /**
   * @param {Array} includePage [] 外层包装
   * @param {Array} pages [] 轮播的总数
   * @param {Array} page  [] 每个轮播的个数
   * @param {Array} data 数据
   * @param {JSX.Element} Comp 组件
   */
   //  Carousel = (pages,data,Comp)=>{
   //          for(let i = 1 ;i < data.length / 5 + 1; i++){
   //             pages.push(data.slice((i-1)*5,i*5))
   //          }  
   //          return pages.map((k,v)=>{
   //           const page = k.map((d,i)=>{
   //                return (
   //                   <div key={i}>
   //                      <Comp img={d.img} id={d.id} rate={d.rate} movieName={d.title} img={d.img}/>
   //                   </div>
   //                )
   //             })
   //             return (
   //                <div>{page}</div>
   //             )
   //          })
   //  }
   componentDidMount() {
      const self = this;
      data.getInProgressHot().then(res => { //正在热映
         this.setState({
            title: res.title
         })
         let pages = [];
         for (let i = 1; i < res.everyMovies.length / 5 + 1; i++) {
            pages.push(res.everyMovies.slice((i - 1) * 5, i * 5))
         }
         const hotpage = pages.map((k, v) => {
            const page = k.map((d, i) => {
               return (
                  <div className={styles.movies} key={i}>
                     <MovieComp actors={d.actors} id={d.id} movieName={d.movieName} rate={d.rate} duration={d.duration} img={d.img} region={d.region} year={d.year} director={d.director} rater={d.rater} />
                  </div>
               )
            })
            return (
               <div className={styles.car}>{page}</div>
            )
         })
         self.setState({
            hot: hotpage
         })
      })
      data.getMoviesPage().then(res => { //热门电影
         let pages = [];
         for (let i = 1; i < res.subjects.length / 10 + 1; i++) {
            pages.push(res.subjects.slice((i - 1) * 10, i * 10))
         }
         const moviesPage = pages.map((k, v) => {
            const page = k.map((d, i) => {
               return (
                  <div className={styles.item2} key={i}>
                     <MovieComp img={d.img} id={d.id} rate={d.rate} movieName={d.title} />
                  </div>
               )
            })
            return (
               <div className={styles.page}>{page}</div>
            )
         })
         self.setState({
            hotMovies: moviesPage
         })
      })
      data.getPopularFilmReviews().then(res => { //正在热映
         const popular = res.reviewMovs.map((k, v) => {
            return (
               <PopularFilmComp people={k.peopleComment} id={k.id} rate={k.rate} movieName={k.moiveNames[0]} contents={k.contents} img={k.img} question={k.question} />
            )
         })
         self.setState({
            popularFilm: [...popular]
         })
      })
   }

   render() {
      return (
         <div className={styles.box}>
            <div className={styles.hotMovies}>
               <h2 className={styles.title}>{this.state.title}</h2>
               <div className={styles.hot}>
                  <ul>
                     <Carousel autoplay>
                        {this.state.hot}
                     </Carousel>
                  </ul>
               </div>
            </div>
            <div className={styles.moviePage}>
               <h2 className={styles.title}>最近热门电影</h2>
               <div className={styles.moviesPage}>
                  <ul>
                     <Carousel autoplay dots={{ className: "carousel" }}>
                        {this.state.hotMovies}
                     </Carousel>
                  </ul>
               </div>
            </div>
            <div className={styles.popular}>
               <h2 className={styles.title}>{this.state.popularFilm.titleIndexCon}</h2>
               <div className={styles.reviews}>
                  {this.state.popularFilm}
               </div>
            </div>
         </div>
      )
   }

}