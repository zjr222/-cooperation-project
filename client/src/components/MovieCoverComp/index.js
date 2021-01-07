import React from 'react';
import RatingComp from '../RatingComp';
import styles from './index.module.css';

export default function MovieCoverComp({ isRate, img, title, score }) {
  return (<div className={styles.movieWrapper}>
    <div className="imgBox">
      <img src={img} alt="" />
    </div>
    <div className="desc">
      <span>{title}</span>
      {isRate ? <RatingComp score={score} /> : ''}
    </div>
  </div>);
}