// 定义一个全局缓存对象，用于存储组件实例
const cache = {};

// 自定义keep-alive组件
const MyKeepAlive = {
  name: "MyKeepAlive",
  abstract: true,
  props: {
    // 定义缓存的组件名
    include: [String, RegExp],
    // 定义不缓存的组件名
    exclude: [String, RegExp],
  },
  render() {
    const { default: component } = this.$slots;
    console.log(16, this.$slots);
    const key = component.key;

    // 判断是否需要缓存该组件
    const shouldCache = this.shouldCacheComponent(key);

    // 如果缓存中存在组件实例，则直接返回缓存的实例
    if (shouldCache && cache[key]) {
      return cache[key];
    }

    // 否则，将组件实例存入缓存，并返回组件的虚拟节点
    if (shouldCache) {
      cache[key] = component;
    }
    return component;
  },
  methods: {
    // 判断组件是否应该被缓存
    shouldCacheComponent(key) {
      const { include, exclude } = this;
      if (include && !this.matches(include, key)) {
        return false;
      }
      if (exclude && this.matches(exclude, key)) {
        return false;
      }
      return true;
    },
    // 判断组件名是否匹配
    matches(pattern, key) {
      if (typeof pattern === "string") {
        return pattern.split(",").indexOf(key) > -1;
      } else if (pattern instanceof RegExp) {
        return pattern.test(key);
      }
      return false;
    },
  },
};

export default MyKeepAlive;
