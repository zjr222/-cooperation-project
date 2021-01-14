import React, {
    Component
 } from 'react'
 import * as data from '../../services/getData'
 import MovieComp from '../CommonComp/MovieComp'
 import styles from './index.module.css'
 
 export default class Main extends Component{
    constructor(props){
       super(props);
       this.state={
          hot:[],
          hotMovies:[],
          popularFilm:[],
       }
    }
    componentDidMount() {
       const self = this;
       data.default.getInProgressHot().then(res=>{ //正在热映
         const hotPage = res.everyMovies.map((k,v)=>{
            //  console.log(k)
             return (
                <div key={v}>
                   <MovieComp data={k}/>
                </div>
             )
          })
          self.setState({
             hot:[...hotPage]
          })
       })
       data.default.getMoviesPage().then(res=>{ //热门电影
          const movies = res.subjects.map((k,v) =>{
             // console.log(k)
             return (
                      <div className={styles.page1} key={v}>
                         <a href="item">
                            <div className={styles.coverWp}>
                               <img src={k.cover} alt={k.title}/>
                            </div>
                            <p className={styles.title}>{k.title}</p>
                         </a>
                      </div>
             )
          })
          self.setState({
             hotMovies:[...movies]
          })
       })
       data.default.getPopularFilmReviews().then(res=>{ //正在热映
          const popular = res.reviewMovs.map((k,v)=>{
             // console.log(k);
             return (
                <>
                   <div className={styles.review} key={v}>
                      <div className={styles.reviewHd}>
                         <a href="">
                            <img src={k.url} alt={k.titles}/>
                         </a>
                      </div>
                      <div className={styles.reviewBd}>
                         <h3>
                            <a href=""></a>
                         </h3>
                         <div className={styles.reviewContent}>
                            {k.contents}
                         </div>
                      </div>
                   </div>
                </>
             )
          })
          self.setState({
             popularFilm:[...popular]
          })
       })
    }
 
    render() {
       return ( 
          <div className={styles.box}> 
             <div className={styles.hotMovies}>
                <h2 className={styles.title}>{this.state.hotMovies.title}</h2>
                <div className={styles.hot}>
                   <ul>
                      {this.state.hot}
                   </ul>
                </div>
             </div>
             <div className={styles.moviePage}>
                <h2 className={styles.title}>最近热门电影</h2>
                <div>
                   {this.state.hotMovies}
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