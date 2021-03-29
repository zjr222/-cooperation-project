import React, { useState, useEffect } from 'react'
import styles from './index.module.css';
import CheckoutComp from '../CheckoutComp';
import MovieComp from '../CommonComp/MovieComp';
import apis from '../../services/getData';
import throttle from '../../utils/throttle';
import lazyLoad from '../../utils/lazyLoad';
import { Spin } from 'antd';

const arrtsArr = [
  ['全部类型', '剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠', '情色'],
  ['全部地区', '中国大陆', '欧美', '美国', '中国香港', '中国台湾', '日本', '韩国', '英国', '法国', '德国', '意大利', '西班牙', '印度', '泰国', '俄罗斯', '伊朗', '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西'],
  ['全部年代', '2020', '2019', '2010年代', '90年代', '80年代', '70年代', '60年代', '更早'],
  ['全部特色', '经典', '青春', '文艺', '搞笑', '励志', '魔幻', '感人', '女性', '黑帮'],
];

export default function Sort() {
  const [condition, setCondition] = useState({
    sort: 'U',
    start: 0,
    tags: '',
    range: '0,10',
    genres: '',
    countries: '',
    year_range: '',
  });
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  useEffect(() => {
    document.onscroll = throttle(() => {
      lazyLoad(() => {
        setCondition(prev => {
          return {
            ...prev,
            start: prev.start + 20,
          }
        })
      }, document.getElementById('root'));
    }, 1000)
    return () => {
      document.onscroll = null;
    }
  }, []);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await apis.getClasseMovie(condition);
      setMoviesList(() => [...moviesList, ...result.data]);
      setLoading(false);
    }
    fetchData();
  }, [condition]);
  let movieEle = moviesList.map(it => {
    const data = {
      id: [it.id],
      rate: it.rate,
      img: it.cover,
      movieName: it.title,
      director: it.directors,
      actors: it.casts,
    };
    return <MovieComp key={it.id} {...data} />
  });

  // if (moviesList.length === 0) {
  //   movieEle = <div className={styles.noData}>暂无数据</div>
  // }
  const checkouts = arrtsArr.map(attrs => <CheckoutComp key={attrs[0]} attrs={attrs} onCheckout={(key, value) => {
    const tagIndex = tags.findIndex(it => it[0] === key);
    const newTags = [...tags];
    if (tagIndex >= 0) {
      newTags[tagIndex] = [key, value];
    } else {
      newTags.push([key, value]);
    }
    setTags(() => {
      setCondition({
        ...condition,
        tags: newTags.map(it => it[1]).filter(it => it).join(','),
        start: 0,
      });
      setMoviesList([]);
      return newTags;
    });
  }} />)
  return (
    <div className={styles.sortWrapper}>
      {checkouts}
      <Spin spinning={loading} size='large' className={styles.loading}>
        <div className={`${styles.movieList}`}>
          {/* 电影列表 */}
          {movieEle}
        </div>
      </Spin>
    </div>
  )
}
