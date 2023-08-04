<template>
  <div class="pattern main" ref="pattern">
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>
    <div>图案设计系统</div>

    <!-- <img alt="Vue logo" src="@/assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />{{ a }} -->
    拖拽时移动
    <transition-group name="drag" class="list" tag="ul" id="list">
      <li
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
        draggable="true"
        v-for="(item, index) in list"
        :key="item.label"
        class="list-item"
      >
        {{ item.label }}
      </li>
      <!-- Add more list items as needed -->
    </transition-group>
    <!-- <a-button type="primary" @click="handleLogout">121212注销</a-button> -->
    <br />
    <br />
    <br />
    拖拽结束后移动
    <transition-group name="drag" class="list" tag="ul" id="list">
      <li
        @dragenter="dragenter2($event, index)"
        @dragleave="dragleave2($event, index)"
        @drop="drop2($event, index)"
        @dragover="dragover2($event, index)"
        @dragstart="dragstart2($event, index)"
        @dragend="dragend2($event, index)"
        draggable="true"
        v-for="(item, index) in list2"
        :key="item.label"
        class="list-item2"
      >
        {{ item.label }}
      </li>
      <!-- Add more list items as needed -->
    </transition-group>
    <div
      style="padding: 10px; width: 100%; background-color: white"
      ref="actionBar"
    >
      <div class="">操作栏</div>
      <a-button>导出</a-button>
      <a-button>批量</a-button>
    </div>
    表格
    <a-table :columns="columns" :data-source="data" :scroll="{ x: true }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>action</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  nextTick,
  onUnmounted,
  ref,
  onActivated,
  onDeactivated,
  onMounted,
} from "vue";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "vue-router";
import { useFixed } from "@/hooks/useFixed";
import { useScroll } from "@/hooks/useScroll";
export default {
  name: "Pattern",
  components: {},
  setup() {
    const a = ref(1);
    const actionBar = ref(null);
    const pattern = ref(null);
    const { initScroll, destoryScroll, restoreScroll } = useScroll();
    const { initFixed, destoryFixed } = useFixed();

    const { getUser, logout } = useUser();
    const router = useRouter();
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
    const list = ref([
      { label: "列表1" },
      { label: "列表2" },
      { label: "列表3" },
      { label: "列表4" },
      { label: "列表5" },
      { label: "列表6" },
      { label: "列表7" },
      { label: "列表8" },
      { label: "列表9" },
      { label: "列表10" },
      { label: "列表11" },
      { label: "列表12" },
    ]);
    const list2 = ref([
      { label: "2列表1" },
      { label: "2列表2" },
      { label: "2列表3" },
      { label: "2列表4" },
      { label: "2列表5" },
      { label: "2列表6" },
      { label: "2列表7" },
      { label: "2列表8" },
      { label: "2列表9" },
      { label: "2列表10" },
      { label: "2列表11" },
      { label: "2列表12" },
    ]);

    const dragIndex = ref("");
    const dragIndex2 = ref("");
    const enterIndex = ref("");

    const dragstart = (index) => {
      dragIndex.value = index;
    };
    const dragenter = (e, index) => {
      e.preventDefault();
      // 避免源对象触发自身的dragenter事件
      if (dragIndex.value !== index) {
        const source = list.value[dragIndex.value];
        list.value.splice(dragIndex.value, 1);
        list.value.splice(index, 0, source);
        // 排序变化后目标对象的索引变成源对象的索引
        dragIndex.value = index;
      }
    };
    const dragover = (e, index) => {
      e.preventDefault();
    };

    const dragover2 = (e, index) => {
      e.preventDefault();
    };
    const dragstart2 = (e, index) => {
      //记录位置
      dragIndex2.value = index;
      e.target.classList.add("moving");
    };
    const dragenter2 = (e, index) => {
      // 进入其他拖拽元素
      e.preventDefault();
      // 避免源对象触发自身的dragenter事件

      //排除移入自己
      if (dragIndex2.value !== index) {
        e.target.classList.add("moving");
        // 移入自己后面的位置
        if (dragIndex2.value < index) {
          e.target.classList.add("enter-right");
        } else {
          e.target.classList.add("enter-left");
        }
        // const source = list2.value[dragIndex2.value];
        // list2.value.splice(dragIndex2.value, 1);
        // list2.value.splice(index, 0, source);
        // // 排序变化后目标对象的索引变成源对象的索引
        // dragIndex2.value = index;
      }
    };
    const dragend2 = (e, index) => {
      // 结束后拖拽元素去除样式
      e.target.classList.remove("moving");
      e.target.classList.remove("enter-right");
      e.target.classList.remove("enter-left"); // this.dragIndex = index
    };
    const drop2 = (e, index) => {
      // 放下交换完被移入元素去除样式
      e.target.classList.remove("moving");
      e.target.classList.remove("enter-right");
      e.target.classList.remove("enter-left");
      if (dragIndex2.value !== index) {
        const source = list2.value[dragIndex2.value];
        list2.value.splice(dragIndex2.value, 1);
        list2.value.splice(index, 0, source);
        // 排序变化后目标对象的索引变成源对象的索引
        dragIndex2.value = index;
      }
    };
    const dragleave2 = (e, index) => {
      e.preventDefault();
      if (index === dragIndex2.value) {
        return false;
      }
      //离开被移入元素 去样式
      e.target.classList.remove("moving");
      e.target.classList.remove("enter-right");
      e.target.classList.remove("enter-left");
    };

    console.log(23, getUser.value);
    function handleLogout() {
      logout();
      router.push("/login");
    }

    onMounted(() => {
      initScroll(pattern.value);
      initFixed(pattern.value, actionBar.value);
    });
    onUnmounted(() => {
      destoryScroll();
      destoryFixed();
    });
    onActivated(() => {
      // 调用时机为首次挂载
      // 以及每次从缓存中被重新插入时
      restoreScroll();
      console.log("active");
    });

    onDeactivated(() => {
      // 在从 DOM 上移除、进入缓存
      // 以及组件卸载时调用
      console.log("deactive");
    });
    return {
      a,
      handleLogout,
      list,
      list2,
      dragstart,
      dragenter,
      dragover,
      dragstart2,
      dragenter2,
      dragover2,
      dragend2,
      drop2,
      data,
      columns,
      dragleave2,
      actionBar,
      pattern,
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
