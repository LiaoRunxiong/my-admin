import { computed, ref } from "vue";

export function useTableFixed() {
  let resizeObserver = null;
  let resizeObserver2 = null;
  let originTable = null;
  let orignHead = null;
  let headerbox = null;
  let copyTableHead = null;
  let scrollDom = null;
  let fixedtop = 0;
  let tableContent = null;
  const scrollParam = ref({ x: 0, y: 0 });
  const getScrollParam = computed(() => {
    let obj = {};
    obj.x = scrollParam.value.x;
    obj.y = scrollParam.value.y;
    return obj;
  });
  const fixedHandler = (e) => {
    // 判断元素是否在可视区域内
    let head = originTable.querySelector(".ant-table-thead");
    let isInViewport = false;
    const rect = originTable.getBoundingClientRect();
    if (rect.top < 110 + fixedtop) {
      isInViewport = false;
    } else {
      isInViewport = true;
    }
    // 使用示例
    if (isInViewport) {
      if (!!headerbox) {
        // scrollDom.removeChild(copyTableHead);
        head.parentNode.removeChild(headerbox);

        headerbox = null;
      }
    } else {
      if (!headerbox) {
        copyTableHead = head.cloneNode(true);
        headerbox = document.createElement("div");
        headerbox.style.position = "fixed";
        // copyTableHead.style.lineHeight = "1.5715";
        headerbox.style["z-index"] = "10";
        // copyTableHead.style["width"] = "calc(100vw - 297px)";
        headerbox.style["width"] = tableContent.clientWidth + "px";
        headerbox.style.top = 110 + fixedtop + "px";
        headerbox.style.overflow = "auto";
        // scrollDom.appendChild(copyTableHead);
        console.log(30, headerbox);
        headerbox.appendChild(copyTableHead);
        head.parentNode.appendChild(headerbox);
        headerbox.addEventListener("scroll", headerBoxScrollFunc);
      }
    }
  };
  const headerBoxScrollFunc = (e) => {
    if (!!tableContent) {
      tableContent.scrollLeft = e.target.scrollLeft;
    }
  };
  const tableContentScrollFunc = (e) => {
    scrollParam.value.x = e.target.scrollLeft;
    scrollParam.value.y = e.target.scrollTop;
    if (!!headerbox) {
      headerbox.scrollLeft = e.target.scrollLeft;
    }
  };
  const initFixed = (pDom = window, table, fixedTop = 0) => {
    // 头加tab=110px
    // scrollDom 参考元素
    fixedtop = fixedTop;
    scrollDom = pDom;
    //参考滚动的元素添加定位 用于获取fixed元素正确的clientWidth
    // scrollDom.style.position = "relative";
    // scrollDom.style["overflow-y"] = "auto";
    orignHead = table.querySelector(".ant-table-thead");
    tableContent = table.querySelector(".ant-table-content");
    tableContent.addEventListener("scroll", tableContentScrollFunc);

    originTable = table;
    scrollDom.addEventListener("scroll", fixedHandler);

    //监听参考元素的宽度变化
    // 创建 ResizeObserver 实例
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // 获取元素的新宽度
        // const newWidth = entry.contentRect.width;
        if (!!copyTableHead) {
          copyTableHead.style["width"] =
            originTable.parentNode.clientWidth - 48 + "px";
        }
      }
    }); // 监听 参考元素 的宽度变化
    resizeObserver.observe(orignHead);
    resizeObserver2 = new ResizeObserver((entries) => {
      // 获取元素的新宽度
      // const newWidth = entry.contentRect.width;
      if (!!headerbox) {
        headerbox.style["width"] = tableContent.clientWidth + "px";
      }
    });
    resizeObserver2.observe(tableContent);
  };
  const destoryFixed = () => {
    scrollDom.removeEventListener("scroll", fixedHandler);
    originTable = null;
    scrollDom = null;
    copyTableHead = null;
    resizeObserver = null;
    resizeObserver2 = null;
  };
  //   const restoreScroll = () => {
  //     if (!originTable) {
  //       return;
  //     }
  //     originTable.scrollLeft = getScrollParam.value.x;
  //     originTable.scrollTop = getScrollParam.value.y;
  //   };
  const restoreFixedScroll = () => {
    if (!tableContent) {
      return;
    }
    tableContent.scrollLeft = getScrollParam.value.x;
  };
  return { getScrollParam, initFixed, restoreFixedScroll, destoryFixed };
}
