<template>
  <div class="photo main">
    <a-button v-if="hasPermission('add')">测试权限的添加按钮</a-button>
    <div>图案设计</div>
    <div>图案设计</div>
    <div>图案设计</div>
    <div>图案设计</div>
    <div>图案设计</div>
    <div>图案设计</div>
    <div>图案设计</div>
    <div>图案设计</div>
    <div>图案设计</div>
    <div ref="tableRef">
      <a-table :columns="columns" :data-source="data" :scroll="{ x: true }">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>action</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  nextTick,
  ref,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
} from "vue";
import { useScroll } from "@/hooks/useScroll";
import { usePermission } from "@/hooks/usePermission";
import { useTableFixed } from "@/hooks/useTableFixed";

export default {
  name: "visualGraphicDesign",
  components: {},
  setup() {
    const { hasPermission } = usePermission();
    let scrollEl = null;
    let pageScrollEl = null;
    const tableRef = ref(null);
    const { initScroll, destoryScroll, restoreScroll } = useScroll();
    const {
      initScroll: initPageScroll,
      destoryScroll: destoryPageScroll,
      restoreScroll: restorePageScroll,
    } = useScroll();
    const { initFixed: initTableFixed, destoryFixed: destoryTableFixed } =
      useTableFixed();
    const columns = [
      {
        title: "Full Name",
        width: 100,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Age",
        width: 100,
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Column 1",
        dataIndex: "address",
        key: "1",
        width: 150,
      },
      {
        title: "Column 2",
        dataIndex: "address",
        key: "2",
        width: 150,
      },
      {
        title: "Column 3",
        dataIndex: "address",
        key: "3",
        width: 150,
      },
      {
        title: "Column 4",
        dataIndex: "address",
        key: "4",
        width: 150,
      },
      {
        title: "Column 5",
        dataIndex: "address",
        key: "5",
        width: 150,
      },
      {
        title: "Column 6",
        dataIndex: "address",
        key: "6",
        width: 150,
      },
      {
        title: "Column 7",
        dataIndex: "address",
        key: "7",
        width: 150,
      },
      {
        title: "Column 8",
        dataIndex: "address",
        key: "8",
      },
      {
        title: "Action",
        key: "operation",
        width: 100,
      },
    ];
    const data = ref([]);
    for (let i = 0; i < 100; i++) {
      data.value.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    onMounted(() => {
      pageScrollEl = document.querySelector(".photo");
      initPageScroll(pageScrollEl);
      console.log(133, tableRef.value);
      initTableFixed(pageScrollEl, tableRef.value, 0);
    });
    onUnmounted(() => {
      destoryPageScroll();
      destoryTableFixed();
    });
    onActivated(() => {
      // 调用时机为首次挂载
      // 以及每次从缓存中被重新插入时
      restorePageScroll();
      console.log("active");
    });

    onDeactivated(() => {
      // 在从 DOM 上移除、进入缓存
      // 以及组件卸载时调用
      console.log("deactive");
    });
    return {
      data,
      columns,
      tableRef,
      hasPermission,
    };
  },
};
</script>
<style scoped lang="less">
.list {
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  .drag-move {
    transition: transform 0.3s;
  }
  .list-item {
    cursor: move;
    width: 23%;
    background: #ea6e59;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 6px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .list-item2 {
    cursor: move;
    width: 23%;
    background: #0491f0;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 6px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .moving {
    // opacity: 0.8; /* 可以添加半透明效果表示正在拖拽 */
    box-shadow: 0 0 2px 2px rgb(233, 83, 45);
  }
  .enter-right {
    border-right: 5px solid #ffffff;
  }
  .enter-left {
    border-left: 5px solid #fdffff;
  }
}
</style>
