<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>Calc-Form-Vue</h1>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ElContainer from '../node_modules/element-ui/packages/container/src/main.vue'
import ElMain from '../node_modules/element-ui/packages/main/src/main.vue'
import ElHeader from '../node_modules/element-ui/packages/header/src/main.vue'

export default {
  components: {
    ElHeader,
    ElMain,
    ElContainer},
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
header {
  text-align: center;
}
</style>
