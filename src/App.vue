<template>
  <div id="app">
    <el-row>
      <el-col :offset="4" :span="16">
        <app-info></app-info>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="4" :span="16">
        <generator></generator>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AppInfo from "./view/AppInfo.vue";
import Generator from './view/Generator'

export default {
  name: "app",
  components: {
    AppInfo,
    Generator
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
