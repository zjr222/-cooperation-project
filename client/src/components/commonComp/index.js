import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RatingComp from '../RatingComp';
import styles from './index.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function MovieCoverComp({ isRate, img, title }) {
  const classes = useStyles();
  return (<div className={classes.root} className={styles.movieWrapper}>
    <div className="imgBox">
      <img className={styles.img} src={img} alt="" />
    </div>
    <div className="desc">
      <span className={styles.title}>{title}</span>
      <div className={styles.rate}>
          {isRate ? <RatingComp  score={isRate} /> : <RatingComp  score={`暂无评分`} /> }
      </div>
    </div>
    <div className={styles.btn}>
        <span>
            <a href="#">详情</a>
        </span>
    </div>
  </div>);
}