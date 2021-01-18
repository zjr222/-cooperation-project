import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import RatingComp from '../../RatingComp';
import styles from './index.module.css';


let page = <></>;
export default function MovieCoverComp(props) {
  const [key, setKey] = useState(false)
  if(key){
     page = (<div className={styles.hover}>
              <div className={styles.con}>
                {props.data.movieName}
                <span className={styles.date}>
                  {props.data.year}
                </span>
              </div>
              <div className={styles.rate}>
                <RatingComp score={props.data.rate}/>
              </div>
              <div className={styles.tr}>
                <span className={styles.time}>{props.data.time}</span>
                <span className={styles.region}>{props.data.region}</span>
              </div>
              <div className={styles.director}>
                  {`导演:  ${Array.isArray(props.data.director) ? props.data.director.join(', ') : props.data.director}`}
              </div>
              <div className={styles.actors}>{`主演:  ${Array.isArray(props.data.actors) ? props.data.actors.join(', ') : props.data.actors}`}</div>
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
        pathname:`/details/${props.data.id[0]}`,
        state:`${props.data.rate}`
        }}>
        <img className={styles.img} src={props.data.img} alt="" />
      </Link>
      {page}
    </div>
    <div className="desc">
      <span className={styles.title}>{props.data.movieName}</span>
      <div className={styles.rate}>
          {props.data.rate ? <RatingComp  score={props.data.rate} /> : <RatingComp  score={props.data.rate} /> }
      </div>
    </div>
  </div>);
}