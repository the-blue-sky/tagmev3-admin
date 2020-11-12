<template>
  <div id="app">
    <!--  原本这里应该是自定义标签 但现在都用路由代理了  -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  // 因为直接用路由占位符代替了 所以不需要引入组件了
  name: 'App',
}
</script>

<style>
</style>
