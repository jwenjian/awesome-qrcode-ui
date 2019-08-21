<template>
  <div>
    <el-tabs type="border-card" v-model="activePane">
      <el-tab-pane label="Text" name="normal">
        <normal-generator></normal-generator>
      </el-tab-pane>
      <el-tab-pane label="Static Picture" name="picture">
        <picture-generator></picture-generator>
      </el-tab-pane>
      <el-tab-pane label="Gif" name="gif">
        <gif-generator></gif-generator>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NormalGenerator from "./generators/NormalGenerator";
import PictureGenerator from "./generators/PictureGenerator";
import GifGenerator from "./generators/GifGenerator";

export default {
  name: "generator",
  components: {
    NormalGenerator,
    PictureGenerator,
    GifGenerator
  },
  data() {
    return {
      activePane: "normal"
    };
  }
};
</script>

<style>
</style>