import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import RatingComp from '../../RatingComp';
import styles from './index.module.css';


let page = null;
export default function MovieCoverComp({id,movieName,region,director,duration,rate,rater,img,year,actors}) {
  const [key, setKey] = useState(false)
  if(key){
     page = (<div className={styles.hover}>
              <div className={styles.con}>
                {movieName}
                <span className={styles.date}>
                  {year}
                </span>
              </div>
              <div className={styles.rates}>
                <RatingComp score={rate}/>
              </div>
              <div className={styles.tr}>
                <span className={styles.time}>{duration}</span>
                <span className={styles.region}>{region}</span>
              </div>
              <div className={styles.director}>
                  {`导演  ${director}`}
              </div>
              <div className={styles.actors}>{`主演  ${actors}`}</div>
    </div>)
  }else{
    page = (<div></div>)
  }
  return (<div className={styles.movieWrapper} onMouseOver={()=>{
    setKey(true)
  }} onMouseLeave={()=>{
    setKey(false)
  }}>
    <div className="imgBox">
      <Link to={{
        pathname:`/details/${id}`,
        state:`${rate}`
        }}>
        <img className={styles.img} src={img} alt="" />
      </Link>
      {page}
    </div>
    <div className="desc">
      <span className={styles.title}>{movieName}</span>
      <div className={styles.rate}>
          {rate ? <RatingComp  score={rate} /> : <RatingComp  score={rate} /> }
      </div>
    </div>
  </div>);
}