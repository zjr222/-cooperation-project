import React, {
   Component
} from 'react'
import * as data from '../../services/getData'
import CommonComp from '../commonComp'
import './index.css'

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
            // console.log(k)
            return (
               <div key={v}>
                  <CommonComp isRate={k.rate} img={k.img} title={k.movieName} />
               </div>
            )
         })
         self.setState({
            hot:[...hotPage]
         })
      })
      data.default.getMoviesPage().then(res=>{ //热门电影
         const movies = res.subjects.map((k,v) =>{
            return (
                     <div className="page1" key={v}>
                        <a href="item">
                           <div className="cover-wp">
                              <img src={k.cover} alt={k.title}/>
                           </div>
                           <p className="title">{k.title}</p>
                        </a>
                     </div>
            )
         })
         self.setState({
            hotMovies:[...movies]
         })
      })
      data.default.getPopularFilmReviews().then(res=>{ //正在热映
         const popular = res.reviewMovs.map((k,v)=>{;
            return (
               <>
                  <div className="review" key={v}>
                     <div className="review-hd">
                        <a href="">
                           <img src={k.url} alt={k.titles}/>
                        </a>
                     </div>
                     <div className="review-bd">
                        <h3>
                           <a href=""></a>
                        </h3>
                        <div className="review-content">
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
         <div className="box"> 
            <div className="hot-movies">
               <h2 className="title">{this.state.hotMovies.title}</h2>
               <div className="hot">
                  <ul>
                     {this.state.hot}
                  </ul>
               </div>
            </div>
            <div className="movies-page">
               <h2 className="title">最近热门电影</h2>
               <div>
                  {this.state.hotMovies}
               </div>
            </div>
            <div className="popular">
               <h2 className="title">{this.state.popularFilm.titleIndexCon}</h2>
               <div className="reviews">
                  {this.state.popularFilm}
               </div>
            </div>
         </div>
      )
   }

}