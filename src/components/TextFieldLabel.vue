<template>
  <span>
    <span>Text</span>
    <el-tooltip placement="top">
      <div slot="content">
        <p>
          <b>Supported Characters:</b>
        </p>
        <p>1. Numbers: 0-9</p>
        <p>2. Letters: a-z, A-Z</p>
        <p>3. Common punctuations: · , . : ; + - * / \ ~ ! @ # $ % ^ &amp; ` ' = &lt; > [ ] ( ) ? _ { } | and (space)</p>
        <p>4. Most Chinese characters!!!</p>
      </div>
      <i class="el-icon-info"></i>
    </el-tooltip>
  </span>
</template>

<script>
export default {
    data() {
        return {}
    }
};
</script>

<style scoped>
span {
    display: inline-block;
}
i {
    display: inline-block;
    margin-left: 0.5em;
}
</style>