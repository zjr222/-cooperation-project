import styles from './index.module.css';

/**
 * 评分组件 
 * @param {*} score 1 - 10 
 */

function Rating(props) {
  let rating = Math.ceil(props.score);
  return (<div className={styles.rating}>
    <span className={`${styles.score} ${styles[`score_${rating}`]}`}></span>
    <span className={styles.scoreCount}>{ props.score }</span>
  </div>);
}


export default Rating;