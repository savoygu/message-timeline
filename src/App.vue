<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="postcss">
  @import './styles/postcss/index.css';
  @reset-global pc;

  html,
  body {
    height: 100%;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #525251;
    background-color: #efefee;
    font-size: 14px;
  }

  a {
    text-decoration: none;
    color: #525251;
  }

  #app {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
