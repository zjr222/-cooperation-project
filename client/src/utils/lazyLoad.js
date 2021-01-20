export default function lazyLoad(onLoad, el) {
  const viewsHeight = window.innerHeight;
  const allHeight = el.offsetHeight;
  const curScrollTop = window.scrollY;
  const curDis = allHeight - (viewsHeight + curScrollTop);
  if (curDis < 200) {
    onLoad && onLoad();
  }
}