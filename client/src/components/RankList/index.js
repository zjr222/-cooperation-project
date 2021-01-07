import React, { Component } from 'react';
import RatingComp from '../RatingComp';
import styles from './index.module.css';
import * as data  from '../../services/getData'

export default class RankList extends Component{
  constructor(){
    super();
    this.state={
      sortList:[]
    }
  }
  componentDidMount(){
    data.default.getSortMovies().then(res=>{
      console.log(res)
      const sorts = res.map(m => {
        return (
        <a href="#" key={m.id} >
            <div className={`${styles.itemWrapper}`}>
              <div className={`${styles.item} clearfix`}>
                <div className={`${styles.cover} fl`}>
                  <img className={styles.img} src={m.cover} alt="" />
                </div>
                <div className={`${styles.description} fl`}>
                  <p className="name">{m.title}</p>
                  <p className="info">{m.description}</p>
                  <div className={styles.rote}>
                    <RatingComp score={m.rate} />
                    <span>( {m.rater}人评价 )</span>
                  </div>
                </div>
              </div>
            </div>
        </a>)
      });
      this.setState({
        sortList:sorts
      })
    })
  }

  render(){
    return <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>Movie Club 排行榜</h2>
        </div>
        <div>
          {this.state.sortList}
        </div>
  </div>
  }
  
}



