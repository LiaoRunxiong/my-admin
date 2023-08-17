import { computed, ref } from "vue";

export function useFixed() {
  let resizeObserver = null;
  let dom = null;
  let copyDom = null;
  let pdom = null;
  let fixedtop = 0;
  const scrollParam = ref({ x: 0, y: 0 });
  const getScrollParam = computed(() => {
    let obj = {};
    obj.x = scrollParam.value.x;
    obj.y = scrollParam.value.y;
    return obj;
  });
  const fixedHandler = (e) => {
    // 判断元素是否在可视区域内
    let isInViewport = false;
    const rect = dom.getBoundingClientRect();
    if (rect.top < 110 + fixedtop) {
      isInViewport = false;
    } else {
      isInViewport = true;
    }

    // 使用示例
    if (isInViewport) {
      if (!!copyDom) {
        // pdom.removeChild(copyDom);
        dom.parentNode.removeChild(copyDom);

        copyDom = null;
      }
    } else {
      if (!copyDom) {
        copyDom = dom.cloneNode(true);
        copyDom.style.position = "fixed";
        // copyDom.style.lineHeight = "1.5715";
        copyDom.style["z-index"] = "10";
        // copyDom.style["width"] = "calc(100vw - 297px)";
        copyDom.style["width"] = pdom.clientWidth - 48 + "px";
        copyDom.style.top = 110 + fixedtop + "px";
        // pdom.appendChild(copyDom);
        dom.parentNode.appendChild(copyDom);
      }
    }
  };

  const initFixed = (pDom = window, fixedDom, fixedTop = 0) => {
    // 头加tab=110px
    // pDom 参考元素
    fixedtop = fixedTop;
    pdom = pDom;
    //参考滚动的元素添加定位 用于获取fixed元素正确的clientWidth
    // pDom.style.position = "relative";
    // pDom.style["overflow-y"] = "auto";

    dom = fixedDom;
    pdom.addEventListener("scroll", fixedHandler);

    //监听参考元素的宽度变化
    // 创建 ResizeObserver 实例
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        console.log(61, copyDom);
        // 获取元素的新宽度
        // const newWidth = entry.contentRect.width;
        if (!!copyDom) {
          copyDom.style["width"] = dom.parentNode.clientWidth - 48 + "px";
        }
      }
    });
    // 监听 参考元素 的宽度变化
    resizeObserver.observe(pdom);
  };
  const destoryFixed = () => {
    pdom.removeEventListener("scroll", fixedHandler);
    dom = null;
    pdom = null;
    copyDom = null;
    resizeObserver = null;
  };
  //   const restoreScroll = () => {
  //     if (!dom) {
  //       return;
  //     }
  //     dom.scrollLeft = getScrollParam.value.x;
  //     dom.scrollTop = getScrollParam.value.y;
  //   };
  return { getScrollParam, initFixed, destoryFixed };
}
