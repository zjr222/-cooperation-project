<<<<<<< HEAD
import React, {
   Component
} from 'react'
import * as data from '../../services/getData'
import './index.css'

export default class Main extends Component{
   constructor(props){
      super(props);
      this.state={
         hotMovies:{},
         inProgressHot:{},
         popularFilmReviews:{},
         dom:[],
      }
   }
   componentDidMount() {
      const self = this;
      data.default.getInProgressHot().then(res=>{ //正在热映
         // console.log(res)
         self.setState({
            inProgressHot:{...res}
         })
         this.state.dom = this.state.inProgressHot.everyMovies.map((k,v)=>{
            console.log(k)
            return (
               <div key={v}>
                  <li className="poster">
                     <a href="">
                        <img src={k.img} alt={k.movieName}/>
                     </a>
                  </li>
                  <li className="title">
                     <a href="" onClick={()=>{}}>{k.movieName}</a>
                  </li>
                  <li className="rating">
                     <span className="rating-star"></span>
                     <span className="rate">{k.rate}</span>
                  </li>
                  <li className="ticket-btn">
                     <span>
                        <a href="">选座购票</a>
                     </span>
                  </li>
               </div>
            )
         })
      })
      data.default.getMoviesPage().then(res=>{ //热门电影
         self.setState({
            hotMovies:{...res}
         })
         // console.log(this.state.hotMovies)
         // let dom = self.state.hotMovies.map( k =>{
         //    console.log(k)
         //    return <li></li>
         // })
      })
      // data.default.getPopularFilmReviews().then(res=>{ //正在热映
      //    console.log(res)
      //    self.setState({
      //       popularFilmReviews:{...res}
      //    })
      //    // self.state.popularFilmReviews.map((k,v)=>{
      //    //    console.log(k)
      //    // })
      // })
   }

   render() {
      return ( 
         <div className="box"> 
=======
import React from 'react'
export default function Main(){
    return(
        <div className="main">
            <div className="hoting-received">
                <h2>正在热映</h2>
            </div>
>>>>>>> lyl
            <div className="hot-movies">
               <h2 className="title">{this.state.hotMovies.title}</h2>
               <div className="movies">
                  <ul>
                     {this.state.dom}
                  </ul>
               </div>
            </div>
         </div>
      )
   }

}