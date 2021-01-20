import React from 'react'
import styles from './index.module.css'


export default function CommentComp({name,date,rate,content,useful}){
    let rating = Math.ceil(rate);
    return(
        <div className={styles.box}>
            <div className={styles.commentItem}>
                <div className={styles.comment}>
                    <h3 className={styles.flex}>
                        <span className={styles.commentInfo}>
                            <span className={styles.name}>{name}</span>
                            <span>看过</span>
                            <span className={`${styles.score} ${styles[`score_${rating}`]}`}></span>
                            <span className={styles.time}>{date}</span>
                        </span>
                        <span className={styles.commentVote}>
                            <span className={styles.vote}>{useful}</span>
                            <span>有用</span>
                        </span>
                    </h3>
                    <p className={styles.commentContent}>{content}</p>
                </div>
            </div>
        </div>
    )
}