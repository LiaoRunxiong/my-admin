<template>
  <div class="home">
   <div>A+产品</div> 
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
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { nextTick, ref } from "vue";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "vue-router";
import { Button } from "ant-design-vue";
export default {
  name: "aPlusProduct",
  components: {
    HelloWorld,
    "a-button": Button,
  },
  setup() {
    const a = ref(1);
    const { getUser, logout } = useUser();
    const router = useRouter();
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
    2;
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
      dragleave2,
    };
  },
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
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
