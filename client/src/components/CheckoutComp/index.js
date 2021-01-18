import React, { useState } from 'react'
import styles from './index.module.css';

export default function ChecoutComp(props) {
  const [tag, setTag] = useState(props.attrs[0]);
  const spans = props.attrs.map(it => <span
    className={`${styles.tag} ${it == tag ? styles.active : ''}`}
    key={it}
    onClick={() => {
      setTag(it);
      if (it === props.attrs[0]) {
        props.onCheckout && props.onCheckout(props.attrs[0], '');
      } else {
        props.onCheckout && props.onCheckout(props.attrs[0], it);
      }
    }}
  >{it}</span>);
  return (
    <div className={styles.itemWrapper}>
      {spans}
    </div>
  )
}
