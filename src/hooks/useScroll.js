import { computed, ref } from "vue";

export function useScroll() {
  let dom = null;
  const scrollParam = ref({ x: 0, y: 0 });
  const getScrollParam = computed(() => {
    let obj = {};
    obj.x = scrollParam.value.x;
    obj.y = scrollParam.value.y;
    return obj;
  });
  const scrollHandler = (e) => {
    scrollParam.value.x = e.target.scrollLeft;
    scrollParam.value.y = e.target.scrollTop;
    console.log(112, getScrollParam.value);
  };
  const initScroll = (initDom) => {
    dom = initDom;
    dom.addEventListener("scroll", scrollHandler);
  };
  const destoryScroll = () => {
    dom.removeEventListener("scroll", scrollHandler);
    dom = null;
  };
  const restoreScroll = () => {
    console.log(26,dom,getScrollParam.value);
    if (!dom) {
      return;
    }
    dom.scrollLeft = getScrollParam.value.x;
    dom.scrollTop = getScrollParam.value.y;
  };
  return { getScrollParam, initScroll, destoryScroll, restoreScroll };
}
